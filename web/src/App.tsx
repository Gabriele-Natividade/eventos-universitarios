import { useState } from "react";
import { events } from "./data/events";
import { EventCard } from "./components/EventCard";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontFamily: "sans-serif", marginBottom: "24px" }}>
        Lista de Eventos
      </h1>

      <button onClick={() => setCount(count + 1)}>Cliquei {count} vezes</button>

      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          capacity={event.capacity}
          id={event.id}
          description={event.description}
        />
      ))}
    </main>
  );
}
