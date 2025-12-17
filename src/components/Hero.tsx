export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-3xl">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Josh Opsima
        </h1>
        <p className="text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
          Full Stack Developer
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
          Crafting beautiful, scalable web applications with React, TypeScript, and modern technologies.
          Passionate about clean code and exceptional user experiences.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
