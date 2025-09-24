import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Phone, Zap, Activity, Youtube } from "lucide-react"
import { useState, useEffect } from "react"

export function IdCard() {
  const [currentRole, setCurrentRole] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = ["DATA ENGINEER", "AI ENGINEER", "FULL STACK DEVELOPER", "MACHINE LEARNING EXPERT"]

  useEffect(() => {
    const currentText = roles[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCurrentRole(currentText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setCurrentRole(currentText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [charIndex, currentIndex, isDeleting, roles])

  return (
    <Card className="h-full bg-black text-cyan-50 border-2 border-cyan-500/50 rounded-none 
      p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden relative shadow-2xl shadow-cyan-500/20">

      {/* Profile Image */}
      <div className="flex justify-center mb-6 md:mb-8 relative z-10">
        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-cyan-400">
          <AvatarImage src="/professional-headshot.png" alt="Profile" />
          <AvatarFallback className="text-lg sm:text-xl md:text-2xl bg-gradient-to-br 
            from-gray-900 to-black text-cyan-400 font-mono font-bold border border-cyan-400/50">
            MC
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name + Title */}
      <div className="text-center mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono text-emerald-400 tracking-wider">
            HELLO, I'M
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-transparent 
          bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text mb-2 sm:mb-3 
          tracking-wide sm:tracking-wider animate-pulse">
          MAINAK CHAUDHURI
        </h1>

        <div className="relative">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-cyan-300 font-mono font-bold text-sm sm:text-base tracking-widest">
              &gt; {currentRole}
            </span>
            <span className="text-cyan-400 font-mono font-bold text-sm sm:text-base ml-1 animate-pulse">
              |
            </span>
          </div>
          <br></br>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-3">
          {[
            { Icon: Linkedin, href: "https://linkedin.com/in/mainak-chaudhuri-127898176/" },
            { Icon: Github, href: "https://github.com/MainakVerse" },
            { Icon: Youtube, href: "https://youtube.com/@mainakverse" },
          ].map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-gradient-to-br from-gray-900 to-black rounded 
                border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 group shadow-md hover:shadow-cyan-500/30"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* Work Status Box */}
      <div className="mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2 p-2 sm:p-3 rounded border border-emerald-500/40 
          bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 shadow-sm">
          <div className="relative flex items-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse shadow-md shadow-emerald-400/70"></div>
            <div className="absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400/30 rounded-full animate-ping"></div>
          </div>
          <span className="text-[10px] sm:text-xs md:text-sm text-emerald-300 font-mono tracking-wider">
            Work Status: Active
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 sm:space-y-3 mb-6 md:mb-8 relative z-10">
        {[
          { icon: Mail, text: "mainakchaudhuri671@gmail.com", prefix: "MAIL" },
          { icon: Phone, text: "+91 898 17 97415", prefix: "PHONE" },
          { icon: MapPin, text: "Kolkata, IND", prefix: "HOME" }
        ].map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-300 
              group hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2 
              bg-gray-900/20 p-2 sm:p-3 rounded border border-gray-700/50 hover:border-cyan-500/50"
          >
            <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="text-cyan-400 font-mono font-bold tracking-wider">{item.prefix}:</span>
            <span className="font-mono tracking-wide truncate">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6 md:mb-8 relative z-10">
        <h3 className="text-[10px] text-center sm:text-xs font-mono font-bold text-cyan-400 mb-2 sm:mb-4 tracking-widest">
          &copy; MAINAK_VERSE * {new Date().getFullYear()}
        </h3>
        
      </div>
    </Card>
  )
}
