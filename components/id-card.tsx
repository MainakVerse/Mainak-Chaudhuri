import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Phone, Zap, Activity } from "lucide-react"
import { useState, useEffect } from "react"


export function IdCard() {
  const [currentRole, setCurrentRole] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const roles = ["DATA ENGINEER", "AI ENGINEER", "FULL STACK DEVELOPER", "ML EXPERT"]
  
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
    <Card className="h-full bg-black text-cyan-50 border-2 border-cyan-500/50 rounded-none p-8 flex flex-col overflow-hidden relative shadow-2xl shadow-cyan-500/20">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Holographic scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-30" 
             style={{ top: '20%', animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse opacity-20" 
             style={{ top: '60%', animationDelay: '1.5s', animationDuration: '4s' }}></div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>
      
      {/* Profile Image */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 animate-pulse"></div>
          
          <Avatar className="w-32 h-32 border-2 border-cyan-400 transition-all duration-500 group-hover:border-emerald-400 shadow-lg shadow-cyan-500/50 group-hover:shadow-emerald-500/50">
            <AvatarImage src="/professional-headshot.png" alt="Profile" className="filter brightness-110 contrast-110" />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-gray-900 to-black text-cyan-400 font-mono font-bold border border-cyan-400/50">MC</AvatarFallback>
          </Avatar>
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center mb-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400 tracking-wider">HELLO, I'M</span>
        </div>
        
        <h1 className="text-3xl font-mono font-black text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text mb-3 tracking-wider animate-pulse">
          MAINAK CHAUDHURI
        </h1>
        
        <div className="relative">
          <div className="flex items-center justify-center mb-2">
            <span className="text-cyan-300 font-mono font-bold text-lg tracking-widest text-shadow">
              &gt; {currentRole}
            </span>
            <span className="text-cyan-400 font-mono font-bold text-lg ml-1 animate-pulse">|</span>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-3"></div>
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            [BUILDING_DIGITAL_EXPERIENCES]
          </p>
        </div>

        {/* Social Icons below BUILDING_DIGITAL_EXPERIENCES */}
        <div className="flex justify-center gap-6 mt-4">
          {[Linkedin, Github].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="p-3 bg-gradient-to-br from-gray-900 to-black rounded border-2 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group shadow-lg hover:shadow-cyan-500/30"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="mb-6 relative z-10">
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400">HIRE_STATUS:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400"></div>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-8 relative z-10">
        {[{ icon: Mail, text: "mainakchaudhuri671@gmail.com", prefix: "MAIL" },
          { icon: Phone, text: "+91 898 17 97415", prefix: "PHONE" },
          { icon: MapPin, text: "Kolkata, IND", prefix: "HOME" }].map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 text-xs text-gray-300 group hover:text-cyan-300 transition-all duration-300 hover:translate-x-2 bg-gray-900/20 p-3 rounded border border-gray-700/50 hover:border-cyan-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors duration-300">
                <item.icon className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="text-cyan-400 font-mono font-bold tracking-wider">{item.prefix}:</span>
            </div>
            <span className="font-mono tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xs font-mono font-bold text-cyan-400 mb-4 tracking-widest flex items-center gap-2">
          <Zap className="w-3 h-3" />
          MAINAK_VERSE
        </h3>
        <div className="flex flex-wrap gap-2">
          {["REACT", "TYPESCRIPT", "NODE.JS", "PYTHON", "AWS", "DOCKER"].map((skill, index) => (
            <Badge 
              key={skill}
              variant="secondary" 
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-cyan-300 border border-cyan-500/30 hover:border-emerald-400/50 hover:text-emerald-300 transition-all duration-300 hover:scale-105 font-mono text-xs tracking-wider cursor-default shadow-sm hover:shadow-lg hover:shadow-emerald-500/20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 rounded-lg border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="relative flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"></div>
          </div>
          <span className="text-sm text-emerald-300 font-mono font-bold tracking-widest group-hover:text-emerald-200 transition-colors duration-300">
            AVAILABLE_FOR_HIRE
          </span>
        </div>
      </div>

      {/* ID Number */}
      <div className="absolute top-2 right-8 text-xs font-mono text-gray-500 tracking-widest">
        ID: MC-2077-XK9
      </div>
    </Card>
  )
}
