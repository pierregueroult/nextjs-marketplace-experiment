import type { ReactElement } from "react";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import { createTransport } from "nodemailer";

const transporter = createTransport(env.EMAIL_SERVER);

type EmailSendOptions = Omit<MailOptions, "html"> & {
  template: ReactElement<unknown> | string;
};

export default async function send({ template, ...options }: EmailSendOptions): Promise<boolean> {
  const html = typeof template === "string" ? template : await render(template);

  console.log('Now sending email to', options.to);

  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      html,
      ...options,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }

  return true;
}
