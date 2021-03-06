import './inputSearch.scss';
import { BsXSquare, BsSearch } from 'react-icons/bs';
import { useState } from 'react';

const InputSearch = ({handleSearch}) => {
  const [searchText, setSearchText] = useState('');
  const handleInputSearch = (event) => {
    if (event.charCode === 13) {
      handleSearch(event.target.value);
    }
  }
  const handleChange = (event) => {
    setSearchText(event.target.value);
  }
  const clearSearch = () => {
    setSearchText('');
    handleSearch('');
  }
  return (
    <div className='search-item'>
      <div className='search-item__icon'>
        <BsSearch/>
      </div>
      <input 
        className='search-item__input'
        placeholder='Start typing to filter the list...'
        value={searchText}
        onChange={handleChange}
        onKeyPress={handleInputSearch}/>
      {!!searchText.trim() &&
        <div className='search-item__clear' onClick={clearSearch} role="button">
          <BsXSquare/>
        </div>
      }
    </div>
  );
}

export default InputSearch;
