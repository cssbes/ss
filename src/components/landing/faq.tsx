import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I deploy to Render?",
    answer:
      "Push the code to GitHub, connect your repository in Render, and select the Docker deployment option. The render.yaml file is included for easy one-click deployment.",
  },
  {
    question: "Can I use a different database?",
    answer:
      "The project is configured for PostgreSQL with Prisma ORM. You can switch to SQLite, MySQL, or any other database Prisma supports by changing the datasource in schema.prisma.",
  },
  {
    question: "How do I configure email sending?",
    answer:
      "Set the SMTP_* environment variables in your .env file. The project supports any SMTP provider including Gmail, SendGrid, and Mailgun.",
  },
  {
    question: "Is it production ready?",
    answer:
      "Yes. The project includes proper security measures, input validation, error handling, and follows best practices for production deployments.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about the project.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
