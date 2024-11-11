import { test, expect } from "@playwright/test";
import { getSessionTokenForTest } from "./utils/auth";

test.describe("unauthenticated user", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });
  test("can access signup page", async ({ page }) => {
    await page.goto("/auth/signup");
    await expect(
      page.getByRole("heading", { name: /create account/i }),
    ).toBeVisible();
  });
});

test.describe("authenticated user", () => {
  test("can access settings page", async ({ page }) => {
    await page.goto("/settings");
    await expect(
      page.getByRole("heading", { name: /settings page/i }),
    ).toBeVisible();
  });

  test("only admin can access the admin page", async ({ page, context }) => {
    const updatedPayload = {
      id: "672f182cd5370728d87c545e",
      role: "admin",
    };

    await context.addCookies([
      {
        name: "authjs.session-token",
        value: await getSessionTokenForTest(updatedPayload),
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false, // true for HTTPS
        sameSite: "Lax",
        expires: Math.round((Date.now() + 86400000 * 1) / 1000),
      },
    ]);

    await page.goto("/admin");
    await expect(
      page.getByRole("heading", { name: /admin page/i }),
    ).toBeVisible();
  });
});
