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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleLogin } from "./login-form-actions";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().min(1).max(128),
});

export function LoginForm() {
  const [pageMode, setPageMode] = React.useState<
    "idle" | "loading" | "email-sent"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (pageMode === "loading") return;
    setPageMode("loading");
    await handleLogin(values.email);
    setPageMode("email-sent");
  }

  if (pageMode === "email-sent") {
    return (
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Email sent</CardTitle>
          <CardDescription>
            We&apos;ve sent you a login link to your email. Go check your inbox.
            You can close this page.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below and we will send you a link to access your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your best email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pageMode === "loading"}
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <footer className="flex justify-between mt-4">
              <Button type="submit" disabled={pageMode === "loading"}>
                {pageMode === "loading" ? "Sending..." : "Send magic link"}
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
