export default function About() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg leading-relaxed mb-6">
              I'm a passionate developer with 5+ years of experience building web applications that users love.
              I specialize in creating responsive, performant interfaces using modern JavaScript frameworks.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or sharing knowledge with the developer community.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Projects Completed</span>
                <span className="text-3xl font-bold text-indigo-600">25+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Years Experience</span>
                <span className="text-3xl font-bold text-indigo-600">5+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Happy Clients</span>
                <span className="text-3xl font-bold text-indigo-600">40+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
