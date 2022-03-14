import './buttonGroup.scss';

const ButtonGroup = ({buttons, handleClick}) => {
  const onClick = (button) => {
    handleClick(button);
  }
  return(
    <>
      {
        buttons.map((button, i) => (
          <button 
            key={i}
            disabled={button.selected}
            onClick={()=>onClick(button)}>
              {button.name}
          </button>
        ))
      }
    </>
  );
}

export default ButtonGroup;