import { z } from "zod";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  original_language: z.string(),
  vote_average: z.number(),
});

export const moviesResponseSchema = z.object({
  results: z.array(movieSchema),
});

export type Movie = z.infer<typeof movieSchema>;
