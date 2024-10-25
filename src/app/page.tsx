import { Home } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { TimelineSkeleton } from "@/lib/posts/components/timeline-skeleton";
import { Timeline } from "@/lib/posts/components/timeline";
import { NewPost } from "@/lib/posts/components/new-post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/lib/auth/service";

export default async function TimelinePage() {
  const authenticatedUser = await authService.requireCookieSession();

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow">
        <div className="max-w-3xl mx-auto flex justify-between h-16 px-8">
          <div className="flex">
            <Link
              href="#"
              className="border-primary text-primary inline-flex items-center px-2 pt-2 border-b-2 text-sm font-medium"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={""} alt={authenticatedUser.handle} />
                  <AvatarFallback>
                    {authenticatedUser.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Hi, {authenticatedUser.name} 👋🏻
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a href="/api/auth/logout">Sign out</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 px-6">
        <div className="flex space-x-4">
          <div className="flex-grow space-y-4">
            <NewPost userId={authenticatedUser.id} />

            <Suspense fallback={<TimelineSkeleton />}>
              <Timeline />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
