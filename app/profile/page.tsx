"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { NavBar } from "@/components/nav-bar"
import { ChevronLeft, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import router from "next/router"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/apps")}
              className="flex items-center text-gray-300 hover:text-white p-0"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Dashboardjhhh
            </Button>
          </div>

          <div className="grid gap-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
              <Avatar className="w-24 h-24 border-2 border-purple-500/30">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-white mb-2">DBU Team</h1>
                <p className="text-gray-400 mb-4">Member since March 2024</p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              <div className="flex flex-col gap-2 min-w-[150px] text-center bg-purple-900/20 rounded-lg p-4">
                <div>
                  <div className="text-2xl font-bold text-white">28</div>
                  <div className="text-sm text-gray-400">Apps Created</div>
                </div>
                <Separator className="bg-purple-900/30" />
                <div>
                  <div className="text-2xl font-bold text-white">1.2k</div>
                  <div className="text-sm text-gray-400">Generations</div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="bg-black/30 border-purple-900/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="bg-black/30 border-purple-900/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-black/30 border-purple-900/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="bg-black/30 border-purple-900/30 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://your-website.com"
                    className="bg-black/30 border-purple-900/30"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>

            {/* API Usage */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">API Usage</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Total API Calls</div>
                  <div className="text-2xl font-bold text-white">12,543</div>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Active API Keys</div>
                  <div className="text-2xl font-bold text-white">3</div>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Usage This Month</div>
                  <div className="text-2xl font-bold text-white">2.1GB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

