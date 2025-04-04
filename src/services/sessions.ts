import { prisma } from "@/database";

import type { Session, User as DbUser } from "@prisma/client";
import type { User} from "better-auth";
 
export async function getSessions(userId: string): Promise<Session[]> {
  const sessions = await prisma.session.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return sessions;
}

export async function deleteSession(sessionId: string, user: User | DbUser): Promise<void> {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) throw new Error("Session not found");

  if (session.userId !== user.id) {
    throw new Error("You do not have permission to delete this session");
  }

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
}