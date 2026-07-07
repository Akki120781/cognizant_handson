import { Component } from 'react';

class Home extends Component {
  render() {
    return <p>Welcome to the Home page of Student Management Portal</p>;
  }
}

class About extends Component {
  render() {
    return <p>Welcome to the About page of the Student Management Portal</p>;
  }
}

class Contact extends Component {
  render() {
    return <p>Welcome to the Contact page of the Student Management Portal</p>;
  }
}

export default function StudentApp() {
  return (
    <section className="panel">
      <h2>StudentApp</h2>
      <div className="stack">
        <Home />
        <About />
        <Contact />
      </div>
    </section>
  );
}
