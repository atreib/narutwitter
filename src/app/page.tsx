import { Home } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-muted">
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 px-6">
        <div className="flex space-x-4">
          <div className="flex-grow space-y-4">
            <Card>
              <CardHeader>
                <h2>Cry me a river, bruh</h2>
              </CardHeader>
              <CardContent>
                <div>
                  <Textarea rows={3} />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>Post</Button>
              </CardFooter>
            </Card>

            {[1, 2, 3].map((post) => (
              <Card key={post}>
                <CardHeader>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?img=${post}`}
                        alt={`User ${post}`}
                      />
                      <AvatarFallback>U{post}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        User {post}
                      </CardTitle>
                      <p className="text-sm">@user{post} · 2h</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    This is a sample post content. It can be much longer and
                    include various types of media.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
