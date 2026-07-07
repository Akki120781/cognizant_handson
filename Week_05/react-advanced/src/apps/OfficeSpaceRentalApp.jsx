const officeSpaces = [
  {
    id: 1,
    name: 'DBS Business Center',
    rent: 50000,
    address: 'Chennai OMR',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Tech Park Workspace',
    rent: 72000,
    address: 'Bengaluru Whitefield',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Metro Office Suites',
    rent: 61000,
    address: 'Hyderabad HITEC City',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
  }
];

export default function OfficeSpaceRentalApp() {
  const heading = <h2>Office Space Rental App</h2>;

  return (
    <section className="panel">
      {heading}
      <div className="office-grid">
        {officeSpaces.map((office) => {
          const rentStyle = {
            color: office.rent < 60000 ? 'red' : 'green',
            fontWeight: 700
          };

          return (
            <article key={office.id} className="office-card">
              <img src={office.image} alt={office.name} />
              <h3>{office.name}</h3>
              <p style={rentStyle}>Rent: INR {office.rent}</p>
              <p>{office.address}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
