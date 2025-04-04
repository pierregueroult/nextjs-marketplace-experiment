"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Form, FormItem, FormField, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { useSession } from "@/lib/auth/client";
import { useForm } from "react-hook-form";
import { twoFactorSchema, TwoFactorSchema } from "@/schemas/two-factor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { updateTwoFactorAuthAction } from "@/actions/update-two-factor-auth";
import { toast } from "@/components/ui/sonner";

export default function TwoFactorAuthenticationForm() {
  const { data } = useSession();

  const isTwoFactorEnabled = !!data?.user?.twoFactorEnabled;

  const form = useForm<TwoFactorSchema>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      initial: isTwoFactorEnabled,
      password: "",
      enabled: isTwoFactorEnabled,
    },
    mode: "onChange",
  });

  async function handleSubmit(values: TwoFactorSchema) {
    const answer = await updateTwoFactorAuthAction(values);

    console.log(answer);

    if (!answer?.data) {
      toast.error("The server did not respond. Please try again later.");
    } else if (answer.data.success) {
      toast.success("Two-factor authentication updated successfully.");
    } else {
      toast.error(answer.data.message);
    }
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account by enabling two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <SmartphoneIcon className="h-4 w-4 mr-2" />
                        <FormLabel className="font-medium">Two-Factor Authentication</FormLabel>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive a verification code on your email address to log in.
                      </p>
                    </div>
                    <FormControl>
                      <Switch className="cursor-pointer" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initial"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-2 pb-4 text-sm text-muted-foreground">
              {isTwoFactorEnabled
                ? "Two-factor authentication is currently enabled."
                : "Two-factor authentication is currently disabled."}
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password to update two-factor authentication"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" className="cursor-pointer" type="submit">
              Set Up Two-Factor Authentication
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
