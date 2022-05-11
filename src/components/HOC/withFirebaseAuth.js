import { useAuth } from '../../hooks/authentication';

const withFirebaseAuth = (WrappedComponent) => (props) => {
  const { user } = useAuth();
  return <WrappedComponent {...props} user={user}>
    {props.children}
  </WrappedComponent>;
};

export default withFirebaseAuth;
