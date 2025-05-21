from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os
import re
import json
import logging
from dotenv import load_dotenv
from main import main as run_agent

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Research GPT API",
    description="API for AI-powered research assistant",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    query: str

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    key_points: list[str]
    detailed_analysis: str
    sources: list[str]
    tools_used: list[str]

@app.post("/research", response_model=ResearchResponse)
async def research(request: ResearchRequest):
    try:
        logger.info(f"Received research request for query: {request.query}")
        
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        # Set up environment for the agent
        os.environ['RESEARCH_OUTPUT_PATH'] = os.path.join(os.getcwd(), 'research_output.txt')
        logger.info(f"Output path set to: {os.environ['RESEARCH_OUTPUT_PATH']}")
        
        # Set the query as a command line argument
        sys.argv = [sys.argv[0], request.query]
        logger.info(f"Set sys.argv to: {sys.argv}")
        
        # Capture stdout to get the agent's output
        original_stdout = sys.stdout
        from io import StringIO
        captured_output = StringIO()
        sys.stdout = captured_output
        
        try:
            # Run the agent with the query
            logger.info("Starting agent execution")
            run_agent()
            logger.info("Agent execution completed")
            
            # Get the captured output
            output = captured_output.getvalue()
            logger.info(f"Captured output length: {len(output)}")
            
            # Extract JSON result from the output
            json_match = re.search(r'JSON_RESULT:(\{.*\})', output)
            if not json_match:
                logger.error("Failed to find JSON result in output")
                raise HTTPException(status_code=500, detail="Failed to parse agent output")
                
            result = json.loads(json_match.group(1))
            logger.info("Successfully parsed JSON result")
            return result
            
        except Exception as e:
            logger.error(f"Error during agent execution: {str(e)}", exc_info=True)
            raise HTTPException(status_code=500, detail=f"Agent execution error: {str(e)}")
            
        finally:
            # Restore stdout
            sys.stdout = original_stdout
            
    except Exception as e:
        logger.error(f"Error in research endpoint: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "healthy"} 