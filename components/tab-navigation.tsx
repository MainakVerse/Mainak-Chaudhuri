"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = ["Experiences", "Projects", "Certifications", "Blogs", "Stats"]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleTabSelect = (tab: string) => {
    onTabChange(tab)
    setIsDropdownOpen(false)
  }

  return (
    <div className="border-b border-border bg-card">
      {/* Mobile: Dropdown + Theme toggle */}
      <div className="md:hidden relative flex items-center justify-between px-4 py-4">
        {/* Left: Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center p-2 rounded-md hover:bg-accent/50 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Right: Hamburger / Dropdown toggle */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between flex-1 ml-4 text-left hover:bg-accent/50 transition-colors rounded-md px-3 py-2"
        >
          <span className="font-medium text-sm text-foreground">{activeTab}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 bg-card border-t border-border shadow-lg z-20">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  className={cn(
                    "w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent/50",
                    "min-h-[44px] flex items-center border-l-2",
                    activeTab === tab
                      ? "border-l-primary text-primary bg-accent/30"
                      : "border-l-transparent text-muted-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Desktop: Horizontal tabs + Theme toggle */}
      <nav className="hidden md:flex md:items-center md:space-x-8 px-8 py-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "pb-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
            )}
          >
            {tab}
          </button>
        ))}

        {/* Theme Toggle (Desktop) */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-auto flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/50 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <span className="hidden sm:inline text-sm font-medium">Toggle Theme</span>
        </button>
      </nav>
    </div>
  )
}
