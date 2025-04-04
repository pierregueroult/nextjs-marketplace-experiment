import { getSession } from "@/lib/auth/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { session } = await getSession();

  if (session) redirect("/");

  return (
    <div className="flex-1 grid lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div>
        <div className="flex w-full items-center justify-center h-full">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
