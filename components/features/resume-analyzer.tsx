"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FileUp, CheckCircle, AlertCircle, Info } from "lucide-react"

interface AnalysisResults {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywords: { word: string; count: number }[]
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResults | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResults(null)
    }
  }

  const handleAnalyze = () => {
    if (!file) return

    setAnalyzing(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock analysis results
      setResults({
        score: 78,
        strengths: [
          "Clear professional summary",
          "Quantifiable achievements",
          "Relevant technical skills",
          "Good education section",
        ],
        weaknesses: ["Too lengthy (3 pages)", "Some outdated skills listed", "Missing keywords for target roles"],
        suggestions: [
          "Trim resume to 1-2 pages",
          "Remove experience older than 10 years",
          "Add more industry-specific keywords",
          "Highlight leadership experience more prominently",
        ],
        keywords: [
          { word: "React", count: 5 },
          { word: "JavaScript", count: 8 },
          { word: "TypeScript", count: 3 },
          { word: "Node.js", count: 2 },
          { word: "API", count: 4 },
        ],
      })
      setAnalyzing(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Improvement"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Resume Analyzer</CardTitle>
        <CardDescription>Upload your resume to get AI-powered feedback and suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        {!results ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-600 mb-1">{file ? file.name : "Click to upload your resume"}</p>
                <p className="text-xs text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
              </label>
            </div>

            {file && (
              <div className="flex justify-center">
                <Button onClick={handleAnalyze} disabled={analyzing} className="bg-[#0077B5] hover:bg-[#005885]">
                  {analyzing ? "Analyzing..." : "Analyze Resume"}
                </Button>
              </div>
            )}

            {analyzing && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-2">Analyzing your resume...</p>
                <Progress value={45} className="h-2 max-w-md mx-auto" />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}%</div>
              <div className={`text-sm font-medium ${getScoreColor(results.score)}`}>{getScoreText(results.score)}</div>
              <Progress value={results.score} className="h-2 w-full max-w-xs mt-2" />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center text-green-600 font-medium mb-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {results.strengths.map((strength, i) => (
                    <li key={i} className="text-sm">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center text-red-600 font-medium mb-2">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {results.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm">
                      • {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="flex items-center text-blue-600 font-medium mb-2">
                <Info className="h-4 w-4 mr-2" />
                Suggestions
              </h3>
              <ul className="space-y-2">
                {results.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Keyword Analysis</h3>
              <div className="flex flex-wrap gap-2">
                {results.keywords.map((keyword, i) => (
                  <div key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>{keyword.word}</span>
                    <span className="ml-1 bg-[#0077B5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {keyword.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {results && (
          <>
            <Button variant="outline" onClick={() => setResults(null)}>
              Upload New Resume
            </Button>
            <Button className="bg-[#0077B5] hover:bg-[#005885]">Download Full Report</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}