
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Weather from "@/components/Weather";
import PrayerTimes from "@/components/PrayerTimes";
import SunTimes from "@/components/SunTimes";
import ContactForm from "@/components/ContactForm";
import ParticleBackground from "@/components/ParticleBackground";
import SoundEffects from "@/components/SoundEffects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Code, PenTool, Layout, Laptop } from "lucide-react";
import AdminLink from "@/components/AdminLink";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Track scroll progress for animations
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    // Set loaded after a short delay to trigger initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <ParticleBackground />
      <SoundEffects />
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-24 md:pt-32 pb-16 md:pb-24 section-container relative">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-secondary/30 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="flex-1 space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors animate-pulse">
              Grade 8 Student
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Hey, I'm <span className="text-primary relative">
                Taha Barakat
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 origin-left transition-transform duration-1000 ease-out" style={{ transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)' }}></span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Young designer and developer passionate about creating beautiful, functional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:bg-primary/90 hover:scale-105"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                Get in Touch
              </button>
              <button 
                className="inline-flex items-center justify-center px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium transition-all hover:bg-muted/80 hover:scale-105"
                onClick={() => {
                  const element = document.getElementById("services");
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                View Services
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className={`grid grid-cols-1 gap-4 max-w-md w-full transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Weather />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PrayerTimes />
                <SunTimes />
              </div>
            </div>
          </div>
        </div>
        <div className={`flex justify-center mt-16 md:mt-24 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors animate-bounce"
            style={{ animationDuration: '2s' }}
            onClick={() => {
              const element = document.getElementById("about");
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: "smooth",
                });
              }
            }}
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 bg-[url('/stars-pattern.svg')] opacity-5"></div>
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-heading font-bold tracking-tight mb-8 transition-all duration-700 ${scrollProgress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              About Me
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className={`transition-all duration-700 delay-100 ${scrollProgress > 0.15 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Hi there! I'm Taha Barakat, a passionate Grade 8 student with a love for design and technology. I'm on a journey to explore the digital world and create meaningful experiences through my work.
              </p>
              <p className={`transition-all duration-700 delay-200 ${scrollProgress > 0.2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Despite my young age, I'm dedicated to mastering various design tools and coding languages. My goal is to combine aesthetic appeal with practical functionality in everything I create.
              </p>
              <p className={`transition-all duration-700 delay-300 ${scrollProgress > 0.25 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                When I'm not designing or coding, you can find me reading about the latest tech trends, playing sports, or sketching new ideas in my notebook.
              </p>
            </div>

            <Separator className="my-10" />

            <h3 className={`text-xl font-heading font-bold tracking-tight mb-6 transition-all duration-700 ${scrollProgress > 0.3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              My Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["UI/UX Design", "Graphic Design", "HTML & CSS", "JavaScript", "Figma", "Adobe Photoshop", "Responsive Design", "Prototyping"].map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className={`justify-center py-2 text-sm transition-all duration-500 hover:scale-105 hover:bg-primary/10 hover:border-primary/30 ${scrollProgress > 0.35 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />
        
        <div className="section-container relative">
          <h2 className={`text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 transition-all duration-700 ${scrollProgress > 0.4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            My Services
          </h2>
          <p className={`text-muted-foreground mb-12 max-w-2xl transition-all duration-700 delay-100 ${scrollProgress > 0.45 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            I offer a range of design and development services to help you bring your ideas to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Layout className="h-6 w-6 text-primary" />, title: "UI/UX Design", description: "Creating intuitive and visually appealing interfaces for websites and apps that delight users." },
              { icon: <PenTool className="h-6 w-6 text-primary" />, title: "Graphic Design", description: "Designing logos, illustrations, and visual assets for your brand or project." },
              { icon: <Code className="h-6 w-6 text-primary" />, title: "Web Development", description: "Building responsive and functional websites using modern web technologies." },
              { icon: <Laptop className="h-6 w-6 text-primary" />, title: "Prototyping", description: "Creating interactive prototypes to test and validate your product ideas." }
            ].map((service, index) => (
              <Card 
                key={index}
                className={`overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-700 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 ${scrollProgress > 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 transition-all duration-700 ${scrollProgress > 0.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Get In Touch
            </h2>
            <p className={`text-muted-foreground mb-8 transition-all duration-700 delay-100 ${scrollProgress > 0.75 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Have a project in mind or want to work together? Fill out the form below and I'll get back to you soon.
            </p>
            <div className={`transition-all duration-700 delay-200 ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t relative">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Taha Barakat. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 inline-block">
                Twitter
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 inline-block">
                Instagram
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 inline-block">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
