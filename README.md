# EndoClinica B&B CMS

Sanity Studio project for the EndoClinica B&B website. This repository manages:

- blog articles
- clinic contact details and business hours
- doctor profiles
- article display dates
- YouTube embeds inside article content
- leads captured by the website contact form

## Scripts

- `npm run dev`
  Starts Sanity Studio locally.
- `npm run build`
  Builds the Studio bundle.
- `npm run deploy`
  Deploys the hosted Studio to Sanity.
- `npm run deploy-graphql`
  Deploys the GraphQL schema if needed.

## Main Structure

- `schemaTypes/post.ts`
  Blog post schema.
- `schemaTypes/clientContact.ts`
  Schema for website leads and contacts.
- `schemaTypes/youtubeEmbed.ts`
  Custom block for YouTube videos.
- `sanity.config.ts`
  Studio configuration.

## Frontend Flow

- The frontend queries this project to render the landing page and blog articles.
- The website form stores leads in the `clienteContato` document type by using a server-side token configured in the frontend.
- Social sharing previews depend on the Next.js frontend pages, not on the Studio itself.
