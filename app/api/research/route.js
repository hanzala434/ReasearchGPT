import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { query } = await request.json();
        
        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        // Call the FastAPI endpoint
        const response = await fetch(process.env.RESEARCH_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to generate research');
        }

        const data = await response.json();
        
        // Generate a unique filename for the download
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const safeQuery = query.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `research_${safeQuery}_${timestamp}.txt`;
        
        // Add download information to the response
        const result = {
            ...data,
            download: {
                filename: filename,
                url: `/downloads/${filename}`,
                path: `/public/downloads/${filename}`
            }
        };
        
        return NextResponse.json(result);
        
    } catch (error) {
        console.error('Research API error:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while generating research' },
            { status: 500 }
        );
    }
}