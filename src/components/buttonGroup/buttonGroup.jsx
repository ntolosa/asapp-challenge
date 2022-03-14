import './buttonGroup.scss';
import Button from '../button/button';

const ButtonGroup = ({buttons, handleClick}) => {
  const onClick = (button) => {
    handleClick(button);
  }
  return(
    <div className='button-group'>
      {
        buttons.map((button, i) => (
          <Button 
            key={i}
            disabled={button.selected}
            onClick={()=>onClick(button)}>
              {button.name}
          </Button>
        ))
      }
    </div>
  );
}

export default ButtonGroup;