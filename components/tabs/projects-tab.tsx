"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "/ecommerce-dashboard.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team collaboration features.",
    image: "/task-management-app.png",
    technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location-based forecasts and historical data visualization.",
    image: "/weather-dashboard.png",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description: "Analytics platform for social media metrics with automated reporting and insights.",
    image: "/social-media-analytics-dashboard.png",
    technologies: ["Next.js", "Python", "FastAPI", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Recipe Sharing Platform",
    description: "Community-driven recipe sharing platform with user ratings and meal planning features.",
    image: "/recipe-sharing-app-interface.jpg",
    technologies: ["React", "Firebase", "Algolia", "Material-UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Personal fitness tracking application with workout plans and progress visualization.",
    image: "/fitness-tracker-app-dashboard.png",
    technologies: ["React Native", "Node.js", "MongoDB", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 7,
    title: "Learning Management System",
    description: "Educational platform with course management, progress tracking, and interactive assessments.",
    image: "/lms-interface.png",
    technologies: ["Angular", "Spring Boot", "MySQL", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 8,
    title: "Real Estate Portal",
    description: "Property listing platform with advanced search, virtual tours, and mortgage calculator.",
    image: "/real-estate-website-interface.png",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

const ITEMS_PER_PAGE = 6

export function ProjectsTab() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, projects.length)} of {projects.length}{" "}
          projects
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
