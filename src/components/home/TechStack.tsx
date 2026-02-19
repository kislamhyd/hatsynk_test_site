import SectionHeading from '@/components/ui/SectionHeading';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'JavaFX', category: 'Frontend' },
  { name: 'XML', category: 'Frontend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'React Native', category: 'Mobile' },
];

export function TechStack() {
  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Technology Stack"
          title={
            <>
              Powered by <span className="gradient-text">Modern Technologies</span>
            </>
          }
          description="We leverage the latest technologies to build robust, scalable, and maintainable solutions."
        />

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`px-6 py-3 rounded-full border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default animate-fade-in-up delay-${Math.min((index % 8 + 1) * 100, 800)}`}
            >
              <span className="font-medium text-sm md:text-base">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
