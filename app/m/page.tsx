import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function MemberPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted">
        <Construction className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Member Experience
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Coming in the next PR — personalized programs, QR scanner, and
          session tracker.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to demo home
      </Link>
    </main>
  );
}
