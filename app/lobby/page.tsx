"use client"

import { useState } from "react"
import { IdCard } from "@/components/id-card"
import { TabNavigation } from "@/components/tab-navigation"
import { ExperiencesTab } from "@/components/tabs/experiences-tab"
import { ProjectsTab } from "@/components/tabs/projects-tab"
import { CertificationsTab } from "@/components/tabs/certifications-tab"
import { BlogsTab } from "@/components/tabs/blogs-tab"
import { StatsTab } from "@/components/tabs/stats-tab"
import { Menu, X } from "lucide-react"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("Experiences")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case "Experiences":
        return <ExperiencesTab />
      case "Projects":
        return <ProjectsTab />
      case "Certifications":
        return <CertificationsTab />
      case "Blogs":
        return <BlogsTab />
      case "Stats":
        return <StatsTab />
      default:
        return <ExperiencesTab />
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-bold">Mainak Chaudhuri</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:grid lg:grid-cols-12 lg:gap-0">
        {/* ID Card Sidebar */}
        <div
          className={`
            fixed lg:sticky lg:col-span-3 
            top-0 left-0 h-screen w-80 lg:w-auto
            z-50 lg:z-auto
            transform lg:transform-none transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <IdCard />
        </div>

        {/* Main Content */}
        <div className="w-full lg:col-span-9 flex flex-col">
          {/* Tab Navigation - with mobile spacing */}
          <div className="mt-16 lg:mt-0">
            <TabNavigation 
              activeTab={activeTab} 
              onTabChange={(tab) => {
                setActiveTab(tab)
                setIsSidebarOpen(false) // Close sidebar on mobile when tab changes
              }} 
            />
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Mobile bottom padding to account for potential mobile UI */}
      <div className="h-20 lg:h-0" />
    </div>
  )
}