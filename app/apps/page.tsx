"use client"

import { MiniAppCard } from "@/components/mini-app-card"
import { NavBar } from "@/components/nav-bar"
import { BookOpen, Video, Headphones, ImageIcon, FileText, Sparkles, MessageSquare, FileVideo } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AppsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.push("/auth/login")
    }
  }, [router])

  if (isAuthenticated === null) {
    // Optional: Show a loading state while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">My Apps</h2>
              <p className="text-gray-400 mt-2">Manage your AI-powered applications</p>
            </div>
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
        </div>
      </main>
    </div>
  )
}
