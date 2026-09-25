import type { Event } from "../types/event";

export const events: Event[] = [
  {
    id: 1,
    title: "Semana de Engenharia de Software",
    location: "Auditório A",
    date: "15 de outubro, 19h",
    capacity: 80,
    description: "Palestras e workshops sobre desenvolvimento de software.",
  },
  {
    id: 2,
    title: "Hackathon de Inteligência Artificial",
    location: "Laboratório 3",
    date: "20 de outubro, 08h",
    capacity: 0,
    description: "Maratona de programação voltada à IA.",
  },
  {
    id: 3,
    title: "Workshop de React & TypeScript",
    location: "Sala 204",
    date: "25 de outubro, 14h",
    capacity: 30,
    description:
      "Aprenda a construir interfaces modernas e fortemente tipadas.",
  },
  {
    id: 4,
    title: "Encontro da Comunidade Tech",
    location: "Área de Convivência",
    date: "30 de outubro, 18h",
    capacity: 50,
    description:
      "Networking e troca de experiências entre alunos e profissionais.",
  },
];
