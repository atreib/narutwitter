import { Home } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { TimelineSkeleton } from "@/lib/posts/components/timeline-skeleton";
import { Timeline } from "@/lib/posts/components/timeline";
import { NewPost } from "@/lib/posts/components/new-post";

export default async function TimelinePage() {
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
            <Avatar>
              <AvatarImage
                src="https://i.pravatar.cc/150?img=11"
                alt="@atreib"
              />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 px-6">
        <div className="flex space-x-4">
          <div className="flex-grow space-y-4">
            <NewPost />

            <Suspense fallback={<TimelineSkeleton />}>
              <Timeline />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
