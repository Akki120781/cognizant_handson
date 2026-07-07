import '../stylesheets/mystyle.css';

function CalculateScore({ name, school, total, goal }) {
  const average = (total / goal).toFixed(2);

  return (
    <div className="score-card">
      <h3>Student Score Calculator</h3>
      <dl>
        <dt>Name</dt>
        <dd>{name}</dd>
        <dt>School</dt>
        <dd>{school}</dd>
        <dt>Total</dt>
        <dd>{total}</dd>
        <dt>Goal</dt>
        <dd>{goal}</dd>
        <dt>Average</dt>
        <dd>{average}</dd>
      </dl>
    </div>
  );
}

export default function ScoreCalculatorApp() {
  return (
    <section className="panel">
      <h2>scorecalculatorapp</h2>
      <CalculateScore name="Akshat Soni" school="Cognizant Academy" total={480} goal={5} />
    </section>
  );
}
