import React from "react";
import { GraduationCap, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-neutral-950 dark:via-blue-950/10 dark:to-neutral-950">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Icon and Heading */}
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
          <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          Take the Next Step in Your Learning Journey
        </h2>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Join thousands of learners who've mastered new skills and advanced their careers through our expert-led online courses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="/courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-sm"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
