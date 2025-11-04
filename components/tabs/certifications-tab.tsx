"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, ChevronLeft, ChevronRight } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "Certified Azure Data Engineer Associate",
    issuer: "Microsoft",
    date: "2025",
    description: "Professional-level certification demonstrating expertise in Azure Data Factory.",
    image: "/azure-certification-badge.jpg",
    credentialUrl: "#",
    skills: ["Azure", "Cloud Architecture", "Security", "Scalability"],
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure AI Foundation Associate",
    issuer: "Oracle",
    date: "2025",
    description: "Certification validating skills in developing scalable applications on Oracle Cloud Infrastructure.",
    image: "/oracle-cloud-certification.png",
    credentialUrl: "#",
    skills: ["Oracle", "Machine Learning", "Cloud Functions", "Deep Learning"],
  },
  {
    id: 3,
    title: "Certified Github CI/CD Developer Associate",
    issuer: "Linkedin Learning",
    date: "2024",
    description: "Hands-on certification for Github repository management and collaboration.",
    image: "/github-certification-badge.png",
    credentialUrl: "#",
    skills: ["Github", "Version Control", "Collaboration", "CI/CD", "DevOps"],
  },
  {
    id: 4,
    title: "MongoDB Certified Developer",
    issuer: "MongoDB Inc.",
    date: "2022",
    description: "Certification demonstrating proficiency in MongoDB database development and administration.",
    image: "/mongodb-certification.png",
    credentialUrl: "#",
    skills: ["MongoDB", "NoSQL", "Database Design", "Aggregation"],
  },
  {
    id: 5,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2021",
    description: "Professional certification for React development skills and best practices.",
    image: "/react-certification-badge.jpg",
    credentialUrl: "#",
    skills: ["React", "JavaScript", "Frontend Development", "Component Design"],
  },
  {
    id: 6,
    title: "Scrum Master Certified",
    issuer: "Scrum Alliance",
    date: "2021",
    description: "Certification in Agile project management and Scrum methodology.",
    image: "/scrum-master-certification.png",
    credentialUrl: "#",
    skills: ["Agile", "Scrum", "Project Management", "Team Leadership"],
  },
]

const ITEMS_PER_PAGE = 6

export function CertificationsTab() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCertifications = certifications.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, certifications.length)} of{" "}
          {certifications.length} certifications
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentCertifications.map((cert) => (
          <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={cert.image || "/placeholder.svg"}
                alt={cert.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {cert.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{cert.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Credential
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
