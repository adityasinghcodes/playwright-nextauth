// Essential imports
import { chromium } from "@playwright/test"; // For browser automation
import path from "path"; // For handling file paths
import dotenv from "dotenv"; // For environment variables
import { JWT } from "next-auth/jwt"; // For handling JWT tokens
import { getSessionTokenForTest } from "../utils/auth";

// Load environment variables
dotenv.config();

// Constants definition
const COOKIE_EXPIRY_DAYS = 1;
const DOMAIN = "localhost";
const STORAGE_STATE_PATH = path.join(__dirname, "/state.json");

export default async function globalSetup() {
  // Define JWT payload
  const payload: JWT = {
    id: "672f182cd5370728d87c545e",
    role: "user",
  };

  // Declare variables for browser management
  let browser;
  let context;

  try {
    // Launch browser
    browser = await chromium.launch();

    // Create new browser context
    context = await browser.newContext();

    // Create session token
    const sessionToken = await getSessionTokenForTest(payload);

    // Add authentication cookie
    await context.addCookies([
      {
        name: "authjs.session-token",
        value: sessionToken,
        domain: DOMAIN,
        path: "/",
        httpOnly: true,
        secure: false, // true for HTTPS
        sameSite: "Lax",
        expires: Math.round(
          (Date.now() + 86400000 * COOKIE_EXPIRY_DAYS) / 1000,
        ),
      },
    ]);

    // Save the storage state
    await context.storageState({ path: STORAGE_STATE_PATH });
  } catch (error) {
    // Error logging
    if (error instanceof Error) {
      console.error("Error in global setup:", error.message);
    }
    throw error;
  } finally {
    // Cleanup: Close browser and context
    await context?.close();
    await browser?.close();
  }
}
