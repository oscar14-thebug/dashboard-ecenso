"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, HomeIcon, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
  inSheet?: boolean
}

export function Sidebar({ className, inSheet = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(true) // Cambiado a true para que aparezca oculto por defecto

  // Cargar el estado del sidebar desde localStorage al iniciar
  useEffect(() => {
    // Only load collapsed state on desktop
    if (!inSheet) {
      const savedState = localStorage.getItem("sidebarCollapsed")
      if (savedState !== null) {
        setCollapsed(savedState === "true")
      }
    }
  }, [inSheet])

  // Guardar el estado del sidebar en localStorage cuando cambia
  useEffect(() => {
    if (!inSheet) {
      localStorage.setItem("sidebarCollapsed", String(collapsed))
    }
  }, [collapsed, inSheet])

  const routes = [
    {
      label: "Censo Experimental",
      icon: LayoutDashboard,
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/",
        },
      ],
    },
  ]

  // Handle navigation for mobile view
  const handleNavigation = (href: string) => {
    if (inSheet) {
      // Close the sheet by navigating to the href
      router.push(href)
    }
  }

  return (
    <div
      className={cn(
        "relative border-r min-h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        inSheet ? "w-full border-none" : "",
        className,
      )}
    >
      {!inSheet && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      )}

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2
            className={cn(
              "font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap",
              collapsed && !inSheet ? "text-center text-xs px-0 opacity-0" : "px-4 text-lg opacity-100",
            )}
          >
            Censo en Línea
          </h2>

          {collapsed && !inSheet && (
            <div className="flex justify-center py-2">
              <HomeIcon className="h-6 w-6" />
            </div>
          )}

          <div className="space-y-4 mt-6">
            {routes.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-2">
                {/* Sección principal */}
                {(!collapsed || inSheet) && (
                  <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.label}
                  </div>
                )}

                {collapsed && !inSheet && (
                  <div className="flex justify-center mb-2">
                    <section.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}

                {/* Items de la sección */}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      onClick={inSheet ? () => handleNavigation(item.href) : undefined}
                      className={cn(
                        "flex items-center rounded-lg transition-all hover:bg-muted",
                        pathname === item.href ? "bg-muted text-primary font-medium" : "text-muted-foreground",
                        collapsed && !inSheet ? "justify-center h-10 w-10 mx-auto p-0" : "px-3 py-2 gap-3",
                      )}
                      title={collapsed && !inSheet ? item.label : undefined}
                    >
                      <item.icon className={cn("flex-shrink-0", collapsed && !inSheet ? "h-5 w-5" : "h-4 w-4")} />

                      {(!collapsed || inSheet) && <span>{item.label}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
