"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MiniAppCard } from "@/components/mini-app-card"
import { ApiKeyBanner } from "@/components/api-key-banner"
import { NavBar } from "@/components/nav-bar"
import {
  BookOpen,
  Video,
  Headphones,
  ImageIcon,
  FileText,
  Sparkles,
  MessageSquare,
  FileVideo,
  ArrowRight,
} from "lucide-react"

export default function Home() {
  
  const [isAuthenticated] = useState(false) // This would come from your auth state

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
       

        {/* Hero Section */}
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Your All-in-One AI Suite</h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Access powerful AI tools for content creation, translation, research, and more. All in one place,
                designed for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/auth/register">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-black/30 border-purple-900/30" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>

            {/* Feature Preview */}
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                Discover Our AI-Powered Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Video Translation</h3>
                  <p className="text-gray-400">
                    Translate spoken language in videos in real-time with advanced AI technology.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Story Generation</h3>
                  <p className="text-gray-400">
                    Create unique stories and content with AI-powered creative writing tools.
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Research</h3>
                  <p className="text-gray-400">
                    Conduct comprehensive research with AI-assisted analysis and summaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-24 text-center">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-6">
                  Join thousands of users who are already creating amazing content with our AI tools.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/auth/register">Create Free Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ApiKeyBanner />

          {/* Mini Apps Section */}
          <section className="mt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Mini Apps</h2>
                <p className="text-gray-400 mt-2">Explore our collection of AI-powered mini applications</p>
              </div>
              <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
                <Sparkles className="mr-2 h-4 w-4" />
                New Mini App
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <MiniAppCard
                title="Video Translation"
                description="Translate spoken language in videos in real-time"
                icon={<Video className="h-6 w-6" />}
                href="/apps/video-translation"
                color="from-purple-600 to-blue-600"
              />
              <MiniAppCard
                title="Audio Documents"
                description="Convert documents into natural-sounding speech"
                icon={<Headphones className="h-6 w-6" />}
                href="/apps/audio-documents"
                color="from-pink-600 to-purple-600"
              />
              <MiniAppCard
                title="Bedtime Story Creator"
                description="Generate unique bedtime stories for children"
                icon={<BookOpen className="h-6 w-6" />}
                href="/apps/bedtime-story"
                color="from-blue-600 to-cyan-600"
              />
              <MiniAppCard
                title="Video Auto-Captions"
                description="Automatically generate captions for videos"
                icon={<FileVideo className="h-6 w-6" />}
                href="/apps/video-captions"
                color="from-amber-600 to-orange-600"
              />
              <MiniAppCard
                title="Daily Recap"
                description="Get personalized summaries of news and information"
                icon={<FileText className="h-6 w-6" />}
                href="/apps/daily-recap"
                color="from-green-600 to-emerald-600"
              />
              <MiniAppCard
                title="Text-to-Image"
                description="Transform text descriptions into images"
                icon={<ImageIcon className="h-6 w-6" />}
                href="/apps/text-to-image"
                color="from-red-600 to-pink-600"
              />
              <MiniAppCard
                title="AI Research"
                description="Conduct comprehensive internet research"
                icon={<MessageSquare className="h-6 w-6" />}
                href="/apps/ai-research"
                color="from-violet-600 to-indigo-600"
              />
              <MiniAppCard
                title="Add Custom App"
                description="Create your own AI-powered mini application"
                icon={<Sparkles className="h-6 w-6" />}
                href="/apps/create"
                color="from-gray-600 to-gray-700"
                isAddCard={true}
              />
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Recent Activity</h2>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Bedtime Story Created</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      You generated a story about "The Adventures of Luna the Space Cat"
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Today at 2:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Image Generated</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      You created an image with the prompt "Futuristic city with flying cars"
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Yesterday at 10:12 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

