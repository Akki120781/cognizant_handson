import MyFirstReact from './apps/MyFirstReact.jsx';
import StudentApp from './apps/StudentApp.jsx';
import ScoreCalculatorApp from './apps/ScoreCalculatorApp.jsx';
import BlogApp from './apps/BlogApp.jsx';
import CohortDashboard from './apps/CohortDashboard.jsx';

export default function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">React Hands-on</p>
        <h1>Week 04 React Fundamentals</h1>
      </header>

      <MyFirstReact />
      <StudentApp />
      <ScoreCalculatorApp />
      <BlogApp />
      <CohortDashboard />
    </main>
  );
}
