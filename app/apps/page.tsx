"use client"

import { MiniAppCard } from "@/components/mini-app-card"
import { NavBar } from "@/components/nav-bar"
import { BookOpen, Video, Headphones, ImageIcon, FileText, Sparkles, MessageSquare, FileVideo,Wand2,Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ApiKeyBanner } from "@/components/api-key-banner"
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

  const services = [
    {
      title: "Video Translation",
      description: "Translate videos into multiple languages with AI",
      icon: <Video className="h-6 w-6 text-white" />,
      serviceType: "video-translation",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Bedtime Story",
      description: "Generate creative bedtime stories for children",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      serviceType: "bedtime-story",
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "AI Chat",
      description: "Chat with our advanced AI assistant",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      serviceType: "ai-chat",
      color: "from-green-600 to-green-800",
    },
    {
      title: "Text to Image",
      description: "Generate images from text descriptions",
      icon: <Wand2 className="h-6 w-6 text-white" />,
      serviceType: "text-to-image",
      color: "from-pink-600 to-pink-800",
    },
    {
      title: "Audio Documents",
      description: "Convert documents into natural-sounding speech",
      icon: <Headphones className="h-6 w-6 text-white" />,
      serviceType: "audio-documents",
      color: "from-orange-600 to-orange-800",
    },
    {
      title: "Video Auto-Captions",
      description: "Automatically generate captions for videos",
      icon: <FileVideo className="h-6 w-6 text-white" />,
      serviceType: "video-captions",
      color: "from-red-600 to-red-800",
    },
    {
      title: "Daily Recap",
      description: "Get personalized summaries of news and information",
      icon: <FileText className="h-6 w-6 text-white" />,
      serviceType: "daily-recap",
      color: "from-emerald-600 to-teal-800",
    },

  ]





  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">AI Services</h1>
            <p className="text-gray-400">Select a service to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <MiniAppCard key={service.serviceType} {...service} />
            ))}
            <MiniAppCard
              title="Create New"
              description="Create a custom AI service"
              icon={<Plus className="h-6 w-6 text-white" />}
              serviceType=""
              color="from-gray-600 to-gray-800"
              isAddCard
            />
          </div>

          

          
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