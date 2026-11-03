import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Elke Markdown-file in src/content/blog wordt een blogpost.
// Het schema controleert dat elke post de juiste gegevens bovenaan heeft.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    titel: z.string(),
    beschrijving: z.string(),
    datum: z.coerce.date(),
    concept: z.boolean().default(false),
  }),
});

export const collections = { blog };
