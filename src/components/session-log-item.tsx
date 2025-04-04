"use client";

import { getBrowserNameFromUserAgent } from "@/lib/utils";
import type { Session } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { deleteSessionAction } from "@/actions/delete-session";
import { toast } from "@/components/ui/sonner";

type SessionLogItemProps = Readonly<{
  session: Session;
  isActiveSession: boolean;
}>;

export default function SessionLogItem({ session, isActiveSession }: SessionLogItemProps) {
  const browser = getBrowserNameFromUserAgent(session.userAgent ?? "");

  async function handleClick() {
    const answer = await deleteSessionAction({ id: session.id });

    if (!answer?.data) {
      toast.error("The server did not respond. Please try again later.");
    }
    if (answer?.data?.success) {
      toast.success("Session deleted successfully.");
    } else {
      toast.error(answer?.data?.message ?? "An error occurred. Please try again later.");
    }
  }

  return (
    <div className="rounded-md bg-muted p-4">
      <div className="flex">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {session.ipAddress === null || session.ipAddress === "::1" ? "Unknown Address" : session.ipAddress} -{" "}
            {browser}
            {isActiveSession ? " (Current Session)" : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            <span>
              Last active:{" "}
              {session.updatedAt.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </span>{" "}
            -{" "}
            <span>
              First active:{" "}
              {session.createdAt.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Button
            size="icon"
            variant="destructive"
            onClick={handleClick}
            className="cursor-pointer"
            disabled={isActiveSession}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
