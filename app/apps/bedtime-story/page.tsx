"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, BookOpen, Download, Copy, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
export default function BedtimeStoryPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [storyGenerated, setStoryGenerated] = useState(false)
  const [storyText, setStoryText] = useState("")
  const router = useRouter()
  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setStoryGenerated(true)
      setStoryText(`# The Adventures of Luna the Space Cat

Once upon a time, in a cozy little house at the edge of the Milky Way, there lived a small purple cat named Luna. Luna wasn't like other cats. She had sparkling eyes that reflected the stars and a tail that glowed in the dark.

Every night, when her human friend Max went to sleep, Luna would slip out through her special cat door that led not to the garden, but straight into outer space!

"Time for another adventure," Luna purred as she floated among the stars.

Tonight, Luna decided to visit the Moon Mice, her friends who lived in the craters of the moon. They loved to play hide-and-seek among the moon dust and tell stories about the strange creatures called humans who sometimes visited their home.

"Luna! You're here!" squeaked Pip, the smallest Moon Mouse. "We've been waiting for you. We found something strange today!"

The mice led Luna to a small, shiny object half-buried in the moon dust. It was a toy rocket that had fallen from a human spacecraft.

"I know what this is," Luna said proudly. "My friend Max has one just like it!"

Together, Luna and the Moon Mice fixed up the toy rocket with stardust and moonbeams. When it was ready, they all climbed aboard for a ride around the moon, laughing and singing space songs.

As the Earth began to brighten with the coming dawn, Luna knew it was time to return home. She said goodbye to her friends, promising to return the next night with treats from Earth.

Luna slipped back through her special door just as Max was waking up.

"Good morning, Luna," Max said, stroking her purple fur. "Did you have sweet dreams?"

Luna just purred and winked one starry eye. Her adventures would be their little secret.

And as Max went off to school, Luna curled up in her bed by the window, where she could see the moon, and dreamed of her next nighttime adventure among the stars.

The End.`)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 my-2">
          <Button
                variant="ghost"
                onClick={() => router.push("/apps")}
                className="flex items-center text-gray-300 hover:text-white p-0"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            <div className="mx-auto flex items-center">
              <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-white font-semibold">Bedtime Story Creator</span>
            </div>
            <div className="w-24"></div> {/* Spacer to center the title */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Story Generator Form */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Create a Bedtime Story</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Child's Name</label>
                  <Input
                    placeholder="Enter child's name"
                    className="bg-black/30 border-purple-900/50 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                  <Select defaultValue="4-6">
                    <SelectTrigger className="bg-black/30 border-purple-900/50 focus:border-purple-500">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-6">4-6 years</SelectItem>
                      <SelectItem value="7-9">7-9 years</SelectItem>
                      <SelectItem value="10-12">10-12 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Story Theme</label>
                  <Select defaultValue="space">
                    <SelectTrigger className="bg-black/30 border-purple-900/50 focus:border-purple-500">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="space">Space Adventure</SelectItem>
                      <SelectItem value="forest">Enchanted Forest</SelectItem>
                      <SelectItem value="ocean">Ocean Exploration</SelectItem>
                      <SelectItem value="dinosaur">Dinosaur World</SelectItem>
                      <SelectItem value="fairy">Fairy Tale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Main Character</label>
                  <Select defaultValue="cat">
                    <SelectTrigger className="bg-black/30 border-purple-900/50 focus:border-purple-500">
                      <SelectValue placeholder="Select a character" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="dragon">Dragon</SelectItem>
                      <SelectItem value="robot">Robot</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Story Length</label>
                    <span className="text-xs text-gray-400">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Elements (Optional)</label>
                  <Textarea
                    placeholder="Add any specific elements you'd like in the story (e.g., a lesson about sharing, a magical object, etc.)"
                    className="bg-black/30 border-purple-900/50 focus:border-purple-500 min-h-[100px]"
                  />
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Generating Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Story
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Story Display */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Story</h2>
                {storyGenerated && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {storyGenerated ? (
                <div className="prose prose-invert max-w-none">
                  <div
                    className="max-h-[600px] overflow-y-auto pr-4 text-gray-300 space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: storyText.replace(/\n\n/g, "<br/><br/>").replace(/# (.*?)\n/, "<h1>$1</h1>"),
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <BookOpen className="h-16 w-16 text-purple-900/50 mb-4" />
                  <p className="text-gray-400">Your generated story will appear here</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Fill out the form and click "Generate Story" to create a unique bedtime story
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

