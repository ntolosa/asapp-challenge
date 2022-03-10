import './city.scss';

const City = ({country, name, subcountry}) => {
  return (
    <div className='city'>
      <div>{name}</div>
      <div>{country} - {subcountry}</div>
    </div>
  )
};

export default City;
