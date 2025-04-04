import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const { session, user } = await getSession();

    if(!session || !user) redirect("/auth/login");

    return children
}