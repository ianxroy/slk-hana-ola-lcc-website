
'use server';
/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 * It sets up the necessary plugins, such as Google AI, and exports a globally
 * accessible `ai` object that can be used throughout the application to define
 * and run AI flows.
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { firebase } from '@genkit-ai/firebase';

// Initialize Genkit with the Google AI plugin and Firebase plugin for functions.
export const ai = genkit({
  plugins: [
    googleAI({
      // Your Google AI API key is automatically sourced from the
      // GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY environment variables.
    }),
    firebase(), // Integrates Firebase services like Auth and Firestore.
  ],
  logLevel: 'debug',
  enableTracing: true,
});
