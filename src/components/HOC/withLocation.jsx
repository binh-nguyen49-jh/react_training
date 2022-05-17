import { useLocation } from 'react-router-dom';

const withLocation = (WrappedComponent) => (props) => {
  const location = useLocation();
  return (
    <WrappedComponent {...props} {...location.state}>
      {props.children}
    </WrappedComponent>
  );
};

export default withLocation;
