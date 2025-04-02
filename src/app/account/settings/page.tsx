import { TwoFactorForm } from "@/components/two-factor-form";
import { auth } from "@/lib/auth";
import { getSession } from "@/services/auth-server";

export default async function AccountSettingsPage() {
    const { session, user } = await getSession();
    if (!session || !user) return <></>;


    return (
        <div
            className="max-w-lg"
        >
            <TwoFactorForm enabled={false} />
        </div>
    )
}