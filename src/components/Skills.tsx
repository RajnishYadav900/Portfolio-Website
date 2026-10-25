import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Binary,
  Braces,
  Code2,
  Coffee,
  Database,
  Eraser,
  FileSpreadsheet,
  GitBranch,
  GitPullRequest,
  Globe,
  Layers,
  MonitorSmartphone,
  Package,
  Palette,
  PieChart,
  Sparkles,
  Terminal,
  TrendingUp,
  Wrench,
} from 'lucide-react';

type Skill = {
  name: string;
  description: string;
  icon: LucideIcon; // fallback icon
  logo?: string;
  invertInDark?: boolean;
};

type Category = {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: Skill[];
};

const dev = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

const categories: Category[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code2,
    skills: [
      { name: 'HTML5', description: 'Semantic page structure', icon: Globe, logo: dev('html5/html5-original') },
      { name: 'CSS3', description: 'Modern styling & layouts', icon: Palette, logo: dev('css3/css3-original') },
      { name: 'JavaScript', description: 'Dynamic web behavior', icon: Braces, logo: dev('javascript/javascript-original') },
      { name: 'React.js', description: 'Component-based UIs', icon: Layers, logo: dev('react/react-original') },
      { name: 'Tailwind CSS', description: 'Utility-first styling', icon: Sparkles, logo: dev('tailwindcss/tailwindcss-original') },
      { name: 'Responsive Design', description: 'Responsive Web Design', icon: MonitorSmartphone },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: Terminal,
    skills: [
      { name: 'Python', description: 'Scripting & problem solving', icon: Terminal, logo: dev('python/python-original') },
      { name: 'C', description: 'Programming fundamentals', icon: Code2, logo: dev('c/c-original') },
      { name: 'Java', description: 'Object-oriented programming', icon: Coffee, logo: dev('java/java-original') },
      { name: 'DSA', description: 'Data Structures & Algorithms', icon: Binary },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    icon: BarChart3,
    skills: [
      { name: 'Excel', description: 'Microsoft Excel: spreadsheets & formulas', icon: FileSpreadsheet },
      { name: 'SQL', description: 'Querying databases', icon: Database },
      { name: 'Power BI', description: 'Interactive dashboards', icon: BarChart3 },
      { name: 'Data Cleaning', description: 'Preparing reliable data', icon: Eraser },
      { name: 'Data Analysis', description: 'Finding patterns & insights', icon: TrendingUp },
      { name: 'Data Visualization', description: 'Charts that tell stories', icon: PieChart },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    icon: Wrench,
    skills: [
      { name: 'Git', description: 'Version control', icon: GitBranch, logo: dev('git/git-original') },
      { name: 'GitHub', description: 'Code hosting & collaboration', icon: GitPullRequest, logo: dev('github/github-original'), invertInDark: true },
      { name: 'VS Code', description: 'Visual Studio Code editor', icon: Code2, logo: dev('vscode/vscode-original') },
      { name: 'npm', description: 'Package management', icon: Package, logo: dev('npm/npm-original-wordmark') },
    ],
  },
];

/* Fade-in when scrolled into view */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function SkillCard({ skill }: { skill: Skill }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const Icon = skill.icon;
  const showLogo = skill.logo && !logoFailed;

  return (
    <div
      title={skill.description}
      className="group flex h-full min-h-[52px] items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-2.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8431f]/60 hover:shadow-md hover:shadow-[#e8431f]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 [[data-theme=dark]_&]:border-white/10 [[data-theme=dark]_&]:bg-white/5 [[data-theme=dark]_&]:hover:border-[#e8431f]/70"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 [[data-theme=dark]_&]:bg-white/10">
        {showLogo ? (
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            width={20}
            height={20}
            loading="lazy"
            onError={() => setLogoFailed(true)}
            className={`h-5 w-5 object-contain ${
              skill.invertInDark ? '[[data-theme=dark]_&]:invert' : ''
            }`}
          />
        ) : (
          <Icon className="h-4 w-4 text-[#e8431f]" aria-label={skill.name} />
        )}
      </span>

      <span className="min-w-0 break-words text-xs font-semibold leading-tight text-zinc-800 sm:text-sm [[data-theme=dark]_&]:text-zinc-100">
        {skill.name}
      </span>
    </div>
  );
}

function CategoryPanel({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const HeadingIcon = category.icon;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 transition-all duration-500 motion-reduce:transition-none [[data-theme=dark]_&]:border-white/10 [[data-theme=dark]_&]:bg-white/[0.03] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8431f] text-white">
          <HeadingIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-base font-bold text-zinc-900 sm:text-lg [[data-theme=dark]_&]:text-white">
          {category.title}
        </h3>
      </div>

      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <SkillCard skill={skill} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2
            id="skills-heading"
            className="text-3xl font-extrabold text-[#e8431f] sm:text-4xl"
          >
            Skills &amp; Technologies
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#e8431f]" />
          <p className="mt-4 text-sm text-zinc-600 sm:text-base [[data-theme=dark]_&]:text-zinc-400">
            Technologies I use to build modern interfaces, solve programming
            problems, and transform data into meaningful insights.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {categories.map((category, index) => (
            <CategoryPanel key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}