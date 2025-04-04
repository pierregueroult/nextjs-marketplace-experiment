import { prisma } from "@/database";

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

interface LoggerOptions {
  context?: string;
  level?: LogLevel;
  error?: unknown;
}

const colors: Record<LogLevel, string> = {
  INFO: "\x1b[32m",
  WARN: "\x1b[33m",
  ERROR: "\x1b[31m",
  DEBUG: "\x1b[36m",
};

const resetColor = "\x1b[0m";
const grayColor = "\x1b[90m";

async function saveLogToDatabase(message: string, level: LogLevel, context?: string, error?: Error) {
  await prisma.log.create({
    data: {
      level,
      context,
      message,
      error: error ? error.message : undefined,
      stack: error ? error.stack : undefined,
    },
  });
}

export async function log(message: string, { level = "INFO", context = "GENERAL", error }: LoggerOptions = {}) {
  const date = new Date().toISOString();
  let prefix = grayColor + date + " " + colors[level] + level;

  if (context) prefix += " " + resetColor + "[" + context + "]";

  const formattedMessage = prefix + " " + resetColor + message;

  console.log(formattedMessage.trim());
  
  if (error instanceof Error) await saveLogToDatabase(message, level, context, error);
}
