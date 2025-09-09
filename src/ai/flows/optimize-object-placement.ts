'use server';

/**
 * @fileOverview AI flow to optimize object placement in the 3D office environment.
 *
 * - optimizeObjectPlacement - A function that optimizes the object placement based on an evaluative prompt.
 * - OptimizeObjectPlacementInput - The input type for the optimizeObjectPlacement function.
 * - OptimizeObjectPlacementOutput - The return type for the optimizeObjectPlacement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OptimizeObjectPlacementInputSchema = z.object({
  environmentDescription: z
    .string()
    .describe('The current description of the 3D office environment.'),
  evaluativePrompt: z.string().describe(
    "An evaluative prompt describing the desired aesthetic and cleanliness of the office, e.g., 'Make the scene feel less cluttered'." // Corrected typo here
  ),
});
export type OptimizeObjectPlacementInput = z.infer<
  typeof OptimizeObjectPlacementInputSchema
>;

const OptimizeObjectPlacementOutputSchema = z.object({
  optimizedPlacementDescription: z
    .string()
    .describe(
      'A description of the optimized object placement within the 3D office environment.'
    ),
});
export type OptimizeObjectPlacementOutput = z.infer<
  typeof OptimizeObjectPlacementOutputSchema
>;

export async function optimizeObjectPlacement(
  input: OptimizeObjectPlacementInput
): Promise<OptimizeObjectPlacementOutput> {
  return optimizeObjectPlacementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeObjectPlacementPrompt',
  input: { schema: OptimizeObjectPlacementInputSchema },
  output: { schema: OptimizeObjectPlacementOutputSchema },
  prompt: `You are an interior design expert specializing in optimizing 3D office environments for a clean and professional look.

You are provided with a description of the current office environment and an evaluative prompt describing the desired aesthetic.

Based on this information, suggest an optimized object placement within the 3D office environment to fulfill the prompt. Consider factors such as object spacing, arrangement, and overall visual appeal.

Current Environment Description: {{{environmentDescription}}}
Evaluative Prompt: {{{evaluativePrompt}}}

Optimized Object Placement Description:`, // Ensured this is the final instruction for the model
});

const optimizeObjectPlacementFlow = ai.defineFlow(
  {
    name: 'optimizeObjectPlacementFlow',
    inputSchema: OptimizeObjectPlacementInputSchema,
    outputSchema: OptimizeObjectPlacementOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
