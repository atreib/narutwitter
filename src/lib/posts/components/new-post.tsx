"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPost } from "./new-post-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  content: z.string().min(1).max(128),
  character: z.string().min(1).max(128),
});

export function NewPost() {
  const [pageMode, setPageMode] = React.useState<"idle" | "loading">("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      character: "Naruto Uzumaki",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (pageMode === "loading") return;
    setPageMode("loading");
    await createPost(values.content, values.character);
    form.reset();
    setPageMode("idle");
  }

  const submitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <Card className="py-4">
      <CardContent className="pb-0">
        <Form {...form}>
          <form id="new-post-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What&apos;s happening?</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={pageMode === "loading"}
                      onKeyDown={submitOnEnter}
                      placeholder="Share your thoughts..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <footer className="flex justify-between mt-4">
              <FormField
                control={form.control}
                name="character"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Character" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Naruto Uzumaki">
                          Naruto Uzumaki
                        </SelectItem>
                        <SelectItem value="Sasuke Uchiha">
                          Sasuke Uchiha
                        </SelectItem>
                        <SelectItem value="Sakura Haruno">
                          Sakura Haruno
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                form="new-post-form"
                type="submit"
                disabled={pageMode === "loading"}
              >
                {pageMode === "loading" ? "Publishing..." : "Publish"}
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
