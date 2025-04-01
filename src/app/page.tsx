import { getSession } from "@/services/auth-server";

export default async function Home() {
  const { session, user } = await getSession();

  return <p>
    Hello {user ? user.name : "guest"}! You are {session ? "logged in" : "not logged in"}.
  </p>
}
