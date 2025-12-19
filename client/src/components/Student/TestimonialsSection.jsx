"use client";
import React from "react";
import { Star, StarHalf, Quote } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

// E-Learning testimonial data
export const testimonialData = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer @ Microsoft",
    rating: 5,
    feedback:
      "This platform transformed my career. The courses are comprehensive, well-structured, and taught by industry experts. I gained practical skills that I use daily in my job.",
    avatar: "SM",
  },
  {
    name: "Rajesh Kumar",
    role: "Data Analyst @ IBM",
    rating: 5,
    feedback:
      "The best investment I've made in my professional development. The interactive lessons and real-world projects gave me confidence to transition into data science.",
    avatar: "RK",
  },
  {
    name: "Emily Chen",
    role: "Full Stack Developer @ Shopify",
    rating: 4.5,
    feedback:
      "Outstanding learning experience! The curriculum is up-to-date with industry standards, and the community support is incredible. Highly recommended for anyone serious about tech.",
    avatar: "EC",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager @ Adobe",
    rating: 5,
    feedback:
      "I've tried several e-learning platforms, but this one stands out. The quality of instruction, project-based learning, and career guidance are exceptional.",
    avatar: "MJ",
  },
  {
    name: "Aisha Patel",
    role: "UX Designer @ Figma",
    rating: 4.5,
    feedback:
      "The design courses here are phenomenal. I went from beginner to landing my dream job in just 8 months. The instructors are responsive and truly care about student success.",
    avatar: "AP",
  },
  {
    name: "David Lee",
    role: "Cloud Architect @ AWS",
    rating: 5,
    feedback:
      "Flexible, comprehensive, and practical. The cloud computing track prepared me perfectly for my AWS certifications and gave me hands-on experience with real infrastructure.",
    avatar: "DL",
  },
];

// Rating display component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <Star key={`off-${stars.length}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
};

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-neutral-950 dark:via-blue-950/20 dark:to-neutral-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section (no top margin) */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners who have transformed their careers through our comprehensive courses and expert instruction
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="flex flex-col items-center justify-center mt-10">
          <InfiniteMovingCards
            items={testimonialData.map((testimonial) => ({
              quote: (
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-blue-500/20 dark:text-blue-400/20" />
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {testimonial.feedback}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <StarRating rating={testimonial.rating} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }))}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
