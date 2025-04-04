import ResetPasswordForm from "@/components/reset-password-form";
import { resetTokenSchema } from "@/schemas/generics/reset-token";
import { redirect } from "next/navigation";

type ResetPasswordPageProps = Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = (await searchParams).token;

  const result = resetTokenSchema.safeParse(token);

  if (!result.success) redirect("/auth/forgot-password");

  return <ResetPasswordForm token={result.data} />;
}
