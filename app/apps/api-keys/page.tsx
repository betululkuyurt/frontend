"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, Key, Plus, Trash2, Eye, EyeOff, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
interface ApiKey {
  id: string
  name: string
  key: string
  provider: string
  lastUsed: string
  status: "active" | "expired" | "invalid"
}

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "OpenAI Production",
      key: "sk-1234567890abcdefghijklmnopqrstuvwxyz1234",
      provider: "openai",
      lastUsed: "Today at 10:23 AM",
      status: "active",
    },
    {
      id: "2",
      name: "Gemini API",
      key: "AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz",
      provider: "gemini",
      lastUsed: "Yesterday at 3:45 PM",
      status: "active",
    },
    {
      id: "3",
      name: "OpenAI Testing",
      key: "sk-abcdefghijklmnopqrstuvwxyz1234567890abcd",
      provider: "openai",
      lastUsed: "Oct 15, 2024",
      status: "expired",
    },
  ])

  const toggleShowKey = (id: string) => {
    setShowKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const deleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "expired":
        return "text-amber-500"
      case "invalid":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="h-4 w-4 text-green-500" />
      case "expired":
        return <X className="h-4 w-4 text-amber-500" />
      case "invalid":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return null
    }
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
              <Key className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-white font-semibold">API Key Management</span>
            </div>
            <div className="w-24"></div> {/* Spacer to center the title */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-black/40 border border-purple-900/30">
                <TabsTrigger value="all">All Keys</TabsTrigger>
                <TabsTrigger value="openai">OpenAI</TabsTrigger>
                <TabsTrigger value="gemini">Gemini</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Key
              </Button>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-900/30">
                <CardHeader>
                  <CardTitle>Your API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for different AI services. These keys are encrypted and stored securely.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div
                        key={apiKey.id}
                        className="p-4 rounded-lg border border-purple-900/30 bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white">{apiKey.name}</h3>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(apiKey.status)} border-current flex items-center gap-1`}
                            >
                              {getStatusIcon(apiKey.status)}
                              {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            Provider: {apiKey.provider.charAt(0).toUpperCase() + apiKey.provider.slice(1)}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="font-mono text-xs text-gray-400 bg-black/30 px-3 py-1 rounded border border-gray-700 flex-1 truncate max-w-[300px]">
                              {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 8) + "•".repeat(20)}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleShowKey(apiKey.id)}
                              className="ml-2 text-gray-400"
                            >
                              {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Last used: {apiKey.lastUsed}</p>
                        </div>
                        <div className="flex sm:flex-col gap-2 self-end sm:self-center">
                          <Button variant="outline" size="sm">
                            Test
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-purple-900/50">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this API key? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => deleteKey(apiKey.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-purple-900/30 pt-6">
                  <p className="text-sm text-gray-400">
                    API keys are encrypted and stored securely. We never share your keys with third parties.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="openai" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-900/30">
                <CardHeader>
                  <CardTitle>OpenAI API Keys</CardTitle>
                  <CardDescription>
                    Manage your OpenAI API keys for GPT models and other OpenAI services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys
                      .filter((key) => key.provider === "openai")
                      .map((apiKey) => (
                        <div
                          key={apiKey.id}
                          className="p-4 rounded-lg border border-purple-900/30 bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{apiKey.name}</h3>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(apiKey.status)} border-current flex items-center gap-1`}
                              >
                                {getStatusIcon(apiKey.status)}
                                {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="font-mono text-xs text-gray-400 bg-black/30 px-3 py-1 rounded border border-gray-700 flex-1 truncate max-w-[300px]">
                                {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 8) + "•".repeat(20)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleShowKey(apiKey.id)}
                                className="ml-2 text-gray-400"
                              >
                                {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Last used: {apiKey.lastUsed}</p>
                          </div>
                          <div className="flex sm:flex-col gap-2 self-end sm:self-center">
                            <Button variant="outline" size="sm">
                              Test
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteKey(apiKey.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gemini" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-900/30">
                <CardHeader>
                  <CardTitle>Gemini API Keys</CardTitle>
                  <CardDescription>
                    Manage your Google Gemini API keys for Gemini models and other Google AI services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys
                      .filter((key) => key.provider === "gemini")
                      .map((apiKey) => (
                        <div
                          key={apiKey.id}
                          className="p-4 rounded-lg border border-purple-900/30 bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{apiKey.name}</h3>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(apiKey.status)} border-current flex items-center gap-1`}
                              >
                                {getStatusIcon(apiKey.status)}
                                {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="font-mono text-xs text-gray-400 bg-black/30 px-3 py-1 rounded border border-gray-700 flex-1 truncate max-w-[300px]">
                                {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 8) + "•".repeat(20)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleShowKey(apiKey.id)}
                                className="ml-2 text-gray-400"
                              >
                                {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Last used: {apiKey.lastUsed}</p>
                          </div>
                          <div className="flex sm:flex-col gap-2 self-end sm:self-center">
                            <Button variant="outline" size="sm">
                              Test
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => deleteKey(apiKey.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-900/30">
                <CardHeader>
                  <CardTitle>Custom API Endpoints</CardTitle>
                  <CardDescription>
                    Configure custom API endpoints for self-hosted models or other AI services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">No Custom Endpoints Yet</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Add a custom endpoint to connect to your self-hosted models
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">Add Custom Endpoint</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

