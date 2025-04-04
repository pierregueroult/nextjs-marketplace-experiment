"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

type AccountSideBarProps = Readonly<{
  items: {
    title: string;
    href: string;
    icon: JSX.Element;
  }[];
}>;

export default function AccountSideBar({ items }: AccountSideBarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-[240px] flex-shrink-0">
      <div className="sticky top-6 pr-4">
        <nav className="flex flex-col space-y-1 rounded-lg border p-3 ">
          {items.map(({ title, href, icon }) => (
            <Link
              href={href}
              key={title}
              className={cn(
                buttonVariants({ variant: href === pathname ? "secondary" : "ghost" }),
                "w-full justify-start"
              )}
            >
              {icon}
              {title}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-2">Need Help?</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Having trouble with your settings? Our support team is here to help.
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Contact Support
          </Button>
        </div>
      </div>
    </aside>
  );
}
