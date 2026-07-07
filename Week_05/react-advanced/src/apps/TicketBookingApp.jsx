import { useState } from 'react';

const flights = [
  { number: 'AI-101', from: 'Chennai', to: 'Delhi', fare: 6200 },
  { number: '6E-455', from: 'Bengaluru', to: 'Mumbai', fare: 5400 },
  { number: 'UK-808', from: 'Hyderabad', to: 'Pune', fare: 4100 }
];

function GuestPage() {
  return (
    <div>
      <h3>Guest Page</h3>
      <p>Browse flight details before logging in.</p>
      <FlightList showBooking={false} />
    </div>
  );
}

function UserPage() {
  return (
    <div>
      <h3>User Page</h3>
      <p>Book tickets from the available flights.</p>
      <FlightList showBooking />
    </div>
  );
}

function FlightList({ showBooking }) {
  return (
    <div className="flight-grid">
      {flights.map((flight) => (
        <article key={flight.number} className="flight-card">
          <h4>{flight.number}</h4>
          <p>{flight.from} to {flight.to}</p>
          <p>Fare: INR {flight.fare}</p>
          {showBooking && <button type="button">Book Ticket</button>}
        </article>
      ))}
    </div>
  );
}

export default function TicketBookingApp() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <section className="panel">
      <h2>ticketbookingapp</h2>
      <div className="button-row">
        {!loggedIn && <button type="button" onClick={() => setLoggedIn(true)}>Login</button>}
        {loggedIn && <button type="button" onClick={() => setLoggedIn(false)}>Logout</button>}
      </div>
      {loggedIn ? <UserPage /> : <GuestPage />}
    </section>
  );
}
