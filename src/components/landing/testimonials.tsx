const testimonials = [
  {
    quote:
      "The easiest authentication system I've ever set up. Everything just works out of the box.",
    author: "Sarah Chen",
    role: "Lead Developer",
  },
  {
    quote:
      "The admin dashboard is incredibly well-designed. Saved us weeks of development time.",
    author: "Marcus Johnson",
    role: "CTO",
  },
  {
    quote:
      "Docker support made deployment a breeze. We were live on Render in under 10 minutes.",
    author: "Emily Rodriguez",
    role: "DevOps Engineer",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by developers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hear what our users have to say about their experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-xl border p-6"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 border-t pt-4">
                <p className="text-sm font-semibold">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
