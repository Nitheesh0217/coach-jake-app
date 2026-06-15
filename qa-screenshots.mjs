// ─────────────────────────────────────────────────────────────
// qa-screenshots.mjs
// Run: node qa-screenshots.mjs
// Saves all screenshots to qa-screenshots/ in project root
// ─────────────────────────────────────────────────────────────

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

// ── CONFIG ────────────────────────────────────────────────────
const BASE_URL = "https://coach-jake-app.vercel.app";
const ATHLETE_EMAIL = "donepudinitheesh.17@gmail.com";
const ATHLETE_PASS = "Jupiter@0592";
const COACH_EMAIL = "nitheeshdonepudi.17@gmail.com";
const COACH_PASS = "Jupiter@0592";

// Save inside project root so you can drag-drop to chat
const SAVE_DIR = path.resolve("./qa-screenshots");
fs.mkdirSync(SAVE_DIR, { recursive: true });

// ── HELPERS ───────────────────────────────────────────────────
const shot = async (page, name, full = true) => {
  await page.waitForLoadState("networkidle");
  await new Promise((r) => setTimeout(r, 800)); // wait for animations
  await page.screenshot({ path: path.join(SAVE_DIR, name), fullPage: full });
  console.log(`  ✅  ${name}`);
};

const login = async (page, email, pass) => {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(pass);
  await page.locator('button[type="submit"]').click();
  await page.waitForLoadState("networkidle");
  await new Promise((r) => setTimeout(r, 1000));
  return page.url();
};

const logout = async (page) => {
  // Try sidebar logout button first
  try {
    const btn = page.locator(
      'button:has-text("Log out"), button:has-text("Sign out"), a:has-text("Log out"), a:has-text("Sign out")',
    );
    if ((await btn.count()) > 0) {
      await btn.first().click();
      await page.waitForLoadState("networkidle");
      return;
    }
  } catch {}
  // Fallback: clear cookies
  await page.context().clearCookies();
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
};

