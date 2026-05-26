# Architecture

```mermaid
graph TD
A[User Input] --> B[Audit Engine]
B --> C[Recommendation Logic]
C --> D[Results UI]
C --> E[Supabase Database]
```

## Stack Choice

Next.js was selected for rapid full-stack development and Vercel deployment compatibility.

## Scaling

At larger scale:
- API routes would be separated
- Redis caching added
- Background jobs used for AI summaries