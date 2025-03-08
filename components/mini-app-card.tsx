"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface MiniAppCardProps {
  title: string
  description: string
  icon: React.ReactNode
  serviceType: string // Changed from href to serviceType
  color: string
  isAddCard?: boolean
}

export function MiniAppCard({ title, description, icon, serviceType, color, isAddCard = false }: MiniAppCardProps) {
  const href = isAddCard ? "/apps/new" : `/apps/service?type=${serviceType}`

  return (
    <Link href={href}>
      <div className="group relative h-full">
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300",
            color,
          )}
        />
        <div className="relative h-full bg-black/40 backdrop-blur-sm rounded-xl border border-purple-900/30 p-6 flex flex-col hover:border-purple-500/50 transition-colors duration-300">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br", color)}>
            {isAddCard ? <Plus className="h-6 w-6 text-white" /> : icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm flex-grow">{description}</p>
          <div className="mt-4 text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
            {isAddCard ? "Create new" : "Open app"} →
          </div>
        </div>
      </div>
    </Link>
  )
}