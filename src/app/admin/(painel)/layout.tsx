import { redirect } from "next/navigation";
import Link from "next/link";
import { destroyAdminSession, hasAdminSession } from "@/lib/admin-auth";

async function sair() {
  "use server";
  await destroyAdminSession();
  redirect("/admin/login");
}

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasAdminSession())) redirect("/admin/login");

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-10">
        <div>
          <p className="label-caps text-olive">Casa Possível</p>
          <p className="font-serif-display text-lg text-charcoal">Admin</p>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="label-caps text-charcoal/60 hover:text-charcoal">
            Parceiros
          </Link>
          <Link href="/admin/novo" className="label-caps text-charcoal/60 hover:text-charcoal">
            Novo parceiro
          </Link>
          <Link href="/admin/renders" className="label-caps text-charcoal/60 hover:text-charcoal">
            Renders
          </Link>
          <form action={sair}>
            <button className="label-caps text-charcoal/60 hover:text-terracotta cursor-pointer">
              Sair
            </button>
          </form>
        </nav>
      </header>
      <main className="flex flex-1 flex-col px-6 py-10 sm:px-10">{children}</main>
    </div>
  );
}
