"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

const blogs = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn best practices for structuring large React applications using TypeScript, including advanced patterns and performance optimization techniques.",
    image: "/react-typescript-code-editor.jpg",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Performance"],
    url: "#",
  },
  {
    id: 2,
    title: "Microservices Architecture with Node.js and Docker",
    excerpt:
      "A comprehensive guide to building and deploying microservices using Node.js, Docker containers, and orchestration tools.",
    image: "/docker-containers-microservices.jpg",
    date: "2023-12-20",
    readTime: "12 min read",
    tags: ["Node.js", "Docker", "Microservices"],
    url: "#",
  },
  {
    id: 3,
    title: "Advanced CSS Grid Techniques for Modern Layouts",
    excerpt:
      "Explore advanced CSS Grid features and techniques to create complex, responsive layouts with minimal code.",
    image: "/css-grid-layout-examples.jpg",
    date: "2023-11-28",
    readTime: "6 min read",
    tags: ["CSS", "Grid", "Responsive Design"],
    url: "#",
  },
  {
    id: 4,
    title: "State Management in React: Redux vs Zustand vs Context",
    excerpt: "Compare different state management solutions for React applications and learn when to use each approach.",
    image: "/react-state-management.png",
    date: "2023-10-10",
    readTime: "10 min read",
    tags: ["React", "State Management", "Redux"],
    url: "#",
  },
  {
    id: 5,
    title: "Optimizing Database Queries for Better Performance",
    excerpt:
      "Database optimization techniques including indexing strategies, query optimization, and performance monitoring.",
    image: "/database-performance-optimization.jpg",
    date: "2023-09-15",
    readTime: "9 min read",
    tags: ["Database", "Performance", "SQL"],
    url: "#",
  },
  {
    id: 6,
    title: "Building RESTful APIs with Express.js and MongoDB",
    excerpt:
      "Step-by-step guide to creating robust RESTful APIs using Express.js, MongoDB, and modern authentication patterns.",
    image: "/express-js-api-development.jpg",
    date: "2023-08-22",
    readTime: "11 min read",
    tags: ["Express.js", "MongoDB", "API"],
    url: "#",
  },
  {
    id: 7,
    title: "Introduction to WebAssembly for JavaScript Developers",
    excerpt:
      "Learn how WebAssembly can boost your web application performance and when to consider using it in your projects.",
    image: "/webassembly-performance-comparison.jpg",
    date: "2023-07-18",
    readTime: "7 min read",
    tags: ["WebAssembly", "Performance", "JavaScript"],
    url: "#",
  },
  {
    id: 8,
    title: "Testing Strategies for Modern Web Applications",
    excerpt:
      "Comprehensive testing approaches including unit testing, integration testing, and end-to-end testing with modern tools.",
    image: "/web-application-testing-tools.jpg",
    date: "2023-06-25",
    readTime: "13 min read",
    tags: ["Testing", "Jest", "Cypress"],
    url: "#",
  },
]

const ITEMS_PER_PAGE = 6

export function BlogsTab() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentBlogs = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Blog Posts</h2>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, blogs.length)} of {blogs.length} posts
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Article
              </Button>
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
