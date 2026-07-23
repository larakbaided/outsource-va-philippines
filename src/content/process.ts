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
      "We define the responsibilities, required skills, working hours, communication expectations, and ideal candidate profile.",
  },
  {
    number: 3,
    title: "Talent Matching",
    description:
      "We recommend the professional whose experience and working style best align with your needs.",
  },
  {
    number: 4,
    title: "Interview & Selection",
    description:
      "You meet your recommended candidate, ask questions, and decide whether the partnership feels right.",
  },
  {
    number: 5,
    title: "Onboarding & Support",
    description:
      "We help establish expectations, communication routines, and an organized start to the engagement.",
  },
];
