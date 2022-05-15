import { useAuth } from '../../hooks/authentication';

const withFirebaseAuth = (WrappedComponent) => (props) => {
  const auth = useAuth();
  return (
    <WrappedComponent {...props} {...auth}>
      {props.children}
    </WrappedComponent>
  );
};

export default withFirebaseAuth;
