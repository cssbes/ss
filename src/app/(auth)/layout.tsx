import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-muted p-12">
        <div>
          <Link href="/" className="text-xl font-bold">
            Auth App
          </Link>
        </div>
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;The easiest authentication system I've ever set up. Everything
            just works out of the box.&rdquo;
          </p>
          <footer className="text-sm text-muted-foreground">
            Sarah Chen, Lead Developer
          </footer>
        </blockquote>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
