import { redirect } from "next/navigation";
import { checkAdminPassword, createAdminSession, hasAdminSession } from "@/lib/admin-auth";

async function entrar(formData: FormData) {
  "use server";

  const senha = String(formData.get("senha") ?? "");
  if (!checkAdminPassword(senha)) {
    redirect("/admin/login?erro=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  if (await hasAdminSession()) redirect("/admin");
  const { erro } = await searchParams;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <p className="label-caps text-olive mb-4">Casa Possível</p>
      <h1 className="font-serif-display text-3xl text-charcoal mb-8">
        Acesso administrativo
      </h1>

      <form action={entrar} className="w-full max-w-sm flex flex-col gap-4">
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          required
          className="rounded-sm border border-line bg-paper px-5 py-4 text-charcoal outline-none focus:border-terracotta"
        />
        {erro && (
          <p className="text-sm text-terracotta">Senha incorreta. Tente novamente.</p>
        )}
        <button
          type="submit"
          className="rounded-full bg-charcoal px-8 py-4 text-sm tracking-wide text-cream transition hover:bg-terracotta cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
