import { useState } from 'react';

function CurrencyConvertor() {
  const [rupees, setRupees] = useState(0);
  const [euro, setEuro] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    setEuro((Number(rupees) / 90).toFixed(2));
  }

  return (
    <form className="converter" onSubmit={handleSubmit}>
      <label htmlFor="rupees">Indian Rupees</label>
      <input
        id="rupees"
        type="number"
        value={rupees}
        onChange={(event) => setRupees(event.target.value)}
      />
      <button type="submit">Convert</button>
      <p>Euro: {euro}</p>
    </form>
  );
}

export default function EventExamplesApp() {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  function sayHello() {
    setMessage('Hello member, counter updated successfully.');
  }

  function increment() {
    setCounter(counter + 1);
    sayHello();
  }

  function decrement() {
    setCounter(counter - 1);
  }

  function sayWelcome(text) {
    setMessage(text);
  }

  function handleSyntheticEvent() {
    setMessage('I was clicked');
  }

  return (
    <section className="panel">
      <h2>eventexamplesapp</h2>
      <p className="counter">Counter: {counter}</p>
      <div className="button-row">
        <button type="button" onClick={increment}>Increment</button>
        <button type="button" onClick={decrement}>Decrement</button>
        <button type="button" onClick={() => sayWelcome('welcome')}>Say Welcome</button>
        <button type="button" onClick={handleSyntheticEvent}>OnPress</button>
      </div>
      <p>{message}</p>
      <CurrencyConvertor />
    </section>
  );
}
