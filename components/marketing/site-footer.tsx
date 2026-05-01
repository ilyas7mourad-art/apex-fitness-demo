export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Apex Fitness Dubai
        </p>
        <p className="text-xs text-muted-foreground">
          Demo environment — not a live product
        </p>
      </div>
    </footer>
  );
}
