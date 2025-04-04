import { signOut } from "@/lib/auth/server";

export default async function LogoutPage() {
    await signOut();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Déconnexion réussie</h1>
            <p className="mt-4">Vous avez été déconnecté avec succès.</p>
        </div>
    )
}