import React from "react";

// Orbiting Circles Component
const OrbitingCircles = ({ children, iconSize = 40, radius = 150, reverse = false, speed = 1 }) => {
  const icons = React.Children.toArray(children);
  const duration = 20 / speed;

  return (
    <>
      {icons.map((icon, index) => {
        const angle = (360 / icons.length) * index;
        const delay = (duration / icons.length) * index;

        return (
          <div
            key={index}
            className="absolute"
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              animation: `orbit ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
              animationDelay: `-${delay}s`,
              "--radius": `${radius}px`,
              "--angle": `${angle}deg`,
            }}
          >
            <div className="flex items-center justify-center w-full h-full bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-2">
              {icon}
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
          }
        }
      `}</style>
    </>
  );
};

const Icons = {
  google: () => (
    <svg width="24" height="24" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M533.5 278.4c0-17.4-1.4-34.2-4.1-50.5H272v95.6h146.9c-6.3 34.1-25 63-53.3 82.3v68h86.1c50.3-46.3 80.8-114.7 80.8-195.4z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c71.7 0 132-23.7 176-64.5l-86.1-68c-23.9 16-54.7 25.4-89.9 25.4-69 0-127.4-46.6-148.4-109.1H36.6v68.7C80.8 481.6 168 544.3 272 544.3z"
      />
      <path
        fill="#FBBC05"
        d="M123.6 313.9c-10.1-30.6-10.1-63.7 0-94.3V151H36.6c-35.8 69.8-35.8 152.1 0 221.9l87-59z"
      />
      <path
        fill="#EA4335"
        d="M272 107.3c37.7-0.6 73.9 13.7 101.4 39.7l76.2-76.2C404.8 24.1 344.4 0 272 0 168 0 80.8 62.7 36.6 151l87 59c21-62.5 79.4-109.1 148.4-102.7z"
      />
    </svg>
  ),
  microsoft: () => (
    <svg width="24" height="24" viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
      <path fill="#F25022" d="M0 0h213.3v213.3H0z" />
      <path fill="#7FBA00" d="M234.7 0H448v213.3H234.7z" />
      <path fill="#00A4EF" d="M0 234.7h213.3V448H0z" />
      <path fill="#FFB900" d="M234.7 234.7H448V448H234.7z" />
    </svg>
  ),
  facebook: () => (
    <svg width="24" height="24" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#1877F2"
        d="M279.14 288l14.22-92.66h-88.91V117.41c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.56 0 225.36 0C141.09 0 89.09 54.42 89.09 153.11V195.3H0v92.66h89.09V512h107.33V288z"
      />
    </svg>
  ),
  twitter: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#000000"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  ),
  spotify: () => (
    <svg width="28" height="28" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#1DB954"
        d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5z"
      />
    </svg>
  ),
  apple: () => (
    <svg width="24" height="24" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#000000"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </svg>
  ),
};

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] lg:h-[250px]">
      {/* Center Text */}
      <div className="z-10 flex flex-col items-center gap-3 mb-4 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Trusted by Industry Leaders
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Join thousands of companies worldwide
        </p>
      </div>

      {/* Outer Orbit */}
      <OrbitingCircles
        iconSize={window.innerWidth < 640 ? 36 : window.innerWidth < 1024 ? 48 : 56}
        radius={window.innerWidth < 640 ? 100 : window.innerWidth < 1024 ? 140 : 180}
        speed={1.5}
      >
        <Icons.google />
        <Icons.microsoft />
        <Icons.apple />
        <Icons.spotify />
      </OrbitingCircles>

      {/* Inner Orbit */}
      <OrbitingCircles
        iconSize={window.innerWidth < 640 ? 28 : window.innerWidth < 1024 ? 36 : 48}
        radius={window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 100 : 120}
        reverse
        speed={2}
      >
        <Icons.facebook />
        <Icons.twitter />
      </OrbitingCircles>
    </div>
  );
}
