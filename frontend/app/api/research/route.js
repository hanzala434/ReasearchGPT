import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
        
        // Create the downloads directory if it doesn't exist
        const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }
        
        // Save the research output to a file
        const filePath = path.join(downloadsDir, filename);
        const fileContent = `Research Topic: ${data.topic}\n\n` +
            `Summary:\n${data.summary}\n\n` +
            `Key Points:\n${data.key_points.map(point => `• ${point}`).join('\n')}\n\n` +
            `Detailed Analysis:\n${data.detailed_analysis}\n\n` +
            `Sources:\n${data.sources.map(source => `- ${source}`).join('\n')}\n\n` +
            `Tools Used:\n${data.tools_used.map(tool => `- ${tool}`).join('\n')}`;
        
        fs.writeFileSync(filePath, fileContent, 'utf-8');
        
        // Add download information to the response
        const result = {
            ...data,
            download: {
                filename: filename,
                url: `/api/download?filename=${filename}`
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