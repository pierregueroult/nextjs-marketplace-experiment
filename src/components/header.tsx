import { BellIcon, HeartIcon, PlusSquareIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { getSession } from "@/services/auth-server";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// TODO: Add in database (we use a static array for now)
const categories = [
  { title: "Real Estate", link: "#" },
  { title: "Vehicles", link: "#" },
  { title: "Jobs", link: "#" },
  { title: "Fashion", link: "#" },
  { title: "Home", link: "#" },
  { title: "Multimedia", link: "#" },
  { title: "Hobbies", link: "#" },
  { title: "Pets", link: "#" },
  { title: "Services", link: "#" },
  { title: "Vacations", link: "#" },
  { title: "Miscellaneous", link: "#" },
  { title: "Electronics", link: "#" },
];

export default async function Header() {
  const { session, user } = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col mx-auto px-4 items-center">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex-1">
            <Link href="/" className="text-4xl lowercase font-semibold">
              lebonmarket
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <form className="flex items-center">
              <div className="relative">
                <label htmlFor="search">
                  <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <span className="sr-only">Search</span>
                </label>
                <Input
                  type="search"
                  placeholder="Search items on lebonmarket ..."
                  id="search"
                  name="search"
                  className="w-96 pl-8 bg-background rounded-lg"
                />
              </div>
            </form>
            <Link href="/post-an-ad" className={buttonVariants({ variant: "default" })}>
              <PlusSquareIcon />
              Post an Ad
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center gap-6">
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/favorites" className={buttonVariants({ variant: "ghost", size: "icon" })}>
                  <HeartIcon />
                  <span className="sr-only">Favorites</span>
                </Link>
              </li>
              <li>
                <Link href="/notifications" className={buttonVariants({ variant: "ghost", size: "icon" })}>
                  <BellIcon />
                  <span className="sr-only">Notifications</span>
                </Link>
              </li>
              {session && user ? (
                <li>
                  <DropdownMenu
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                          <Avatar>
                            <AvatarImage
                              src={user.image ?? undefined}
                              alt={`${user.name}'s profile picture`}
                            />
                            <AvatarFallback>
                              {user.name.split(" ").slice(0, 2).map((name) => name[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="bottom"
                    >
                      <DropdownMenuLabel>
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account/">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/settings">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/auth/login" className={buttonVariants({ variant: "outline" })}>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/register" className={buttonVariants({ variant: "default" })}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-6 py-2 text-sm justify-center flex-wrap">
          {categories.map((category, i) => (
            <Fragment key={category.title}>
              <Link href={category.link}>{category.title}</Link>
              {i < categories.length - 1 && <span className="text-gray-400">•</span>}
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  );
}
