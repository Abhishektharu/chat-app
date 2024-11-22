import axios from "axios";

const LINGVA_TRANSLATE_BASE = "https://ggg-sooty-nu.vercel.app"; // Correct URL

/**
 * Translate a message using Lingva Translate.
 * @param {string} text - The text to be translated.
 * @param {string} sourceLang - The source language (e.g., "auto" for auto-detect).
 * @param {string} targetLang - The target language (e.g., "en").
 * @returns {string} Translated text.
 */
export const translateMessage = async (text, sourceLang = "auto", targetLang = "en") => {
  try {
    // Correct endpoint
const response = await axios.get(
  `${LINGVA_TRANSLATE_BASE}/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
);

    return response.data.translation; // Translated text
  } catch (error) {
    console.error("Translation error:", error.message);
    return "Translation failed.";
  }
};
