import React from "react";
import { GridBackground } from "../../components/ui/grid-background";
import SearchBar from "./SearchBar";
import { Sparkles, TrendingUp, Users, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Enhanced Decorative Blobs with smoother animations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")" }}></div>

      <GridBackground>
        <div className="relative flex flex-col items-center text-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 min-h-[70vh] py-20">

          {/* Glassmorphic Badge with animation */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-blue-200/50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Transform Your Future with Expert-Led Courses
          </div>

          {/* Enhanced Title with text glow and tighter spacing */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent max-w-5xl mb-2 animate-fade-in-up" style={{ textShadow: "0 0 40px rgba(99, 102, 241, 0.1)" }}>
            Learn. Grow. Excel.
          </h1>

          {/* Enhanced Subtitle with better readability */}
          <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-medium animate-fade-in-up animation-delay-200">
            Explore courses crafted for your success — from beginner to expert, all in one place.
          </p>

          {/* Search with animation */}
          <div className="mt-12 w-full flex justify-center animate-fade-in-up animation-delay-400">
            <SearchBar />
          </div>


        </div>
      </GridBackground>
    </section>
  );
}
