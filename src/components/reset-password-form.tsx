"use client";

import { resetPasswordAction } from "@/actions/reset-password";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckIcon, CircleXIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

type ResetPasswordFormProps = Readonly<{
  token: string;
}>;

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<{ success: boolean; message: string } | null>(null);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
      token: token,
    },
    mode: "onChange",
  });

  async function handleSubmit(values: ResetPasswordSchema) {
    startTransition(async () => {
      const answer = await resetPasswordAction(values);

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
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Your about to reset your password. Please enter a new password for your account.
          </p>
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
          name="token"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password Confirmation</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Updating ..." : "Update your password"}
        </Button>
        <div className="text-center text-sm">
          You should not be here?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Go back to login
          </Link>
        </div>
      </form>
    </Form>
  );
}
