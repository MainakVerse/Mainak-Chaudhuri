import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Data Engineer",
    company: "Predicta Digital",
    logo: "/logos/predicta.png",
    location: "Kolkata, IND",
    period: "Mar, 2025 - Present",
    description: [
      "Designed and implemented ETL pipelines in Azure Data Factory, reducing data processing time by 40%.",
      "Developed scalable dashboards in Power BI and Databricks, increasing reporting efficiency by 35%.",
      "Mentored junior developers on Python, SQL, and cloud best practices, improving team code quality by 25%."
    ],
    technologies: ["Python", "Azure Data Factory", "Azure Fabric", "Power Apps", "Excel", "SQL", "Databricks", "Power BI", "GitHub"],
  },
  {
    id: 2,
    title: "AI Developer",
    company: "Happy People AI LLP",
    logo: "/logos/happy-people-ai.jpg",
    location: "Remote",
    period: "Aug, 2024 - Feb, 2025",
    description: [
      "Built AI-powered client applications using LLMs and Next.js, increasing user engagement by 45%.",
      "Implemented CI/CD pipelines with GitHub and Azure, reducing deployment time by 35%.",
      "Optimized AI model performance and data workflows, improving ROI for client projects by 40%."
    ],
    technologies: ["LLM", "Python","Azure", "Power App", "Next.js", "Redis", "Supabase", "GitHub"],
  },
  {
    id: 3,
    title: "DC Analyst",
    company: "Deloitte",
    logo: "/logos/deloitte.png",
    location: "Kolkata, IND",
    period: "Jan, 2024 - July, 2024",
    description: [
      "Developed Salesforce LWC and Apex applications, enhancing data entry efficiency by 30%.",
      "Created interactive Tableau dashboards, reducing report generation time by 40% and supporting business decisions.",
      "Collaborated with UX teams to deliver pixel-perfect web interfaces, improving user satisfaction by 25%."
    ],
    technologies: ["Salesforce", "LWC", "Apex", "Tableau", "Excel", "GitHub", "Python"],
  },
]

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science Engineering",
    school: "SRM Institute of Science and Technology, Chennai",
    logo: "/logos/srm.png", 
    location: "Chennai, IND",
    period: "2019 - 2023",
    description: [
      "Graduated Magna Cum Laude with a strong academic record. (8.5 CGPA)",
      "Focused on software engineering, algorithms, and data structures.",
      "Completed multiple projects using Python, Next.js, Java and SQL."
    ],
  },
]


export function ExperiencesTab() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Experiences Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Work Experience</h2>
        <div className="space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline line - hidden on mobile, visible on md+ */}
              {index !== experiences.length - 1 && (
                <div className="hidden md:block absolute left-6 top-16 w-0.5 h-full bg-border"></div>
              )}

              {/* Timeline dot - hidden on mobile, visible on md+ */}
              <div className="hidden md:block absolute left-4 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

             {/* Content - no left margin on mobile */}
<Card className="md:ml-12 hover:shadow-md transition-shadow">
  <CardHeader className="pb-3">
    <div className="space-y-2">
      <CardTitle className="text-base md:text-lg leading-tight">{exp.title}</CardTitle>

      {/* Mobile: Stack info vertically, Desktop: Horizontal */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-muted-foreground">

        {/* Company with logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={exp.logo} // make sure to add a logo field in your data
              alt={`${exp.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="truncate">{exp.company}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">{exp.location}</span>
        </div>

        {/* Period */}
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">{exp.period}</span>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent className="pt-0">
    {/* Bullet points */}
    <ul className="list-disc list-inside text-muted-foreground mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
      {exp.description.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>

    {/* Technologies */}
    <div className="flex flex-wrap gap-1.5 md:gap-2">
      {exp.technologies.map((tech) => (
        <Badge
          key={tech}
          variant="secondary"
          className="text-xs px-2 py-1 h-auto"
        >
          {tech}
        </Badge>
      ))}
    </div>
  </CardContent>
</Card>


            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Education</h2>
  <div className="space-y-4 md:space-y-6">
    {education.map((edu, index) => (
      <div key={edu.id} className="relative">

        {/* Timeline line - hidden on mobile, visible on md+ */}
        {index !== education.length - 1 && (
          <div className="hidden md:block absolute left-6 top-16 w-0.5 h-full bg-border"></div>
        )}

        {/* Timeline dot - hidden on mobile, visible on md+ */}
        <div className="hidden md:block absolute left-4 top-6 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>

        {/* Content - no left margin on mobile */}
        <Card className="md:ml-12 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <CardTitle className="text-base md:text-lg leading-tight">{edu.degree}</CardTitle>

              {/* Mobile: Stack info vertically, Desktop: Horizontal */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-muted-foreground">

                {/* School with logo */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={edu.logo} // Make sure you add `logo` field in your data
                      alt={`${edu.school} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="truncate">{edu.school}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{edu.location}</span>
                </div>

                {/* Period */}
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{edu.period}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Bullet points */}
            <ul className="list-disc list-inside text-muted-foreground text-sm md:text-base leading-relaxed">
              {edu.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}