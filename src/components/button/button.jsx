import './button.scss';

const Button = ({disabled, onClick, children}) => {
  return (
    <button 
      className={disabled ? 'button--disabled' : 'button'} 
      disabled={disabled}
      onClick={onClick}>
        {children}
    </button>
  );
}

export default Button;
