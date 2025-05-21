import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
    try {
        const { query } = await request.json();
        
        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        const pythonScriptPath = path.join(process.cwd(), 'agent', 'main.py');
        const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
        
        // Ensure downloads directory exists
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        // Check if Python script exists
        if (!fs.existsSync(pythonScriptPath)) {
            return NextResponse.json(
                { error: `Python script not found at: ${pythonScriptPath}` },
                { status: 500 }
            );
        }

        // Generate a unique filename based on timestamp and query
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const safeQuery = query.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `research_${safeQuery}_${timestamp}.txt`;
        const outputPath = path.join(downloadsDir, filename);

        return new Promise((resolve, reject) => {
            // Set environment variables for proper encoding
            const env = {
                ...process.env,
                PYTHONIOENCODING: 'utf-8',
                PYTHONLEGACYWINDOWSSTDIO: 'utf-8',
                RESEARCH_OUTPUT_PATH: outputPath // Pass output path to Python script
            };

            // Pass query as command line argument instead of stdin
            const pythonProcess = spawn('python', [pythonScriptPath, query], {
                stdio: ['ignore', 'pipe', 'pipe'],
                env: env
            });

            let output = '';
            let error = '';

            // Handle process errors
            pythonProcess.on('error', (err) => {
                resolve(NextResponse.json(
                    { error: `Failed to start Python process: ${err.message}` },
                    { status: 500 }
                ));
            });

            pythonProcess.stdout.on('data', (data) => {
                const chunk = data.toString('utf-8');
                console.log('Python stdout:', chunk);
                output += chunk;
            });

            pythonProcess.stderr.on('data', (data) => {
                const chunk = data.toString('utf-8');
                console.error('Python stderr:', chunk);
                error += chunk;
            });

            pythonProcess.on('close', (code) => {
                console.log('Python process exited with code:', code);
                console.log('Final output:', output);
                console.log('Final error:', error);

                if (code !== 0) {
                    resolve(NextResponse.json(
                        { 
                            error: `Process exited with code ${code}`,
                            details: error,
                            output: output
                        },
                        { status: 500 }
                    ));
                    return;
                }

                try {
                    // Extract JSON result from the output
                    const jsonMatch = output.match(/JSON_RESULT:(\{.*\})/);
                    if (jsonMatch) {
                        const jsonStr = jsonMatch[1];
                        const result = JSON.parse(jsonStr);
                        
                        // Add download information to the response
                        const response = {
                            ...result,
                            download: {
                                filename: filename,
                                url: `/downloads/${filename}`,
                                path: outputPath
                            }
                        };
                        
                        resolve(NextResponse.json(response));
                    } else {
                        throw new Error('No JSON result found in output');
                    }
                } catch (e) {
                    resolve(NextResponse.json(
                        { 
                            error: 'Failed to parse Python output',
                            parseError: e.message,
                            rawOutput: output,
                            stderr: error
                        },
                        { status: 500 }
                    ));
                }
            });
        });
    } catch (error) {
        console.error('Top level error:', error);
        return NextResponse.json(
            { 
                error: error.message,
                stack: error.stack
            },
            { status: 500 }
        );
    }
}