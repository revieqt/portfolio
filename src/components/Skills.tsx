import { CodeBracketIcon } from "@heroicons/react/24/solid";

export default function Skills() {
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "CI/CD", "ESLint"] },
    { category: "Soft Skills", items: ["Problem Solving", "Team Leadership", "Communication", "Project Management", "Agile/Scrum"] },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{skillGroup.category}</h3>
              <div className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <CodeBracketIcon className="w-4 h-4 text-purple-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
