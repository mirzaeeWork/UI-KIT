
const CustomButton = ({ className = '', children, ...rest }) => {
  return (
    <button
      className={`${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
