import './filters.scss';

const Filters = () => {
  return (<section>
    <div className='filters'>
      <input placeholder='Start typing to filter cities...'></input>
      <div>
        <button>Show all</button>
        <button>Show selected</button>
        <button className='filters__clear'>Clear selection</button>
      </div>
    </div>
  </section>);
}

export default Filters;
