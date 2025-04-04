"use client";

import { forgotPasswordSchema, ForgotPasswordSchema } from "@/schemas/forgot-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgotPasswordAction } from "@/actions/forgot-password";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckIcon, CircleXIcon } from "lucide-react";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<{ success: boolean; message: string } | null>(null);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function handleSubmit(values: ForgotPasswordSchema) {
    startTransition(async () => {
      const answer = await forgotPasswordAction(values);

      if (!answer?.data) {
        setAnswer({ success: false, message: "The server did not respond. Please try again later." });
      } else {
        setAnswer(answer.data);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-balance text-sm text-muted-foreground">Enter your email to reset your password</p>
        </div>
        {answer && (
          <Alert variant={answer.success ? "default" : "destructive"}>
            {answer.success ? <CheckIcon className="h-4 w-4" /> : <CircleXIcon className="h-4 w-4" />}
            <AlertTitle>{answer.success ? "Process Successful" : "Invalid Password Reset Attempt"}</AlertTitle>
            <AlertDescription>{answer.message}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@mail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
        <div className="text-center text-sm">
          Remembered your password?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Go back to login
          </Link>
        </div>
      </form>
    </Form>
  );
}
