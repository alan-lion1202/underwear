export function PageHeader({
  eyebrow,
  title,
  description,
  metric
}: {
  eyebrow: string;
  title: string;
  description: string;
  metric?: string;
}) {
  return (
    <header className="pageHeader">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {metric ? <div className="headerMetric">{metric}</div> : null}
    </header>
  );
}
