export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  dates: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Sportradar",
    role: "Senior Full Stack Engineer",
    location: "Vienna, Austria",
    dates: "Oct 2022 – Present",
    summary:
      "emBET is Sportradar's betting widget, embedded directly into live sports streams and sportsbook partner sites, serving millions of concurrent users during peak events such as Champions League finals.",
    highlights: [
      "Own the frontend: React, Zustand, TanStack Query, WebSockets. Diagnosed a bloated bundle with Webpack Bundle Analyzer and React Profiler, then cut bundle size 30% through code splitting, tree shaking, and removing unused dependencies.",
      "Backend work across Node.js, NestJS, GraphQL, and some Go. Kafka and RabbitMQ handle the event bus between services; introduced CQRS once odds delivery and fan engagement needed to scale on different curves.",
      "Manage AWS infrastructure with Terraform and CDK (ECS, DynamoDB, SQS, SNS, Cognito, API Gateway, CloudWatch), shipping via canary deployments and feature flags.",
      "Built the team's first production RAG pipeline using AWS Bedrock, a vector database, and semantic search for contextual recommendations.",
      "Reduced latency on the hottest betting endpoints under live-event load from ~180ms to ~40ms using Redis cache-aside in front of DynamoDB, TTLs matched to odds update frequency, and a more compact serialization format.",
      "On-call ownership: Sentry for errors, Grafana and New Relic for the rest. Postmortems from real incidents have driven actual architecture changes.",
      "GitLab CI on trunk-based development: lint, unit tests, E2E, security scan, then deploy with auto-rollback on failed health checks. Mentored junior engineers through pairing sessions.",
    ],
    technologies: [
      "React", "TypeScript", "Zustand", "TanStack Query", "WebSockets",
      "Node.js", "NestJS", "GraphQL", "Go", "Kafka", "RabbitMQ", "CQRS",
      "AWS (ECS, DynamoDB, SQS, SNS, Cognito, API Gateway, CloudWatch)",
      "Terraform", "AWS CDK", "Bedrock", "RAG", "Redis", "GitLab CI/CD",
    ],
  },
  {
    company: "TSETMC",
    role: "Senior Full Stack Developer",
    location: "Tehran, Iran",
    dates: "Aug 2020 – Oct 2022",
    summary:
      "TSETMC is the technology backbone of Iran's national stock exchange. Worked on real-time trading and market-data platforms under a zero-downtime requirement.",
    highlights: [
      "Built the order book UI (React, Redux, SignalR, WebSockets) handling thousands of price ticks per second while staying responsive.",
      "Brought p99 latency on the main exchange-to-client data pipelines under 60ms (.NET Core, REST, gRPC) by removing blocking async calls and adding targeted database indexing.",
      "Diagnosed peak-hour dashboard slowness with React Profiler, then virtualized the order book table and memoized derived calculations for roughly 40% faster render times.",
      "Investigated race conditions in concurrent WebSocket streams and state-sync issues only reproducible under real trading load, using structured logging and distributed tracing.",
      "Maintained Jest coverage above 85% on trading logic; passed a formal financial regulatory compliance review (JWT, RBAC, full audit logging, encrypted communications).",
    ],
    technologies: [
      "React", "Redux", "SignalR", "WebSockets", ".NET Core", "REST", "gRPC",
      "SQL Server", "Distributed Tracing", "Structured Logging",
    ],
  },
  {
    company: "Omid Computer Service",
    role: "Senior Front-End Developer",
    location: "Tehran, Iran",
    dates: "Mar 2019 – Aug 2020",
    summary:
      "CRM and CMS platform for a large bank — account management, customer workflows, and internal tools used daily by thousands of employees.",
    highlights: [
      "Built an Angular component library documented in Storybook so other teams could reuse it independently.",
      "Defined OpenAPI contracts with the Java backend team before integration work began, avoiding weeks of back-and-forth, especially for the WebSocket setup.",
      "Ran Lighthouse audits across main user journeys, fixed render-blocking scripts and missing lazy-loading, and brought load times down ~40% with Core Web Vitals moving from red to green.",
      "Introduced ESLint, Prettier, and Husky to a codebase that had none, improving review quality.",
    ],
    technologies: ["Angular", "Storybook", "OpenAPI", "WebSockets", "Lighthouse", "ESLint", "Prettier"],
  },
  {
    company: "Rahyab Rayaneh Gostar",
    role: "Senior Full Stack Developer",
    location: "Tehran, Iran",
    dates: "Aug 2015 – Mar 2019",
    summary:
      "GCOMS is the logistics system running Iran's 13 main maritime ports — cargo tracking, customs clearance, manifests, and port authority reporting (eAsia Award for Trade Facilitation). Joined to rewrite the system incrementally while it stayed live across all 13 ports.",
    highlights: [
      "Rewrote the platform in C#, .NET Core, Entity Framework, Web API, React, and Angular, migrating port by port with no big-bang cutover.",
      "Designed the API layer with versioning from day one to support 500+ operators across 13 ports on different release schedules.",
      "Delivered web, mobile, and desktop clients for port staff who weren't all at desks.",
      "Introduced code reviews and automated testing to a team that had neither, and built a hotfix/rollback process for 24/7 operation.",
    ],
    technologies: ["C#", ".NET Core", "Entity Framework", "Web API", "React", "Angular", "SQL Server"],
  },
  {
    company: "Healthcare Startup",
    role: "Full Stack Developer & Co-Founder",
    location: "Tehran, Iran",
    dates: "Aug 2014 – Mar 2016",
    summary:
      "Co-founded a healthcare startup building appointment booking, patient records, and clinical workflow tools for private clinics, as the sole engineer for most of it.",
    highlights: [
      "Built the product end to end in .NET and React with REST APIs, without cutting corners on security for sensitive healthcare data.",
      "Wrote ADRs and kept API documentation current throughout as a solo engineer.",
      "Worked directly with clinic staff on product decisions outside the code editor.",
    ],
    technologies: [".NET", "React", "REST APIs"],
  },
  {
    company: "PressTV",
    role: "Full Stack Developer",
    location: "Tehran, Iran",
    dates: "May 2014 – Aug 2015",
    summary:
      "Broadcasting software for a live news operation: desktop apps, mobile, and embedded wall displays.",
    highlights: [
      "Wrote C++ for real-time video and image processing off broadcast hardware, with no browser runtime to fall back on.",
      "First mobile development experience, in Java and Objective-C.",
    ],
    technologies: ["C++", "Java", "Objective-C"],
  },
];

export const education = [
  {
    degree: "M.Sc. Computer Science, Intelligent Systems",
    school: "University of Tabriz",
    dates: "2011 – 2013",
    detail:
      "GPA 18.03/20. Thesis on polygon decomposition into convex parts, improving the time and space complexity of an existing NP-complete solution in computational geometry and building a parallel version of the algorithm. Two papers presented at the National CSI Conference (2014).",
  },
  {
    degree: "B.Sc. Applied Mathematics",
    school: "University of Isfahan",
    dates: "2005 – 2010",
    detail: "",
  },
];

export const languages = [
  { language: "English", level: "C1, Professional Working Proficiency" },
  { language: "German", level: "A2, Elementary" },
];
