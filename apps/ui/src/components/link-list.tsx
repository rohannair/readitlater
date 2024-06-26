"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export function LinkList() {
  const [selectedLink, setSelectedLink] = useState(null);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#333] text-white px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <BookmarkIcon className="h-6 w-6" />
          <span className="text-xl font-semibold">Bookmark App</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            className="text-sm font-medium hover:underline"
            href="#"
            prefetch={false}
          >
            Bookmarks
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Folders
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <UserIcon className="h-4 w-4 mr-2" />
                My Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <div className="flex-1 flex">
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Bookmarks</h1>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <FolderIcon className="h-4 w-4 mr-2" />
                    By Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ClockIcon className="h-4 w-4 mr-2" />
                    By Date Added
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <StarIcon className="h-4 w-4 mr-2" />
                    By Popularity
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ListOrderedIcon className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <AArrowUpIcon className="h-4 w-4 mr-2" />
                    Ascending
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowDownWideNarrowIcon className="h-4 w-4 mr-2" />
                    Descending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="flex-1 max-w-md"
            />
            <Button className="ml-2">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Today</h2>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Acme Inc.")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Acme Inc. - The Best Company Ever
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://www.acme.com
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Acme Inc. is a leading provider of innovative products and
                    services. Our mission is to deliver the best solutions to
                    our customers.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Business
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Technology
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Marketing
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 1, 2023
                  </div>
                </Link>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Vercel")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Vercel - The Platform for Frontend Teams
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://www.vercel.com
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Vercel is a cloud platform for static sites and serverless
                    functions. It enables frontend teams to host their entire
                    project on Vercel, from their frontend components to their
                    serverless functions.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Web Development
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Frontend
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Serverless
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 2, 2023
                  </div>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Yesterday</h2>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Tailwind CSS")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Tailwind CSS - Utility-First CSS Framework
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://tailwindcss.com
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Tailwind CSS is a utility-first CSS framework that provides
                    a set of pre-defined classes to quickly build custom user
                    interfaces.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      CSS
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Frontend
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Design
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 3, 2023
                  </div>
                </Link>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Shadcn/UI")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Shadcn/UI - Beautiful, accessible React components
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://ui.shadcn.com
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Shadcn/UI is a collection of beautifully designed,
                    accessible, and customizable React components that you can
                    use in your projects.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      React
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      UI
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Design
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 4, 2023
                  </div>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Last Week</h2>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Prisma")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Prisma - The Fully-Featured ORM for Node.js
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://www.prisma.io
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Prisma is a next-generation ORM that provides a type-safe
                    database access layer for Node.js and TypeScript. It
                    simplifies database operations and enables faster
                    development.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Node.js
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      ORM
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Database
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 5, 2023
                  </div>
                </Link>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <Link
                  href="#"
                  className="block"
                  onClick={() => setSelectedLink("Next.js")}
                  prefetch={false}
                >
                  <h3 className="font-semibold text-lg truncate">
                    Next.js - The React Framework for Production
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    https://nextjs.org
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Next.js is a React framework that enables server-side
                    rendering and static site generation, improving the
                    performance and SEO of your React applications.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      React
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Web Development
                    </div>
                    <div className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                      Performance
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Added on May 6, 2023
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <div className="bg-background p-4 md:p-6 border-l">
          {selectedLink && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{selectedLink}</h2>
              <p className="text-muted-foreground">
                This is the content for the selected link.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 13h6" />
      <path d="m2 16 4.5-9 4.5 9" />
      <path d="M18 16V7" />
      <path d="m14 11 4-4 4 4" />
    </svg>
  );
}

function ArrowDownWideNarrowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M11 4h10" />
      <path d="M11 8h7" />
      <path d="M11 12h4" />
    </svg>
  );
}

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
