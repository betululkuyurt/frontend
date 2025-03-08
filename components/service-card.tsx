import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  serviceType: string
  color: string
  isAddCard?: boolean
}

export function ServiceCard({
  title,
  description,
  icon,
  serviceType,
  color,
  isAddCard
}: ServiceCardProps) {
  return (
    <Link href={isAddCard ? "/apps/create" : `/apps/service?type=${serviceType}`}>
      <Card
        className={cn(
          "group relative overflow-hidden bg-gradient-to-b p-6 transition-all hover:scale-105",
          isAddCard ? "from-gray-900 to-gray-800" : `${color}`,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            {icon}
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>

          <div className="mt-4 flex items-center text-sm text-white/60">
            <span className="group-hover:text-white">
              {isAddCard ? "Yeni Servis Oluştur" : "Servisi Kullan"}
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  )
} 