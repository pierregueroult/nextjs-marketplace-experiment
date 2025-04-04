import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/auth/server";
import { getSessions } from "@/services/sessions";
import SessionLogItem from "@/components/session-log-item";

export default async function SecurityLog() {
  const { session, user } = await getSession();

  if (!session || !user) return <></>;

  const sessions = await getSessions(user.id);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Session Log</CardTitle>
        <CardDescription>
            See active sessions and recent logins to your account. You can also sign out of any active sessions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((s) => (
            <SessionLogItem key={session.id} session={s} isActiveSession={s.id === session.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
