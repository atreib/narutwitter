import { LoginForm } from "@/lib/auth/components/login-form";

export default async function MagicLinkLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
