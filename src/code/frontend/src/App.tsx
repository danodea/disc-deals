import './App.css';

import { data } from './assets/data/wantlist';

function App() {
  return (
    <div className="App">
      <h1>Full Wantlist</h1>
      {Object.keys(data).map((entry) => {
        const item = data[Number(entry)];
        return (
          <a key={item.id}>
            {item.artist} - {item.albumName}
          </a>
        );
      })}
    </div>
  );
}

export default App;
