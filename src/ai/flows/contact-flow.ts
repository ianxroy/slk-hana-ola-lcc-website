
'use server';

/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - submitContactForm - A function that handles the contact form submission.
 */

import { ai } from '@/ai/genkit';
import { ContactFormInput, ContactFormInputSchema, ContactFormOutput, ContactFormOutputSchema } from './contact-schema';


export async function submitContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    console.log('New contact form submission received:', input);

    // In a real application, you would add logic here to send an email,
    // save to a database, or integrate with a CRM.
    // For example, using a service like Resend or SendGrid.

    return {
      success: true,
      message: 'Your message has been received successfully!',
    };
  }
);
