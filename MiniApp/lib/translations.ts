// utils/translations.ts

import fs from "fs";
import path from "path";

// Function to load translations based on the locale
export const getTranslations = async (locale: string) => {
  if (typeof window === "undefined") {
    // Server-side logic (Node.js environment)
    return await getServerTranslations(locale);
  } else {
    // Client-side logic (Browser environment)
    return await getClientTranslations(locale);
  }
};

// Server-side: Fetch translations from the file system
const getServerTranslations = async (locale: string) => {
  try {
    const filePath = path.resolve("public", "locales", `${locale}.json`);

    if (!fs.existsSync(filePath)) {
      console.warn(
        `Translation file for ${locale} not found, falling back to English.`
      );
      return await getFallbackTranslations();
    }

    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translations for ${locale}`, error);
    return await getFallbackTranslations();
  }
};

// Client-side: Fetch translations from the public directory
const getClientTranslations = async (locale: string) => {
  try {
    const response = await fetch(`/locales/${locale}.json`);

    if (!response.ok) {
      console.warn(
        `Translation file for ${locale} not found, falling back to English.`
      );
      return await getFallbackTranslations();
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading translations for ${locale}`, error);
    return await getFallbackTranslations();
  }
};

// Helper function to get fallback translations (English)
const getFallbackTranslations = async () => {
  try {
    const fallbackFilePath = path.resolve("public", "locales", "en.json");

    if (!fs.existsSync(fallbackFilePath)) {
      console.error("Fallback translation (English) not found!");
      return {}; // Return an empty object if the fallback is also missing
    }

    const fallbackFileContents = fs.readFileSync(fallbackFilePath, "utf-8");
    return JSON.parse(fallbackFileContents);
  } catch (error) {
    console.error("Error loading fallback translations (English)", error);
    return {}; // Return an empty object if there's an error with fallback
  }
};
