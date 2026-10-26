/**
 * Frequently asked questions. Wording is intentionally careful — no promised
 * timelines or guarantees. Edit here; these also feed FAQ schema markup.
 *
 * Any answer quoting a rate or payment term must read it from
 * @/content/pricing (the single source), never hardcode the number.
 */

import {
  activationFee,
  lowestFullTimeUsd,
  lowestMonthlyUsd,
  monthHours,
  projectFloorUsd,
  usd,
} from "@/content/pricing";

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
    question: "Do you work with businesses in the United States?",
    answer:
      "Yes. Most of the businesses we support are based in the United States. Our Filipino virtual professionals are experienced working remotely with US companies, and we coordinate communication, tools, and working hours around your team.",
  },
  {
    question: "How much does a Filipino virtual assistant cost?",
    answer: `Cost depends on specialization, experience, hours and engagement type. Our rates are published: part-time months start at ${usd(lowestMonthlyUsd)} and full-time at ${usd(lowestFullTimeUsd)}. Scoped projects are quoted per outcome, from ${usd(projectFloorUsd)}. The full card is on our pricing page.`,
  },
  {
    question: "How does payment work?",
    answer: `${activationFee.terms} ${activationFee.refundCondition} After that you pay your first month in advance once you've chosen your professional, then monthly in advance by card or ACH. Either side can end an engagement with 30 days' written notice, with no exit fee.`,
  },
  {
    question: "Why hire a virtual assistant from the Philippines?",
    answer:
      "The Philippines has a large, experienced remote-work workforce with strong English proficiency and a professional service culture. For US businesses, that means dependable support, clear communication, and cost efficiency compared with hiring locally — without compromising on skill.",
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
    answer: `Yes. A part-time month is ${monthHours.partTime} hours. A full-time month is ${monthHours.fullTime} hours, in your working hours. We also take scoped projects, quoted per outcome. Rates for all three are on our pricing page.`,
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
      "Tell us. We support the partnership throughout and will help you address it. Replacement support is set out in your services agreement.",
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
