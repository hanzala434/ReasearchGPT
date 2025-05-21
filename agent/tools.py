from langchain_community.tools import WikipediaQueryRun, DuckDuckGoSearchRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.tools import Tool
from datetime import datetime
import os
import sys


# Global counter to track if save function is ever called
SAVE_CALL_COUNT = 0

def save_to_txt(data: str, filename: str = "research_output.txt"):
    global SAVE_CALL_COUNT
    SAVE_CALL_COUNT += 1
    
    print("=" * 80)
    print(f"🔥🔥🔥 SAVE FUNCTION CALLED #{SAVE_CALL_COUNT} 🔥🔥🔥")
    print("=" * 80)
    print(f"🔥 Data type: {type(data)}")
    print(f"🔥 Data length: {len(data) if isinstance(data, str) else 'Not a string'}")
    print(f"🔥 Data preview: {str(data)[:200]}...")
    
    # Force output flush
    sys.stdout.flush()
    
    # Get absolute path
    abs_path = os.path.abspath(filename)
    print(f"🔥 Saving to: {abs_path}")
    print(f"🔥 Current directory: {os.getcwd()}")
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_text = f"--- Research Output #{SAVE_CALL_COUNT} ---\nTimestamp: {timestamp}\n\n{data}\n\n" + "="*50 + "\n\n"

    try:
        # Ensure directory exists
        os.makedirs(os.path.dirname(abs_path) if os.path.dirname(abs_path) else ".", exist_ok=True)
        
        with open(abs_path, "a", encoding="utf-8") as f:
            f.write(formatted_text)
            f.flush()  # Force write to disk
        
        # Double-check file exists and get size
        if os.path.exists(abs_path):
            file_size = os.path.getsize(abs_path)
            print(f"🔥 ✅ SUCCESS: File saved! Size: {file_size} bytes")
            print(f"🔥 ✅ Location: {abs_path}")
        else:
            print(f"🔥 ❌ File doesn't exist after write!")
        
        print("=" * 80)
        sys.stdout.flush()
        return f"✅ Data successfully saved to {abs_path}"
        
    except Exception as e:
        print(f"🔥 ❌ ERROR: {e}")
        print(f"🔥 ❌ Error type: {type(e)}")
        print("=" * 80)
        sys.stdout.flush()
        return f"❌ Error: {str(e)}"


def save_text_simple(text_content: str) -> str:
    """Save text - with maximum debugging"""
    print("\n" + "🚨" * 20)
    print("🚨 SAVE_TEXT_SIMPLE WRAPPER CALLED!")
    print(f"🚨 Input type: {type(text_content)}")
    print(f"🚨 Input: {str(text_content)[:100]}...")
    print("🚨" * 20 + "\n")
    sys.stdout.flush()
    
    result = save_to_txt(text_content)
    
    print("\n" + "🏁" * 20)
    print(f"🏁 SAVE WRAPPER FINISHED! Result: {result}")
    print("🏁" * 20 + "\n")
    sys.stdout.flush()
    
    return result


# Create save tool with maximum verbosity


save_tool = Tool.from_function(
    func=save_text_simple,
    name="save_text_to_file",
    description="IMPORTANT: Saves research data to a text file. Call this with your complete research summary as a string.",
)


# Also add debugging to other tools to see if they're being called

def search_with_debug(query: str) -> str:
    print(f"\n🔍🔍🔍 SEARCH CALLED: {query} 🔍🔍🔍")
    sys.stdout.flush()
    try:
        search = DuckDuckGoSearchRun()
        result = search.run(query)
        print(f"🔍 SEARCH SUCCESS: {len(result)} chars returned")
        return result
    except Exception as e:
        print(f"🔍 SEARCH ERROR: {e}")
        return f"Search error: {str(e)}"

search_tool = Tool.from_function(
    func=search_with_debug,
    name="search",
    description="Search the web for current information"
)




def wiki_with_debug(query: str) -> str:
    print(f"\n📚📚📚 WIKIPEDIA CALLED: {query} 📚📚📚")
    sys.stdout.flush()
    try:
        api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=500)
        wiki = WikipediaQueryRun(api_wrapper=api_wrapper)
        result = wiki.run(query)
        print(f"📚 WIKIPEDIA SUCCESS: {len(result)} chars returned")
        return result
    except Exception as e:
        print(f"📚 WIKIPEDIA ERROR: {e}")
        return f"Wikipedia error: {str(e)}"

wiki_tool = Tool.from_function(
    func=wiki_with_debug,
    name="wikipedia_search",
    description="Search Wikipedia for reliable information."
)

# Function to check if save was ever called
def check_save_status():
    if SAVE_CALL_COUNT == 0:
        print("\n" + "⚠️ " * 20)
        print("⚠️  WARNING: save_text_to_file was NEVER called!")
        print("⚠️  The agent may not be using the tool correctly.")
        print("⚠️ " * 20)
    else:
        print(f"\n✅ save_text_to_file was called {SAVE_CALL_COUNT} times")