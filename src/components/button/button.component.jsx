// there are three different button styles: we can control buttons with styles
/*
 1)default button styling
 2)inverted button styling
 3)google sign in styling
*/
import './button.styles.scss'
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default Button;
