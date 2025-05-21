// File: app/page.js
'use client'

import { useState } from 'react'
import { Download, Search, FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [downloadInfo, setDownloadInfo] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError('')
    setResult(null)
    setDownloadInfo(null)

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate research')
      }

      const data = await response.json()
      setResult(data)
      setDownloadInfo(data.download)
    } catch (err) {
      setError(err.message || 'An error occurred while generating research')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadFile = async () => {
    if (downloadInfo?.url) {
      try {
        // Fetch the file content
        const response = await fetch(downloadInfo.url)
        if (!response.ok) throw new Error('Failed to download file')
        
        // Get the blob from the response
        const blob = await response.blob()
        
        // Create a download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = downloadInfo.filename || 'research.txt'
        
        // Trigger the download
        document.body.appendChild(link)
        link.click()
        
        // Clean up
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (err) {
        setError('Failed to download file: ' + err.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Research Assistant</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your research topic and get a comprehensive research document instantly
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-700 mb-3">
                  What would you like to research?
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your research topic here... (e.g., 'diet plan for healthy 23-year-old male', 'climate change effects on agriculture', etc.)"
                  className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Researching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Generate Research</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Research Complete!</h2>
                </div>
                {downloadInfo && (
                  <button
                    onClick={downloadFile}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Research</span>
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Topic */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Topic</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{result.topic}</p>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Research Summary</h3>
                  <div className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {result.summary}
                  </div>
                </div>

                {/* Key Points */}
                {result.key_points && result.key_points.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Points</h3>
                    <ul className="space-y-2">
                      {result.key_points.map((point, index) => (
                        <li key={index} className="text-gray-700 bg-gray-50 p-3 rounded-lg flex items-start">
                          <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium text-center mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Detailed Analysis */}
                {result.detailed_analysis && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Analysis</h3>
                    <div className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                      {result.detailed_analysis}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {result.sources && result.sources.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sources Used</h3>
                    <ul className="space-y-2">
                      {result.sources.map((source, index) => (
                        <li key={index} className="text-gray-700 bg-gray-50 p-2 rounded flex items-start">
                          <span className="inline-block w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium text-center mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tools Used */}
                {result.tools_used && result.tools_used.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Research Methods</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.tools_used.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                        >
                          {tool.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Generating Research...</h3>
                <p className="text-gray-600">This may take a few moments while we gather information from multiple sources.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Powered by AI Research Assistant • Developed by Hanzala</p>
        </div>
      </div>
    </div>
  )
}