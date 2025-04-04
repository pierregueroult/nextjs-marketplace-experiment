import AccountSideBar from "@/components/account-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/server";
import { cn } from "@/lib/utils";
import { BellIcon, ChevronLeftIcon, CreditCardIcon, FileIcon, LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { JSX, ReactNode } from "react";

type AccountLayoutProps = Readonly<{ children: ReactNode }>;

const items: {
  title: string;
  href: string;
  icon: JSX.Element;
}[] = [
  {
    title: "Profile",
    href: "/account",
    icon: <UserIcon className="mr-2 size-4" />,
  },
  {
    title: "Payment",
    href: "/account/payment",
    icon: <CreditCardIcon className="mr-2 size-4" />,
  },
  {
    title: "Security",
    href: "/account/security",
    icon: <LockIcon className="mr-2 size-4" />,
  },
  {
    title: "Notifications",
    href: "/account/notifications",
    icon: <BellIcon className="mr-2 size-4" />,
  },
  {
    title: "Privacy",
    href: "/account/privacy",
    icon: <FileIcon className="mr-2 size-4" />,
  },
];

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const { session, user } = await getSession();

  if (!session || !user) redirect("/auth/login");

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4 space-y-8">
      <div className="flex items-center gap-8">
        <div className="w-[240px] flex items-center justify-center">
          <Link href="/" className={cn(buttonVariants({ variant: "link", size: "sm" }), "mr-2")}>
            Back to Marketplace
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <AccountSideBar items={items} />
        <div className="flex-1 p-6 border rounded-lg min-h-[800px]">{children}</div>
      </div>
    </div>
  );
}
