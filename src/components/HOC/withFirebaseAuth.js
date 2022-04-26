import {
  useAuth
} from "../../hooks/authentication";

const withFirebaseAuth = WrappedComponent => props => {
  const {
    user
  } = useAuth();
  return ( <
    WrappedComponent {
      ...props
    }
    user = {
      user
    }
    />
  );
};

export default withFirebaseAuth;