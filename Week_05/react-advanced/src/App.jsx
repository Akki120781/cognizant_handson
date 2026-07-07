import CricketApp from './apps/CricketApp.jsx';
import OfficeSpaceRentalApp from './apps/OfficeSpaceRentalApp.jsx';
import EventExamplesApp from './apps/EventExamplesApp.jsx';
import TicketBookingApp from './apps/TicketBookingApp.jsx';
import BloggerApp from './apps/BloggerApp.jsx';

export default function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">React Hands-on</p>
        <h1>Week 05 React Advanced</h1>
      </header>

      <CricketApp />
      <OfficeSpaceRentalApp />
      <EventExamplesApp />
      <TicketBookingApp />
      <BloggerApp />
    </main>
  );
}
