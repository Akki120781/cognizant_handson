const players = [
  { name: 'Rohit', score: 85 },
  { name: 'Gill', score: 62 },
  { name: 'Kohli', score: 91 },
  { name: 'Iyer', score: 48 },
  { name: 'Rahul', score: 76 },
  { name: 'Hardik', score: 66 },
  { name: 'Jadeja', score: 72 },
  { name: 'Ashwin', score: 44 },
  { name: 'Bumrah', score: 38 },
  { name: 'Siraj', score: 41 },
  { name: 'Shami', score: 55 }
];

const oddTeamPlayers = ['Sachin', 'Sehwag', 'Yuvraj'];
const evenTeamPlayers = ['Dravid', 'Ganguly', 'Dhoni'];
const t20Players = ['Raina', 'Karthik', 'Axar'];
const ranjiPlayers = ['Pujara', 'Rahane', 'Sarfaraz'];

function ListOfPlayers() {
  const lowScorePlayers = players.filter((player) => player.score < 70);

  return (
    <div className="split">
      <div>
        <h3>All Players</h3>
        <ul>
          {players.map((player) => (
            <li key={player.name}>{player.name} - {player.score}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Scores Below 70</h3>
        <ul>
          {lowScorePlayers.map((player) => (
            <li key={player.name}>{player.name} - {player.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IndianPlayers() {
  const [firstOdd, secondOdd, thirdOdd] = oddTeamPlayers;
  const [firstEven, secondEven, thirdEven] = evenTeamPlayers;
  const mergedPlayers = [...t20Players, ...ranjiPlayers];

  return (
    <div className="split">
      <div>
        <h3>Odd Team Players</h3>
        <p>{firstOdd}, {secondOdd}, {thirdOdd}</p>
        <h3>Even Team Players</h3>
        <p>{firstEven}, {secondEven}, {thirdEven}</p>
      </div>
      <div>
        <h3>Merged Players</h3>
        <ul>
          {mergedPlayers.map((player) => <li key={player}>{player}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default function CricketApp() {
  const flag = true;

  return (
    <section className="panel">
      <h2>cricketapp</h2>
      {flag ? <ListOfPlayers /> : <IndianPlayers />}
      <IndianPlayers />
    </section>
  );
}
