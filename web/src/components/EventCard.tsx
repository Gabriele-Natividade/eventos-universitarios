import type { Event } from "../types/event";

export function EventCard({
  title,
  location,
  date,
  capacity,
  id,
  description,
}: Event) {
  return (
    <article id={id.toString()}>
      <h2>{title}</h2>
      <p>{location}</p>
      <p>{date}</p>
      <p>Capacidade: {capacity}</p>
      {description && <p>{description}</p>}
    </article>
  );
}
