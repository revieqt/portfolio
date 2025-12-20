import { useEffect, useState } from "react";
import heroImg from "@/assets/images/hero_img.png";

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <section className="h-screen w-full">
      <div className="relative h-screen overflow-hidden mx-auto max-w-7xl flex items-center justify-center">
  {/* Mobile View: Image as centered background + Content at bottom */}
        <div className="lg:hidden relative h-full flex flex-col justify-between items-center px-4">
          {/* Hero Image - Centered Background */}
          <div className="absolute inset-0 flex items-center justify-center z-0 mt-20">
            <img
              src={heroImg}
              alt="Hero"
              className="h-full w-auto object-cover"
            />
          </div>

          {/* Bottom Content for Mobile */}
          <div className="relative z-10 mt-auto mb-10 text-center px-4">
            <div
              className={`transition-all duration-1000 ease-out ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white/90 mb-4">
                Josh Opsima
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-white/75 mb-6">
                Aspiring Developer & Creative Thinker based in the Philippines.
              </p>

              {/* Navigation Links */}
              <nav className="flex justify-center gap-4 text-sm sm:text-base">
                <a href="#about" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">About</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#skills" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Skills</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#projects" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Projects</a>
                <span className="text-gray-900 dark:text-white/90">·</span>
                <a href="#contact" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Contact</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop View: Image on side + Content inline */}
        <div className="hidden lg:flex relative h-full">
          {/* Left: Hero Image - Fixed to left edge, constrained by section max-width */}
          <div className="absolute left-0 z-20 flex items-center justify-center h-full mt-20">
            <img
              src={heroImg}
              alt="Hero"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Right: Content with left offset to accommodate overlaying image */}
          <div className="ml-auto pr-8 z-10 ml-[280px] flex h-full items-center justify-end">
            <div
              className={`transition-all duration-1000 ease-out ${
                textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-9xl ml-20 pl-8 font-extrabold uppercase tracking-widest text-gray-900 dark:text-white/90 mb-6 text-right">
                Josh Opsima
              </h1>
              <div className="ml-20 pl-8">
                <p className="text-xl text-gray-700 dark:text-white/75 mb-8 leading-relaxed text-right">
                  Aspiring Developer & Creative Thinker based in the Philippines.
                </p>

                {/* Navigation Links */}
                <nav className="flex gap-6 text-lg justify-end">
                  <a href="#about" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">About</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#skills" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Skills</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#projects" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Projects</a>
                  <span className="text-gray-900 dark:text-white/90">·</span>
                  <a href="#contact" className="text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-colors duration-300">Contact</a>
                </nav>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  </section>
  );
}
