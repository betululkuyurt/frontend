import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ServiceLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: React.ReactNode
  color?: string
  onBack?: () => void
}

export function ServiceLayout({
  children,
  title,
  description,
  icon,
  color = "blue",
  onBack
}: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack || (() => window.history.back())}
            className="text-gray-300 hover:text-white mb-8"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Servislere Dön
          </Button>

          {(title || description) && (
            <div className="flex items-center space-x-3 mb-8">
              {icon && (
                <div className={`text-${color}-400`}>
                  {icon}
                </div>
              )}
              <div>
                {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
                {description && <p className="text-gray-400">{description}</p>}
              </div>
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  )
} 