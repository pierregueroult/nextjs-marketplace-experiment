import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/lib/auth/server";

export default async function AccountPage() {
  const {  user } = await getSession();

  return (
    <div>
      This is the account page for {user?.name}
      <form>
        <Button
          formAction={async () => {
            "use server";

            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
