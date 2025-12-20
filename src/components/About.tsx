export default function About() {
  return (
    <section className="relative py-24 px-4 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle animated glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-glow-slow" />
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glower" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white/90 mb-8 text-center">
          About
        </h2>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed">
              I'm a passionate full-stack developer crafting digital experiences that are both beautiful and functional.
            </p>
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed">
              With expertise in modern web technologies, I build responsive applications that solve real problems and delight users.
            </p>
            <p className="text-lg text-gray-700 dark:text-white/75 leading-relaxed">
              When I'm not coding, I'm exploring new technologies and contributing to the developer community.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-6 backdrop-blur-sm hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300">
              <p className="text-sm text-gray-600 dark:text-white/60 mb-2 uppercase tracking-widest">Projects</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white/90">25+</p>
            </div>
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-6 backdrop-blur-sm hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300">
              <p className="text-sm text-gray-600 dark:text-white/60 mb-2 uppercase tracking-widest">Experience</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white/90">5+ Yrs</p>
            </div>
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-6 backdrop-blur-sm hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300">
              <p className="text-sm text-gray-600 dark:text-white/60 mb-2 uppercase tracking-widest">Clients</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white/90">40+</p>
            </div>
            <div className="border border-gray-200 dark:border-white/10 rounded-lg p-6 backdrop-blur-sm hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300">
              <p className="text-sm text-gray-600 dark:text-white/60 mb-2 uppercase tracking-widest">Expertise</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white/90">Full Stack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
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
          .animate-glow-slow { animation: glow-slow 8s ease-in-out infinite; }
          .animate-glower { animation: glow-slower 12s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}
