# File: python_agent/main.py
import sys
import json
import logging
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools import search_tool, wiki_tool, save_tool, check_save_status
import re

# Suppress logs for cleaner output to Node.js
logging.getLogger().setLevel(logging.WARNING)

# Load environment variables
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI

def main():
    try:
        # Read query from stdin (sent from Node.js)
        if len(sys.argv) > 1:
            query = ' '.join(sys.argv[1:])
        else:
            query = input().strip()

        if not query:
            print("ERROR: No query provided", file=sys.stderr)
            sys.exit(1)

        # Get output path from environment variable
        output_path = os.getenv('RESEARCH_OUTPUT_PATH')
        if not output_path:
            output_path = os.path.join(os.getcwd(), 'research_output.txt')

        # Initialize Gemini LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7,  # Add some creativity
            max_output_tokens=2048  # Increase output length
        )

        # Define output data model
        class ResearchResponse(BaseModel):
            topic: str
            summary: str
            key_points: list[str]  # Add key points
            detailed_analysis: str  # Add detailed analysis
            sources: list[str]
            tools_used: list[str]

        # Create parser
        parser = PydanticOutputParser(pydantic_object=ResearchResponse)

        # Enhanced prompt for more detailed research
        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
You are a comprehensive research assistant. You MUST follow this EXACT sequence:

STEP 1: Use the 'search' tool to gather broad information about the topic
STEP 2: Use the 'wikipedia_search' tool for additional context and academic information
STEP 3: Use the 'save_text_to_file' tool to save your findings
STEP 4: Provide your final JSON response

IMPORTANT GUIDELINES:
- Provide a detailed and comprehensive analysis
- Include at least 5 key points from your research
- Break down complex concepts into understandable parts
- Include relevant statistics, facts, and figures when available
- Consider different perspectives on the topic
- Highlight any controversies or debates in the field
- Include practical applications or implications
- Mention any recent developments or future trends

Your final JSON response format: {format_instructions}

Remember: You cannot complete this task without using all tools and providing comprehensive information!
                """,
            ),
            ("placeholder", "{chat_history}"),
            ("human", "Research this topic thoroughly: {query}"),
            ("placeholder", "{agent_scratchpad}"),
        ]).partial(format_instructions=parser.get_format_instructions())

        # Create agent
        tools = [search_tool, wiki_tool, save_tool]
        agent = create_tool_calling_agent(llm=llm, prompt=prompt, tools=tools)

        agent_executor = AgentExecutor(
            agent=agent,
            tools=tools,
            verbose=False,  # Disable verbose for cleaner output
            max_iterations=15,
            early_stopping_method="generate"
        )

        # Execute the agent
        raw_response = agent_executor.invoke({"query": query})

        # Parse response
        output_text = raw_response.get("output", "")
        
        # Clean JSON from potential markdown formatting
        cleaned_output = re.sub(r"^```json\n|```$", "", output_text.strip(), flags=re.MULTILINE)
        
        try:
            structured_response = parser.parse(cleaned_output)
            
            # Save the full research output to file with enhanced formatting
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"Research Topic: {structured_response.topic}\n\n")
                f.write(f"Summary:\n{structured_response.summary}\n\n")
                f.write(f"Key Points:\n{chr(10).join(['• ' + point for point in structured_response.key_points])}\n\n")
                f.write(f"Detailed Analysis:\n{structured_response.detailed_analysis}\n\n")
                f.write(f"Sources:\n{chr(10).join(['- ' + source for source in structured_response.sources])}\n\n")
                f.write(f"Tools Used:\n{chr(10).join(['- ' + tool for tool in structured_response.tools_used])}\n")
            
            # Output the structured response for Node.js to parse
            print(f"topic='{structured_response.topic}' summary='{structured_response.summary}' key_points={structured_response.key_points} detailed_analysis='{structured_response.detailed_analysis}' sources={structured_response.sources} tools_used={structured_response.tools_used}")
            
            # Also output as JSON for easier parsing
            result_dict = {
                "topic": structured_response.topic,
                "summary": structured_response.summary,
                "key_points": structured_response.key_points,
                "detailed_analysis": structured_response.detailed_analysis,
                "sources": structured_response.sources,
                "tools_used": structured_response.tools_used
            }
            
            print("JSON_RESULT:" + json.dumps(result_dict))
            
        except Exception as parse_error:
            print(f"PARSE_ERROR: {parse_error}", file=sys.stderr)
            print(f"RAW_OUTPUT: {output_text}", file=sys.stderr)
            
            # Fallback response with enhanced structure
            fallback = {
                "topic": query,
                "summary": f"Research completed for: {query}. Due to parsing issues, detailed results may not be available.",
                "key_points": ["Research completed", "Results may be limited", "Please try again if needed"],
                "detailed_analysis": "The research was completed but encountered some technical issues. Please try your query again for more detailed results.",
                "sources": ["Web search", "Wikipedia"],
                "tools_used": ["search", "wikipedia_search", "save_text_to_file"]
            }
            
            # Save fallback output to file
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"Research Topic: {fallback['topic']}\n\n")
                f.write(f"Summary:\n{fallback['summary']}\n\n")
                f.write(f"Key Points:\n{chr(10).join(['• ' + point for point in fallback['key_points']])}\n\n")
                f.write(f"Detailed Analysis:\n{fallback['detailed_analysis']}\n\n")
                f.write(f"Sources:\n{chr(10).join(['- ' + source for source in fallback['sources']])}\n\n")
                f.write(f"Tools Used:\n{chr(10).join(['- ' + tool for tool in fallback['tools_used']])}\n")
            
            print(f"topic='{fallback['topic']}' summary='{fallback['summary']}' key_points={fallback['key_points']} detailed_analysis='{fallback['detailed_analysis']}' sources={fallback['sources']} tools_used={fallback['tools_used']}")
            print("JSON_RESULT:" + json.dumps(fallback))

    except Exception as e:
        print(f"AGENT_ERROR: {str(e)}", file=sys.stderr)
        
        # Emergency fallback with enhanced structure
        emergency_response = {
            "topic": getattr(sys.argv, '1', 'Research Topic') if len(sys.argv) > 1 else 'Research Topic',
            "summary": f"An error occurred during research: {str(e)}",
            "key_points": ["Error occurred", "Please try again", "Contact support if issue persists"],
            "detailed_analysis": f"An error occurred while processing your request: {str(e)}. Please try again or contact support if the issue persists.",
            "sources": [],
            "tools_used": []
        }
        
        # Save error output to file
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"Research Topic: {emergency_response['topic']}\n\n")
                f.write(f"Summary:\n{emergency_response['summary']}\n\n")
                f.write(f"Key Points:\n{chr(10).join(['• ' + point for point in emergency_response['key_points']])}\n\n")
                f.write(f"Detailed Analysis:\n{emergency_response['detailed_analysis']}\n\n")
                f.write(f"Sources:\n{chr(10).join(['- ' + source for source in emergency_response['sources']])}\n\n")
                f.write(f"Tools Used:\n{chr(10).join(['- ' + tool for tool in emergency_response['tools_used']])}\n")
        
        print("JSON_RESULT:" + json.dumps(emergency_response))
        sys.exit(1)

if __name__ == "__main__":
    main()