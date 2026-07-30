import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            Now in Public Beta
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build Auth Faster
            <br />
            <span className="text-muted-foreground">Scale with Confidence</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            A complete authentication system with login, registration, password
            reset, email verification, and role-based access control. Built with
            Next.js 15, TypeScript, and PostgreSQL.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Secure by Default",
              description:
                "Industry-standard security with bcrypt hashing, JWT sessions, and CSRF protection.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description:
                "Built on Next.js 15 with React Server Components for optimal performance.",
            },
            {
              icon: Globe,
              title: "Deploy Anywhere",
              description:
                "Docker-ready with full support for Render, Vercel, and any cloud provider.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center rounded-xl border p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
