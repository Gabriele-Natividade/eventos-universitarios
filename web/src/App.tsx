import type { Event } from "../types/event";

export const events: Event[] = [
  {
    id: 1,
    title: "Semana de Engenharia de Software",
    location: "Auditório A",
    date: "15 de outubro, 19h",
    capacity: 80,
    description: "Evento sobre tecnologia e engenharia de software.",
  },
  {
    id: 2,
    title: "Workshop de React",
    location: "Laboratório 02",
    date: "18 de outubro, 14h",
    capacity: 40,
    description: "Workshop introdutório sobre React e componentes.",
  },
  {
    id: 3,
    title: "Palestra sobre Inteligência Artificial",
    location: "Auditório Principal",
    date: "20 de outubro, 18h",
    capacity: 120,
    description:
      "Discussão sobre aplicações atuais de inteligência artificial.",
  },
  {
    id: 4,
    title: "Encontro de Desenvolvedores",
    location: "Sala 15",
    date: "25 de outubro, 16h",
    capacity: 30,
    description: "Encontro para troca de experiências entre estudantes.",
  },
];
