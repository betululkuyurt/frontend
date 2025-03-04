"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function NavBar() {
  const pathname = usePathname()
  const [isAuthenticated] = useState(true) // Bunu auth state ile güncelleyeceksin

  const navItems = [
    
    { title: "My Apps", href: "/apps" },
    { title: "API Keys", href: "/apps/api-keys" },
    { title: "Settings", href: "/settings" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 my-2">
          <div className="flex items-center gap-4 md:gap-16">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <span className="ml-3 text-white font-semibold">AI Super App</span>
            </Link>

            {/* Menü sadece giriş yapılınca */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white",
                      pathname === item.href ? "text-white" : "text-gray-400",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <>
                <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
