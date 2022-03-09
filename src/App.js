import './App.scss';

function App() {
  return (
    <main className="challenge">
      <section>
        <div className='filters'>
          <input placeholder='Start typing to filter cities...'></input>
          <div>
            <button>Show all</button>
            <button>Show selected</button>
            <button className='filters__clear'>Clear selection</button>
          </div>
        </div>
      </section>
      <section>
        <div className='list'></div>
      </section>
    </main>
  );
}

export default App;
