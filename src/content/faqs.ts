/**
 * Frequently asked questions. Wording is intentionally careful — no promised
 * timelines or guarantees. Edit here; these also feed FAQ schema markup.
 */

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What types of virtual assistants do you provide?",
    answer:
      "We provide experienced virtual professionals across GoHighLevel and CRM support, executive and administrative assistance, digital marketing, social media management, and project or operations support. During your consultation we identify which type of professional best fits your goals.",
  },
  {
    question: "How do you screen your professionals?",
    answer:
      "We select professionals based on relevant experience, demonstrated skills, and communication ability. Rather than matching a job title to a résumé, we look for people whose background and working style fit the way real businesses operate.",
  },
  {
    question: "Can I interview a candidate before deciding?",
    answer:
      "Yes. Before any engagement begins, you meet your recommended professional, ask questions, and decide whether the partnership feels right for your business.",
  },
  {
    question: "Do you provide part-time and full-time support?",
    answer:
      "We offer project-based, part-time, and full-time arrangements. The right option depends on your role scope, schedule, and priorities — something we'll discuss together during your consultation.",
  },
  {
    question: "Can your team work in my time zone?",
    answer:
      "Many of our professionals accommodate a range of working hours and time zones. Specific working-hour arrangements are confirmed during your consultation.",
  },
  {
    question: "What tools can your virtual professionals use?",
    answer:
      "Our professionals work across common business tools including GoHighLevel, Google Workspace, Microsoft 365, project management platforms, email and CRM systems, and social media and design tools. Specific tool experience is matched to your needs.",
  },
  {
    question: "How long does the matching process take?",
    answer:
      "Timelines vary depending on the role and availability. We focus on a thoughtful match rather than the fastest one. Specific timing will be discussed during your consultation.",
  },
  {
    question: "What happens if the selected professional is not the right fit?",
    answer:
      "If the match isn't working, let us know. We provide agency support throughout the partnership and will help address the situation. Specific arrangements will be discussed during your consultation.",
  },
  {
    question: "Do you offer project-based services?",
    answer:
      "Yes. For focused technical, CRM, automation, marketing, or setup work, we offer specialized project support with a clear scope and organized execution.",
  },
  {
    question: "How do I get started?",
    answer:
      "The best first step is a complimentary 30-minute consultation. We'll learn about your business, the tasks you'd like to delegate, and the kind of support that would help most — then recommend suitable next steps.",
  },
];

/** Scheduling-focused FAQs for the Book a Consultation page. */
export const bookingFaqs: Faq[] = [
  {
    question: "How long is the consultation?",
    answer:
      "The consultation is a complimentary 30-minute conversation. There's no pressure — it's simply a chance to understand your needs and whether we're a good fit.",
  },
  {
    question: "Who is the consultation for?",
    answer:
      "It's for business owners exploring virtual support who want to talk through their priorities, current systems, and the kind of professional who could help.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "It helps to have a rough sense of the tasks you'd like to delegate, the tools you use, and your preferred working schedule — but come as you are. We'll guide the conversation.",
  },
  {
    question: "Does booking a consultation commit me to anything?",
    answer:
      "No. Booking a consultation does not create any contractual or employment relationship. It's an informational conversation about your needs and possible next steps.",
  },
];
