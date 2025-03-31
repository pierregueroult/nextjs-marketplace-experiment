import type { ReactElement } from "react";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";
import { render } from "@react-email/render";
import transporter from "@/emails/transporter";

type EmailSendOptions = Omit<MailOptions, "html"> & {
  template: ReactElement<unknown> | string;
};

export default async function send({ template, ...options }: EmailSendOptions): Promise<boolean> {
  const html = typeof template === "string" ? template : await render(template);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      html,
      ...options,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }

  return true;
}