// ── MAIN ──────────────────────────────────────────────────────
(async () => {
  console.log("\n🚀 Starting Coach Jake QA Screenshot Run");
  console.log(`📁 Saving to: ${SAVE_DIR}\n`);

  const browser = await chromium.launch({ headless: false, slowMo: 100 });

  // ────────────────────────────────────────────────────────────
  // PHASE 1 — PUBLIC PAGES (desktop 1440x900)
  // ────────────────────────────────────────────────────────────
  console.log("📸 PHASE 1 — Public pages (1440×900)");
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const pg = await desktop.newPage();

  await pg.goto(BASE_URL);
  await shot(pg, "01-homepage.png");

  await pg.goto(`${BASE_URL}/login`);
  await shot(pg, "02-login.png");

  // ────────────────────────────────────────────────────────────
  // PHASE 2 — ATHLETE FLOW
  // ────────────────────────────────────────────────────────────
  console.log("\n📸 PHASE 2 — Athlete flow");
  const landedAt = await login(pg, ATHLETE_EMAIL, ATHLETE_PASS);
  console.log(`   → Redirected to: ${landedAt}`);

  // Onboarding check
  if (pg.url().includes("finish-profile") || pg.url().includes("onboarding")) {
    await shot(pg, "16-onboarding-step1.png");
    for (let i = 2; i <= 4; i++) {
      const next = pg.locator(
        'button:has-text("Next"), button:has-text("Continue")',
      );
      if ((await next.count()) > 0) {
        await next.first().click();
        await pg.waitForLoadState("networkidle");
        await shot(pg, `${15 + i}-onboarding-step${i}.png`);
      }
    }
    const finish = pg.locator(
      'button:has-text("Finish"), button:has-text("Complete"), button:has-text("Done"), button:has-text("Get Started")',
    );
    if ((await finish.count()) > 0) {
      await finish.first().click();
      await pg.waitForLoadState("networkidle");
    }
  } else {
    // Already onboarded — placeholder files
    for (let i = 1; i <= 4; i++) {
      fs.copyFileSync(
        path.join(SAVE_DIR, "02-login.png"),
        path.join(SAVE_DIR, `${15 + i}-onboarding-step${i}-skipped.png`),
      );
    }
    console.log(
      "  ℹ️  Onboarding skipped (already completed) — placeholder files created",
    );
  }

  // Athlete dashboard
  await pg.goto(`${BASE_URL}/dashboard`);
  await shot(pg, "03-athlete-dashboard.png");

  // Mark Complete — before
  await pg.screenshot({
    path: path.join(SAVE_DIR, "20-mark-complete-before.png"),
    fullPage: true,
  });
  console.log("  ✅  20-mark-complete-before.png");

  // Try to interact with Mark Complete button
  try {
    const checkboxes = pg.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) await checkboxes.nth(i).check();
    const completeBtn = pg.locator(
      'button:has-text("Mark Complete"), button:has-text("Session Complete"), button:has-text("Complete Session"), button:has-text("Mark Session")',
    );
    if ((await completeBtn.count()) > 0) {
      await completeBtn.first().click();
      await pg.waitForLoadState("networkidle");
      await new Promise((r) => setTimeout(r, 1200));
    }
  } catch (e) {
    console.log(`  ⚠️  Mark Complete interaction: ${e.message}`);
  }
  await pg.screenshot({
    path: path.join(SAVE_DIR, "21-mark-complete-after.png"),
    fullPage: true,
  });
  console.log("  ✅  21-mark-complete-after.png");

  // Athlete workouts
  await pg.goto(`${BASE_URL}/workouts`);
  await shot(pg, "04-athlete-workouts.png");

  // Athlete leaderboard
  await pg.goto(`${BASE_URL}/leaderboard`);
  await shot(pg, "05-athlete-leaderboard.png");

  // ────────────────────────────────────────────────────────────
  // PHASE 3 — COACH FLOW
  // ────────────────────────────────────────────────────────────
  console.log("\n📸 PHASE 3 — Coach flow");
  await logout(pg);
  await login(pg, COACH_EMAIL, COACH_PASS);

  await pg.goto(`${BASE_URL}/dashboard`);
  await shot(pg, "06-coach-dashboard.png");

  await pg.goto(`${BASE_URL}/trainer-dashboard`);
  await shot(pg, "07-trainer-dashboard.png");

  await pg.goto(`${BASE_URL}/workouts`);
  await shot(pg, "08-coach-workouts.png");

  await pg.goto(`${BASE_URL}/leaderboard`);
  await shot(pg, "09-coach-leaderboard.png");

  await desktop.close();

  // ────────────────────────────────────────────────────────────
  // PHASE 4 — MOBILE (375x812)
  // ────────────────────────────────────────────────────────────
  console.log("\n📸 PHASE 4 — Mobile (375×812)");
  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const mp = await mobile.newPage();

  await mp.goto(BASE_URL);
  await shot(mp, "10-mobile-homepage.png");

  await login(mp, ATHLETE_EMAIL, ATHLETE_PASS);
  await mp.goto(`${BASE_URL}/dashboard`);
  await shot(mp, "11-mobile-dashboard.png");

  await mp.goto(`${BASE_URL}/workouts`);
  await shot(mp, "12-mobile-workouts.png");

  await mobile.close();

  // ────────────────────────────────────────────────────────────
  // PHASE 5 — PROTECTED ROUTES (logged out)
  // ────────────────────────────────────────────────────────────
  console.log("\n📸 PHASE 5 — Auth guard check (logged out)");
  const out = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const op = await out.newPage();

  for (const [route, name] of [
    ["/dashboard", "13-protected-dashboard-loggedout.png"],
    ["/workouts", "14-protected-workouts-loggedout.png"],
    ["/leaderboard", "15-protected-leaderboard-loggedout.png"],
  ]) {
    await op.goto(`${BASE_URL}${route}`);
    await op.waitForLoadState("networkidle");
    await op.screenshot({ path: path.join(SAVE_DIR, name), fullPage: true });
    const landed = op.url();
    const pass = landed.includes("/login") || landed.includes("/signin");
    console.log(
      `  ${pass ? "✅" : "❌"}  ${route} → ${landed} (${pass ? "PROTECTED" : "NOT PROTECTED"})`,
    );
  }

  await out.close();
  await browser.close();

  // ────────────────────────────────────────────────────────────
  // DONE — open folder
  // ────────────────────────────────────────────────────────────
  const files = fs.readdirSync(SAVE_DIR).filter((f) => f.endsWith(".png"));
  console.log(`\n✅ Done! ${files.length} screenshots saved to:`);
  console.log(`   ${SAVE_DIR}\n`);
  files.sort().forEach((f) => console.log(`   ${f}`));

  // Open folder in Windows Explorer
  exec(`explorer "${SAVE_DIR.replace(/\//g, "\\")}"`);
})();
