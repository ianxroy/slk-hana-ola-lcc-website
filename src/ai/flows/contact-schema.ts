/**
 * @fileOverview Zod schemas for the contact form flow.
 *
 * - ContactFormInputSchema - The Zod schema for the contact form input.
 * - ContactFormInput - The inferred type for the contact form input.
 * - ContactFormOutputSchema - The Zod schema for the contact form output.
 * - ContactFormOutput - The inferred type for the contact form output.
 */

import { z } from 'zod';

export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  interest: z.enum(['services', 'employment']).describe('The area of interest.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;
