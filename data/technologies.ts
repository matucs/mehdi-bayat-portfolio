export interface TechCategory {
  category: string;
  items: string[];
}

export const technologies: TechCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "C#", "Go", "C++", "Java"],
  },
  {
    category: "Frontend",
    items: [
      "React", "Next.js (SSR/SSG/ISR)", "Zustand", "Redux", "Angular",
      "TanStack Query", "Tailwind CSS", "SCSS", "Styled Components", "Storybook",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js", "NestJS", "Fastify", ".NET Core", "GraphQL", "REST", "gRPC",
      "Microservices", "CQRS", "Event-driven architecture", "WebSockets", "SignalR",
    ],
  },
  {
    category: "Distributed Systems",
    items: ["Kafka", "Redis (cache, pub/sub, streams)", "RabbitMQ", "WebSockets at scale", "Event sourcing patterns"],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS (EC2, S3, Lambda, ECS/Fargate, Bedrock, Cognito, DynamoDB, SQS, SNS, CloudWatch, API Gateway)",
      "Docker", "Kubernetes", "Terraform", "AWS CDK", "CloudFormation", "GitLab CI/CD", "GitHub Actions",
    ],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "MongoDB", "SQL Server", "MySQL", "Redis", "DynamoDB", "OpenSearch"],
  },
  {
    category: "AI Engineering",
    items: ["AWS Bedrock", "RAG pipelines", "Vector databases", "Semantic search", "Prompt engineering", "AI-assisted implementation & review workflow"],
  },
  {
    category: "Testing & Quality",
    items: [
      "Jest", "Vitest", "Cypress", "Playwright", "TDD", "Contract testing",
      "ESLint", "Prettier", "SonarQube", "Architecture Decision Records",
    ],
  },
  {
    category: "Observability",
    items: ["Grafana", "New Relic", "Sentry", "Datadog", "CloudWatch", "OpenTelemetry", "Distributed tracing", "Structured logging"],
  },
];
