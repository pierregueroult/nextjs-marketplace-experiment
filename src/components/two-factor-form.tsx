"use client";

import { TwoFactorSchema, twoFactorSchema } from "@/schemas/two-factor-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

type TwoFactorFormProps = Readonly<{
    enabled: boolean;
}>;

export function TwoFactorForm({ enabled }: TwoFactorFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TwoFactorSchema>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      initial: enabled,
      enabled: false,
      password: "",
    },
    mode: "onChange",
  });

  async function handleSubmit(values: TwoFactorSchema) {
    startTransition(async () => {
      console.log(values);
    });
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
            control={form.control}
            name="initial"
            render={({ field }) => (
                <Input
                    type="hidden"
                    {...field}                    
                    value={field.value === true ? "true" : "false"}
                />
            )}
        />
        <Button type="submit" disabled={isPending} className="cursor-pointer">
            {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {enabled ? "Disable" : "Enable"} Two-Factor Authentication
        </Button>
    </form>
  </Form>;
}
