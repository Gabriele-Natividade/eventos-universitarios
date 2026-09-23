type EventCardProps = {
  title: string;
  location: string;
  date: string;
};

export function EventCard({ title, location, date }: EventCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{location}</p>
      <p>{date}</p>
    </article>
  );
}
