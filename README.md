# Read It Later
- Store links, organize, and annotate
- Use LLMs to summarize
- Share links with friends

This application uses [Bun](https://bun.sh/), [Hono](https://hono.dev), [Next.js]([https://](https://nextjs.org/)).

## Getting Started
### Prerequisites
1. Install Bun:
```shell
$ curl -fsSL https://bun.sh/install | bash
```
2. Clone repo
3. Set up `.env`
  __Note: the base repo uses [Infisical](https://infisical.com/)__
4. `bun install`

### Running migrations
1. Ensure DB_URL is populated
2. `bun drizzle-kit push`

## Overall architecture
```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#f7c8db', 'primaryTextColor': '#2a0a1b', 'primaryBorderColor': '#d7678f', 'lineColor': '#d7678f', 'secondaryColor': '#fde7f0', 'tertiaryColor': '#fbbad1' }}}%%

graph TD
 %% Styling
 classDef default fill:#f7c8db,stroke:#d7678f,stroke-width:2px,color:#2a0a1b;
 classDef clients fill:#fde7f0,stroke:#d7678f,stroke-width:2px,color:#2a0a1b;
 classDef mlservices fill:#fbbad1,stroke:#d7678f,stroke-width:2px,color:#2a0a1b;
 classDef database fill:#d7678f,stroke:#a13d62,stroke-width:2px,color:#ffffff;

 subgraph Clients
     A[Next.js App]
     B[Svelte Chrome Extension]
 end

 D[REST API]

 subgraph ML Services
     E[OpenAI]
     G[Jina]
 end

 H[(Supabase Postgres)]
 I[Trigger.dev]
 J[Resend]

 A --> D
 B --> D
 D --> H
 D --> I
 I --> J
 I --> E
 I --> G

 %% Applying styles
 class A,B clients;
 class E,G mlservices;
 class H database;
```