
'use server';
/**
 * @fileOverview A server action for handling contact form submissions and sending them to Airtable.
 *
 * - submitContactForm - A function that handles the contact form submission process.
 * - ContactFormInput - The input type for the submitContactForm function.
 * - ContactFormOutput - The return type for the submitContactForm function.
 */

import Airtable from 'airtable';
import { z } from 'zod';


// Check for environment variables on server startup for an early warning, but don't crash the server.
if (typeof process !== 'undefined') {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_NAME) {
    console.warn("Airtable environment variables are not set. The contact form will not work until they are configured in a .env.local file.");
  }
}

// Schema for the data received by the action
const BookingSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  serviceName: z.string(),
  date: z.string(),
  message: z.string(),
});

export type BookingData = z.infer<typeof BookingSchema>;


export async function createBooking(data: BookingData) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    return { success: false, message: 'Airtable integration is not configured on the server. Please check your .env file.' };
  }
  try {
    const table = new Airtable({ apiKey: apiKey.trim() }).base(baseId.trim());

    // Airtable field names should match your Airtable base
    await table(tableName.trim()).create([
      {
        fields: {
          'Name': data.name,
          'Phone': data.phone,
          'Email': data.email,
          'Service Type': data.serviceName,
          'Preferred Date': data.date,
          'Message': data.message,
          'Status': 'New',
        },
      },
    ]);

    return { success: true, message: 'Booking submitted successfully!' };
  } catch (error) {
    console.error('Airtable API error:', error);
    const errorMessage = (error as Error)?.message || 'An unknown error occurred.';
    
    if (errorMessage.includes('You are not authorized to perform this operation') || errorMessage.includes('AUTHENTICATION_REQUIRED')) {
      return { success: false, message: `Airtable authorization failed. Please verify your API key has the 'data.records:write' scope and is authorized for this Base.` };
    }

    if (errorMessage.includes('NOT_FOUND')) {
      return { success: false, message: 'Airtable error: Base or Table not found. Please check your AIRTABLE_BASE_ID and AIRTABLE_TABLE_NAME in your .env file.' };
    }

    if (errorMessage.includes('UNKNOWN_FIELD_NAME')) {
      return { success: false, message: 'Airtable Error: A field name is incorrect. Please ensure your table has columns named exactly: "Full name", "Email Address", "Inquiry", and "Status". The names are case-sensitive.' };
    }
    
    return { success: false, message: `Airtable error: ${errorMessage}` };
  }
}
