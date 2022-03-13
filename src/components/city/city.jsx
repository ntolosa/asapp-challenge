import './city.scss';
import { useState } from 'react';
import usePreferences from '../../hooks/usePreferences';

const City = ({country, geonameid, name, selected = false, subcountry}) => {
  const [disabled, setDisabled] = useState(false);
  const { addPreference } = usePreferences();

  const handleSelection = async (event) => {
    setDisabled(true);
    const isChecked = event.target.checked;
    await addPreference(geonameid, isChecked);
    setDisabled(false);
  }
  return (
    <div className='city'>
      <div className='city__selection'>
        <input type="checkbox" checked={selected} onChange={handleSelection} disabled={disabled}/>
      </div>
      <div>
        <div>{name}</div>
        <div>{subcountry} - {country}</div>
      </div>
    </div>
  )
};

export default City;
