import {
  Lock,
  Mail,
  UserCog,
  Database,
  Palette,
  Layout,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Lock,
    title: "Authentication",
    description:
      "Login, register, forgot password, reset password, and email verification out of the box.",
  },
  {
    icon: UserCog,
    title: "Role Management",
    description:
      "Full RBAC with admin and user roles. Protect routes and components with ease.",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description:
      "Automated emails for password reset, email verification, and account notifications.",
  },
  {
    icon: Database,
    title: "PostgreSQL + Prisma",
    description:
      "Type-safe database access with Prisma ORM and PostgreSQL for reliable data storage.",
  },
  {
    icon: Palette,
    title: "Dark Mode",
    description:
      "Built-in dark mode support with next-themes. Seamless switching between light and dark themes.",
  },
  {
    icon: Layout,
    title: "Admin Dashboard",
    description:
      "Full admin dashboard with CRUD operations, user management, and detailed analytics.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-muted-foreground">
            A complete authentication and user management system ready for
            production.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
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
