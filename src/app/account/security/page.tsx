import ChangePasswordForm from "@/components/change-password-form";
import SecurityLog from "@/components/security-log";
import TwoFactorAuthenticationForm from "@/components/two-factor-auth-form";

export default async function AccountSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Change your password, enable two-factor authentication, and manage your account activity.
        </p>
      </div>
      <div className="space-y-8">
        <ChangePasswordForm />
        <TwoFactorAuthenticationForm />
        <SecurityLog />
      </div>
    </div>
  );
}
