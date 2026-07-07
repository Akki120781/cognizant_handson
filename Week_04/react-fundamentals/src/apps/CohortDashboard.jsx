import styles from './CohortDetails.module.css';

const cohorts = [
  {
    code: 'DN-FSE-01',
    name: 'Java FSE Deep Skilling',
    startDate: '09-Jun-2026',
    status: 'ongoing'
  },
  {
    code: 'DN-WEB-02',
    name: 'Frontend Upskilling',
    startDate: '18-May-2026',
    status: 'completed'
  },
  {
    code: 'DN-CLOUD-03',
    name: 'Cloud Foundation',
    startDate: '02-Jul-2026',
    status: 'ongoing'
  }
];

function CohortDetails({ cohort }) {
  const headingStyle = {
    color: cohort.status === 'ongoing' ? 'green' : 'blue'
  };

  return (
    <div className={styles.box}>
      <h3 style={headingStyle}>{cohort.name}</h3>
      <dl>
        <dt>Code</dt>
        <dd>{cohort.code}</dd>
        <dt>Start Date</dt>
        <dd>{cohort.startDate}</dd>
        <dt>Status</dt>
        <dd>{cohort.status}</dd>
      </dl>
    </div>
  );
}

export default function CohortDashboard() {
  return (
    <section className="panel">
      <h2>Cohort Details</h2>
      <div className="cohort-row">
        {cohorts.map((cohort) => (
          <CohortDetails key={cohort.code} cohort={cohort} />
        ))}
      </div>
    </section>
  );
}
