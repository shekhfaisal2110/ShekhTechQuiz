

import {
  SiMongodb,
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiNextdotjs,
  SiRedux,
  SiFirebase,
  SiTypescript,
  SiGit,
  SiGithub,
  SiDocker,
  SiJira,
  SiLinux,
  SiGnubash,
  SiGitlab,
  SiGraphql,
  SiSocketdotio,
  SiRedis,
  SiPrisma,
  SiNeo4J,
  SiNestjs,
  SiPostman,
  SiFramer,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { FaTerminal, FaProjectDiagram } from "react-icons/fa";

// ---------------- Tech Icons Component ----------------
const TechIcon = ({ tech }) => {
  const icons = {
    // Version Control & Tools
    git: <SiGit className="text-orange-600 w-8 h-8" />,
    github: <SiGithub className="text-gray-800 w-8 h-8" />,
    gitlab: <SiGitlab className="text-orange-500 w-8 h-8" />,
    docker: <SiDocker className="text-blue-500 w-8 h-8" />,
    jira: <SiJira className="text-blue-400 w-8 h-8" />,
    linux: <SiLinux className="text-black w-8 h-8" />,
    bash: <SiGnubash className="text-green-600 w-8 h-8" />,
    terminal: <FaTerminal className="text-gray-700 w-8 h-8" />,
    project: <FaProjectDiagram className="text-purple-500 w-8 h-8" />,

    // Frontend
    html: <SiHtml5 className="text-orange-500 w-8 h-8" />,
    css: <SiCss3 className="text-blue-600 w-8 h-8" />,
    javascript: <SiJavascript className="text-yellow-400 w-8 h-8" />,
    typescript: <SiTypescript className="text-blue-500 w-8 h-8" />,
    react: <SiReact className="text-cyan-400 w-8 h-8" />,
    nextjs: <SiNextdotjs className="text-black w-8 h-8" />,
    tailwind: <SiTailwindcss className="text-sky-400 w-8 h-8" />,
    bootstrap: <SiBootstrap className="text-purple-600 w-8 h-8" />,
    redux: <SiRedux className="text-purple-500 w-8 h-8" />,
    framer: <SiFramer className="text-pink-500 w-8 h-8" />,

    // Backend
    nodejs: <SiNodedotjs className="text-green-700 w-8 h-8" />,
    express: <SiExpress className="text-gray-700 w-8 h-8" />,
    graphql: <SiGraphql className="text-pink-500 w-8 h-8" />,
    nestjs: <SiNestjs className="text-red-500 w-8 h-8" />,
    socketio: <SiSocketdotio className="text-gray-800 w-8 h-8" />,
    aws: <FaAws className="text-yellow-500 w-8 h-8" />,

    // Databases
    mysql: <SiMysql className="text-blue-500 w-8 h-8" />,
    postgresql: <SiPostgresql className="text-blue-700 w-8 h-8" />,
    mongodb: <SiMongodb className="text-green-600 w-8 h-8" />,
    firebase: <SiFirebase className="text-yellow-500 w-8 h-8" />,
    redis: <SiRedis className="text-red-500 w-8 h-8" />,
    prisma: <SiPrisma className="text-gray-800 w-8 h-8" />,
    neo4j: <SiNeo4J className="text-cyan-600 w-8 h-8" />,

    // Programming Languages & Frameworks
    python: <SiPython className="text-yellow-600 w-8 h-8" />,
    django: <SiDjango className="text-green-700 w-8 h-8" />,
    php: <SiPhp className="text-indigo-600 w-8 h-8" />,
    laravel: <SiLaravel className="text-red-500 w-8 h-8" />,

    // API & Testing
    postman: <SiPostman className="text-orange-500 w-8 h-8" />,

    // Default
    default: <span className="text-2xl">💻</span>,
  };

  return (
    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md border border-gray-200/50 hover:scale-110 transition-transform duration-300">
      {icons[tech] || icons.default}
    </div>
  );
};

// Function to get relevant tech icons based on course title
export const getRelevantTechs = (title) => {
  if (!title || typeof title !== "string")
    return ["html", "css", "javascript", "react"];

  const lowerTitle = title.toLowerCase();
  const relevantTechs = [];

  // 🛠 Tools & Version Control
  if (lowerTitle.includes("git ")) relevantTechs.push("git");
  if (lowerTitle.includes("github")) relevantTechs.push("github");
  if (lowerTitle.includes("gitlab")) relevantTechs.push("gitlab");
  if (lowerTitle.includes("docker")) relevantTechs.push("docker");
  if (lowerTitle.includes("jira")) relevantTechs.push("jira");
  if (lowerTitle.includes("linux")) relevantTechs.push("linux");
  if (lowerTitle.includes("bash") || lowerTitle.includes("shell")) relevantTechs.push("bash");
  if (lowerTitle.includes("vscode") || lowerTitle.includes("visual studio code")) relevantTechs.push("vscode");
  if (lowerTitle.includes("terminal")) relevantTechs.push("terminal");
  if (lowerTitle.includes("project")) relevantTechs.push("project");

  // 🎨 Frontend
  if (lowerTitle.includes("html")) relevantTechs.push("html");
  if (lowerTitle.includes("css") && !lowerTitle.includes("scss")) relevantTechs.push("css");
  if (lowerTitle.includes("javascript") || lowerTitle.includes(" js")) relevantTechs.push("javascript");
  if (lowerTitle.includes("typescript") || lowerTitle.includes(" ts")) relevantTechs.push("typescript");
  if (lowerTitle.includes("react")) relevantTechs.push("react");
  if (lowerTitle.includes("redux")) relevantTechs.push("redux");
  if (lowerTitle.includes("next")) relevantTechs.push("nextjs");
  if (lowerTitle.includes("tailwind")) relevantTechs.push("tailwind");
  if (lowerTitle.includes("bootstrap")) relevantTechs.push("bootstrap");
  if (lowerTitle.includes("framer")) relevantTechs.push("framer");

  // ⚙ Backend
  if (lowerTitle.includes("node")) relevantTechs.push("nodejs");
  if (lowerTitle.includes("express")) relevantTechs.push("express");
  if (lowerTitle.includes("graphql")) relevantTechs.push("graphql");
  if (lowerTitle.includes("nestjs")) relevantTechs.push("nestjs");
  if (lowerTitle.includes("socket")) relevantTechs.push("socketio");
  if (lowerTitle.includes("aws")) relevantTechs.push("aws");

  // 💾 Databases
  if (lowerTitle.includes("mysql")) relevantTechs.push("mysql");
  if (lowerTitle.includes("postgres")) relevantTechs.push("postgresql");
  if (lowerTitle.includes("mongo")) relevantTechs.push("mongodb");
  if (lowerTitle.includes("firebase")) relevantTechs.push("firebase");
  if (lowerTitle.includes("redis")) relevantTechs.push("redis");
  if (lowerTitle.includes("prisma")) relevantTechs.push("prisma");
  if (lowerTitle.includes("neo4j")) relevantTechs.push("neo4j");

  // 🐍 Languages & Frameworks
  if (lowerTitle.includes("python")) relevantTechs.push("python");
  if (lowerTitle.includes("django")) relevantTechs.push("django");
  if (lowerTitle.includes("php")) relevantTechs.push("php");
  if (lowerTitle.includes("laravel")) relevantTechs.push("laravel");

  // 🧪 API & Testing
  if (lowerTitle.includes("postman")) relevantTechs.push("postman");

  return relevantTechs.length > 0
    ? relevantTechs.slice(0, 4) // limit to first 4 matches
    : ["html", "css", "javascript", "react"];
};

// TechLogos component to display icons for a course
export const TechLogos = ({ courseTitle }) => {
  const relevantTechs = getRelevantTechs(courseTitle);

  return (
    <div className="flex justify-center space-x-4 my-6 flex-wrap">
      {relevantTechs.map((tech, index) => (
        <TechIcon key={index} tech={tech} />
      ))}
    </div>
  );
};

export default TechIcon;