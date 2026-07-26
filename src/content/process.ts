/** The five-step hiring/matching process. Edit steps and copy here. */

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Consultation",
    description:
      "We learn about your business, priorities, tools, challenges, and the type of support you need.",
  },
  {
    number: 2,
    title: "Role Definition",
    description:
      "We define the responsibilities, required skills, working hours, and communication expectations, then write it up and send it to you for sign-off.",
  },
  {
    number: 3,
    title: "Talent Matching",
    description:
      "We put at least two candidates in front of you within 14 days, matched on experience and working style.",
  },
  {
    number: 4,
    title: "Interview & Selection",
    description:
      "You interview the candidates and decide. You can decline and ask to see others.",
  },
  {
    number: 5,
    title: "Onboarding & Support",
    description:
      "We help establish expectations, communication routines, and an organized start to the engagement.",
  },
];
