import { useEffect, useState } from "react";
import heroImgLight from "@/assets/images/hero_img_light.png";
import heroImgDark from "@/assets/images/hero_img_dark.png";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden px-4">
      {/* Comic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Name + Buttons Wrapper */}
<div
  className={`absolute inset-0 z-10 mt-20 flex flex-col items-center transition-all duration-1000 ease-out ${
    textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>
  {/* Name container */}
  <div className="relative inline-block">
    <h1 className="text-[10vw] sm:text-[10vw] lg:text-[10vw] font-extrabold uppercase tracking-widest text-gray-900 dark:text-white/90 select-none pointer-events-none">
      Josh Opsima
    </h1>

    {/* Social Icons — positioned to the right of the name */}
    <div className="absolute -bottom-5 right-0 flex">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full text-gray-900 dark:text-white/90 hover:text-pink-500 dark:hover:text-pink-500 transition-all duration-300 hover:scale-110"
        style={{ width: "6vw", height: "6vw", fontSize: "2.5vw", maxWidth: "120px", maxHeight: "120px",minWidth: "50px", minHeight: "50px" }}
      >
        <FaInstagram />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full text-gray-900 dark:text-white/90 hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:scale-110"
        style={{ width: "6vw", height: "6vw", fontSize: "2.5vw", maxWidth: "120px", maxHeight: "120px" }}
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full text-gray-900 dark:text-white/90 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110"
        style={{ width: "6vw", height: "6vw", fontSize: "2.5vw", maxWidth: "120px", maxHeight: "120px" }}
      >
        <FaGithub />
      </a>
    </div>
  </div>
</div>


      {/* Animated Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-glow-slow" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-glower" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-glow-fast" />
      </div>

      {/* Hero Image — BOTTOM CENTER */}
      <img
        src={heroImgLight}
        alt="Cyberpunk Hero"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[100vh] lg:h-[100vh] w-auto z-10 rounded-full object-cover dark:hidden [mask-image:radial-gradient(circle,white_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle,white_60%,transparent_100%)]"
      />
      <img
        src={heroImgDark}
        alt="Cyberpunk Hero"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[100vh] lg:h-[100vh] w-auto z-10 rounded-full object-cover hidden dark:block [mask-image:radial-gradient(circle,white_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle,white_60%,transparent_100%)]"
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-indigo-50 via-indigo-50/50 to-transparent dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent z-20 pointer-events-none" />

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes glow-slow {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            50% { transform: translate(20px, -10px) scale(1.05); opacity: 0.9; }
          }
          @keyframes glow-slower {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(-15px, 15px) scale(1.1); opacity: 0.8; }
          }
          @keyframes glow-fast {
            0%, 100% { transform: translate(0,0) scale(1); opacity:0.4; }
            50% { transform: translate(10px, -20px) scale(1.05); opacity:0.7; }
          }
          @keyframes orb1 {
            0%, 100% { transform: translate(0,0); }
            50% { transform: translate(15px, -20px); }
          }
          @keyframes orb2 {
            0%, 100% { transform: translate(0,0); }
            50% { transform: translate(-20px, 10px); }
          }
          .animate-glow-slow { animation: glow-slow 8s ease-in-out infinite; }
          .animate-glower { animation: glow-slower 12s ease-in-out infinite; }
          .animate-glow-fast { animation: glow-fast 6s ease-in-out infinite; }
          .animate-orb1 { animation: orb1 10s ease-in-out infinite alternate; }
          .animate-orb2 { animation: orb2 12s ease-in-out infinite alternate; }
        `}
      </style>
    </section>
  );
}
