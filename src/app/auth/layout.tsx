import { getSession } from "@/services/auth-server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const { session} = await getSession();

    if(session) redirect("/");

    return children;
}