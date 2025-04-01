import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Session as AuthSession, User as AuthUser } from "better-auth";

type SessionFunction = () => Promise<{ session: AuthSession | null; user: AuthUser | null }>;

export const getSession: SessionFunction = async () => {
  const result = await auth.api.getSession({ headers: await headers() });
  return result || { session: null, user: null };
};

type SignUpFunction = (email: string, password: string, name: string, rememberMe: boolean) => Promise<void>;

export const signUp: SignUpFunction = async (email, password, name, rememberMe = false) => {
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      rememberMe,
    },
    headers: await headers(),
  });
};

type SignInFunction = (email: string, password: string, rememberMe?: boolean) => Promise<void>;

export const signIn: SignInFunction = async (email, password, rememberMe = true) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
      rememberMe,
    },
    headers: await headers(),
  });
};

type SignOutFunction = () => Promise<void>;

export const signOut: SignOutFunction = async (): Promise<void> => {
  await auth.api.signOut({ headers: await headers() });
};
