
import React from "react";
import Navbar from "@/components/Navbar";
import Weather from "@/components/Weather";
import PrayerTimes from "@/components/PrayerTimes";
import SunTimes from "@/components/SunTimes";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Code, PenTool, Layout, Laptop } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-24 md:pt-32 pb-16 md:pb-24 section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 space-y-6 animate-fade-in">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Grade 8 Student</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Hey, I'm <span className="text-primary">Taha Barakat</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Young designer and developer passionate about creating beautiful, functional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90"
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
                className="inline-flex items-center justify-center px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium transition-colors hover:bg-muted/80"
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
            <div className="grid grid-cols-1 gap-4 max-w-md w-full">
              <Weather />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PrayerTimes />
                <SunTimes />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 md:mt-24 animate-fade-in animate-delay-3">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
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
      <section id="about" className="py-16 md:py-24 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-8">About Me</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Hi there! I'm Taha Barakat, a passionate Grade 8 student with a love for design and technology. I'm on a journey to explore the digital world and create meaningful experiences through my work.
              </p>
              <p>
                Despite my young age, I'm dedicated to mastering various design tools and coding languages. My goal is to combine aesthetic appeal with practical functionality in everything I create.
              </p>
              <p>
                When I'm not designing or coding, you can find me reading about the latest tech trends, playing sports, or sketching new ideas in my notebook.
              </p>
            </div>

            <Separator className="my-10" />

            <h3 className="text-xl font-heading font-bold tracking-tight mb-6">My Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["UI/UX Design", "Graphic Design", "HTML & CSS", "JavaScript", "Figma", "Adobe Photoshop", "Responsive Design", "Prototyping"].map((skill, index) => (
                <Badge key={index} variant="outline" className="justify-center py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">My Services</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            I offer a range of design and development services to help you bring your ideas to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Layout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground">
                  Creating intuitive and visually appealing interfaces for websites and apps that delight users.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
                <p className="text-muted-foreground">
                  Designing logos, illustrations, and visual assets for your brand or project.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                <p className="text-muted-foreground">
                  Building responsive and functional websites using modern web technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Laptop className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Prototyping</h3>
                <p className="text-muted-foreground">
                  Creating interactive prototypes to test and validate your product ideas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or want to work together? Fill out the form below and I'll get back to you soon.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Taha Barakat. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
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
