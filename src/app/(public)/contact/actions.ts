"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmitResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Server action to submit a contact form.
 * Inserts a row into the contacts table.
 */
export async function submitContact(
  data: ContactFormData
): Promise<ContactSubmitResult> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: (name, value, options) => {
        // Read-only in Server Components
      },
      remove: (name, options) => {
        // Read-only in Server Components
      },
    });

    // Insert contact message
    const { error } = await supabase.from("contacts").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    if (error) {
      console.error("Contact form insertion error:", error);
      return {
        success: false,
        error: `Failed to send message: ${error.message}`,
      };
    }

    return {
      success: true,
      message: "Message sent to Coach Jake",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact form exception:", message);
    return {
      success: false,
      error: `Failed to send message: ${message}`,
    };
  }
}
