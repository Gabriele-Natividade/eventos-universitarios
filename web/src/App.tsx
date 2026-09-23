import { EventCard } from "./components/EventCard";

export default function App() {
  return (
    <main>
      <h1>Eventos universitários</h1>
      <EventCard
        title="Semana de Engenharia"
        location="Auditório A"
        date="15 de outubro, 19h"
      />
    </main>
  );
}
