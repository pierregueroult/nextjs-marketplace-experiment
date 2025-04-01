import nodemailer from "nodemailer";
import { env } from "@/lib/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_SERVER_HOST,
  port: env.SMTP_SERVER_PORT,
  auth: {
    user: env.SMTP_SERVER_USER,
    pass: env.SMTP_SERVER_PASS,
  },
  secure: env.SMTP_SERVER_SECURE === "true",
});

export default transporter;
