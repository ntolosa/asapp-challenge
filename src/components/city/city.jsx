import './city.scss';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import { useState } from 'react';

const City = ({country, geonameid, name, selected = false, subcountry}) => {
  const { dispatch } = useCities();
  const [checked, setChecked] = useState(selected);
  const updatePriorities = (checked) => {
    dispatch({
      type: checked ? ACTION_TYPES.ADD_PREFERENCE : ACTION_TYPES.REMOVE_PREFERENCE,
      payload: geonameid,
    })
  }
  const handleSelection = async (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    try {
      await fetch('http://localhost:3030/preferences/cities', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [geonameid]: isChecked,
        }),
      });
      updatePriorities(isChecked);
    } catch(e) {
      console.error(e);
      updatePriorities(!isChecked);
    }
  }
  return (
    <div className='city'>
      <div className='city__selection'>
        <input type="checkbox" checked={checked} onChange={handleSelection}/>
      </div>
      <div>
        <div>{name}</div>
        <div>{subcountry} - {country}</div>
      </div>
    </div>
  )
};

export default City;
