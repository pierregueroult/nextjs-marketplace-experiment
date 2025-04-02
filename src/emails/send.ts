import type { ReactElement } from "react";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import { EmailDeliveryError, SMTPServerError } from "@/emails/error";
import { createTransport } from "nodemailer";
import { log } from "@/lib/logger";

const transporter = createTransport(env.EMAIL_SERVER);

type EmailSendOptions = Omit<MailOptions, "html"> & {
  template: ReactElement<unknown> | string;
};

export default async function send({ template, ...options }: EmailSendOptions) {
  const html = typeof template === "string" ? template : await render(template);

  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      html,
      ...options,
    });
  } catch (error: unknown) {
    console.error("Error sending email", error);
    if (typeof error === "object" && error !== null && "code" in error) {
      const errCode = (error as { code: string }).code;

      if (["EENVELOPE", "EADDRESS", "ECONNREFUSED"].includes(errCode)) {
        log("Email delivery error", {
          level: "ERROR",
          context: "EMAIL",
          error,
        });
        throw new EmailDeliveryError("Invalid email address or delivery failure", error);
      }

      if (["ETIMEDOUT", "ECONNRESET", "EHOSTUNREACH", "ESOCKET"].includes(errCode)) {
        log("SMTP Server Not Responding", {
          level: "ERROR",
          context: "EMAIL",
          error,
        });
        throw new SMTPServerError("SMTP server unavailable or not responding", error);
      }
    }

    if (error instanceof Error) {
      log("Error sending email", {
        level: "ERROR",
        context: "EMAIL",
        error,
      });
      throw new Error("Unknown email error occurred", { cause: error });
    }

    throw new Error("Unknown error occurred while sending email");
  }
}
