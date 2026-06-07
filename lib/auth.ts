import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

const COOKIE_NAME = "estadulmas_session";
const DEFAULT_PASSWORD = "Tucasospollo07";

function sessionValue() {
  const secret = process.env.SESSION_SECRET || "estadulmas-dev-session-secret";
  const password = process.env.APP_PASSWORD || DEFAULT_PASSWORD;
  return createHash("sha256").update(`${secret}:${password}`).digest("hex");
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === sessionValue();
}

export async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/");
  }
}

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function isValidPassword(password: string) {
  return password === (process.env.APP_PASSWORD || DEFAULT_PASSWORD);
}
