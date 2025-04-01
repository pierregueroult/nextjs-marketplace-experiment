"use client";

import {
  type LoginSchema,
  loginSchema,
  twoFactorLength,
} from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { login } from "@/actions/login";
import { useState } from "react";

export function LoginForm() {
  const [codeEnabled] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: LoginSchema) {
    const answer = await login(values);

    console.log("answer", answer);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@mail.com" 
                  type="email"
                {...field} />
              </FormControl>
              <FormDescription>
                This is the email you used to sign up
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {codeEnabled && (
          <FormField
            control={form.control}
            name="twoFactorCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={twoFactorLength}
                    {...form.register("twoFactorCode")}
                    onChange={(value) =>
                      form
                        .register("twoFactorCode")
                        .onChange({ target: { value }, type: "change" })
                    }
                  >
                    {Array.from({
                      length: Math.ceil(
                        twoFactorLength / (twoFactorLength % 3 === 0 ? 3 : 2)
                      ),
                    }).map((_, groupIndex) => (
                      <InputOTPGroup key={groupIndex}>
                        {Array.from({
                          length: Math.min(
                            twoFactorLength -
                              groupIndex * (twoFactorLength % 3 === 0 ? 3 : 2),
                            twoFactorLength % 3 === 0 ? 3 : 2
                          ),
                        }).map((_, slotIndex) => (
                          <InputOTPSlot
                            key={slotIndex}
                            index={
                              groupIndex * (twoFactorLength % 3 === 0 ? 3 : 2) +
                              slotIndex
                            }
                          />
                        ))}
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>
                <FormDescription>Check your email for the code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
