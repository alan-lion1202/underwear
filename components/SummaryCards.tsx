export function SummaryCards({ cards }: { cards: Array<{ label: string; value: string; note: string }> }) {
  return (
    <section className="summaryGrid" aria-label="Summary metrics">
      {cards.map((card) => (
        <article className="summaryCard" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
  );
}
