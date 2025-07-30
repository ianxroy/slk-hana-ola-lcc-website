
'use server';
/**
 * @fileOverview A Genkit flow for processing contact form submissions.
 *
 * This file defines a Genkit flow that takes contact form data as input,
 * sends an email using a service, and returns a success or failure message.
 * It's designed to be called from the contact form on the client-side.
 */

import { ai } from '@/ai/genkit';
import {
  ContactFormInputSchema,
  ContactFormOutputSchema,
} from './contact-schema';

/**
 * A flow to handle the submission of the contact form.
 * In a real-world scenario, this flow would integrate with an email sending service.
 * For this example, it simulates a successful submission.
 */
const contactFormFlow = ai.defineFlow(
  {
    name: 'contactFormFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    console.log('Received contact form submission:', input);

    // TODO: Implement actual email sending logic here (e.g., using SendGrid, Nodemailer, or another service).
    // For now, we'll just simulate a successful response.

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you shortly.',
    };
  }
);

/**
 * Publicly exported function to be called from the client-side.
 * It wraps the Genkit flow and provides a clean async interface.
 * @param input The contact form data.
 * @returns A promise that resolves to the output of the flow.
 */
export async function submitContactForm(
  input: import('./contact-schema').ContactFormInput
) {
  return await contactFormFlow(input);
}
