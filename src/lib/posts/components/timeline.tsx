import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postsService } from "@/lib/posts/service";
import { relativeDate } from "@/lib/formatters/date";

export async function Timeline() {
  const posts = await postsService.getPosts();

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://i.pravatar.cc/150?img=1${post.author.id}`}
                  alt={post.author.handle}
                />
                <AvatarFallback>
                  {post.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold">
                  {post.author.name}
                </CardTitle>
                <p className="text-sm">
                  @{post.author.handle} · {relativeDate.format(post.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
