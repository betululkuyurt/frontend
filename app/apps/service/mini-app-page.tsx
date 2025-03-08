"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Upload, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

// Backend'den gelecek servis konfigürasyon tipi
interface ServiceConfig {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon identifier from backend
  color: string;
  inputs: {
    id: string;
    type: 'text' | 'file' | 'select' | 'textarea' | 'url';
    label: string;
    placeholder?: string;
    options?: { value: string; label: string; }[];
    accept?: string;
    required?: boolean;
    validation?: {
      maxLength?: number;
      minLength?: number;
      pattern?: string;
    };
  }[];
  layout: 'single' | 'split' | 'chat' | 'gallery';
  outputType: 'text' | 'image' | 'video' | 'audio';
}

// ServiceError component'i ekleyelim
const ServiceError = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg">
    <div className="text-red-500 mb-4">{message}</div>
    <div className="flex gap-4">
      <Button variant="outline" onClick={() => window.history.back()}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Geri Dön
      </Button>
      {onRetry && (
        <Button onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Tekrar Dene
        </Button>
      )}
    </div>
  </div>
)

// Loading component'i ekleyelim
const ServiceLoading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="flex items-center gap-2">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>Yükleniyor...</span>
    </div>
  </div>
)

export default function ServicePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get('type')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [result, setResult] = useState<any>(null)
  const [serviceConfig, setServiceConfig] = useState<ServiceConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!serviceType) {
      router.push('/apps')
      return
    }

    const fetchServiceConfig = async () => {
      try {
        const response = await fetch(`/api/services/${serviceType}/config`, {
          credentials: 'include'
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/login')
            return
          }
          throw new Error('Failed to fetch service configuration')
        }

        const config = await response.json()
        setServiceConfig(config)
      } catch (error) {
        console.error('Error:', error)
        setError('Failed to load service configuration')
      } finally {
        setLoading(false)
      }
    }

    fetchServiceConfig()
  }, [serviceType, router])


  const handleInputChange = (inputId: string, value: any) => {
    setFormData(prev => ({ ...prev, [inputId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceConfig) return

    try {
      setLoading(true)
      setError(null)

      const formDataToSend = new FormData()
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value)
        } else {
          formDataToSend.append(key, String(value))
        }
      })

      const response = await fetch(`/api/services/${serviceType}/process`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'İşlem başarısız oldu')
      }

      const result = await response.json()
      setResult(result)
      toast.success('İşlem başarıyla tamamlandı')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Bir hata oluştu')
      setError('Servis işlemi başarısız oldu')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <NavBar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <ServiceError message={error} />
          </div>
        </main>
      </div>
    )
  }

  if (!serviceConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
        <NavBar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <ServiceLoading />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-gray-300 hover:text-white mb-8"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Services
          </Button>

          <div className="flex items-center space-x-3 mb-8">
            <div className={`text-${serviceConfig.color}-400`}>
              {/* Dynamic icon rendering based on backend config */}
              <span className="text-2xl">{serviceConfig.icon}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{serviceConfig.title}</h1>
              <p className="text-gray-400">{serviceConfig.description}</p>
            </div>
          </div>

          <div className={`
            ${serviceConfig.layout === 'split' ? 'grid grid-cols-2 gap-6' : 'space-y-6'}
            ${serviceConfig.layout === 'gallery' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : ''}
          `}>
            <Card className={`bg-black/40 backdrop-blur-sm border-${serviceConfig.color}-900/30 p-6`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {serviceConfig.inputs.map((input) => (
                  <div key={input.id} className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      {input.label}
                      {input.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {input.type === 'text' && (
                      <Input
                        type="text"
                        placeholder={input.placeholder}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className={`bg-black/30 border-${serviceConfig.color}-900/30`}
                        required={input.required}
                        maxLength={input.validation?.maxLength}
                        minLength={input.validation?.minLength}
                        pattern={input.validation?.pattern}
                      />
                    )}

                    {input.type === 'textarea' && (
                      <Textarea
                        placeholder={input.placeholder}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className={`bg-black/30 border-${serviceConfig.color}-900/30 h-32`}
                        required={input.required}
                        maxLength={input.validation?.maxLength}
                        minLength={input.validation?.minLength}
                      />
                    )}

                    {input.type === 'file' && (
                      <div className={`border-2 border-dashed border-${serviceConfig.color}-900/30 rounded-lg p-8 text-center`}>
                        <Upload className={`h-8 w-8 text-${serviceConfig.color}-400 mx-auto mb-4`} />
                        <Input
                          type="file"
                          accept={input.accept}
                          onChange={(e) => handleInputChange(input.id, e.target.files?.[0])}
                          className="hidden"
                          id={input.id}
                          required={input.required}
                        />
                        <label
                          htmlFor={input.id}
                          className={`text-${serviceConfig.color}-400 hover:text-${serviceConfig.color}-300 cursor-pointer`}
                        >
                          Choose a file
                        </label>
                      </div>
                    )}

                    {input.type === 'select' && input.options && (
                      <Select
                        onValueChange={(value) => handleInputChange(input.id, value)}
                        required={input.required}
                      >
                        <SelectTrigger className={`bg-black/30 border-${serviceConfig.color}-900/30`}>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {input.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}

                <Button 
                  type="submit" 
                  className={`w-full bg-${serviceConfig.color}-600 hover:bg-${serviceConfig.color}-700`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Generate"}
                </Button>
              </form>
            </Card>

            {result && (
              <Card className={`bg-black/40 backdrop-blur-sm border-${serviceConfig.color}-900/30 p-6`}>
                <h2 className="text-lg font-medium text-white mb-4">Result</h2>
                <div className={`bg-black/30 border border-${serviceConfig.color}-900/30 rounded-lg p-4`}>
                  {serviceConfig.outputType === 'image' ? (
                    <img src={result.url} alt="Generated" className="w-full rounded-lg" />
                  ) : serviceConfig.outputType === 'video' ? (
                    <video src={result.url} controls className="w-full rounded-lg" />
                  ) : serviceConfig.outputType === 'audio' ? (
                    <audio src={result.url} controls className="w-full" />
                  ) : (
                    <pre className="text-gray-300 whitespace-pre-wrap">{result.text}</pre>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}