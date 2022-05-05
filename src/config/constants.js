export const POSITIONS = {
  'FE developer': {
    name: 'FE developer',
    icon: 'FE',
    color: '#f8fc03',
  },
  'BE developer': {
    name: 'BE developer',
    icon: 'BE',
    color: '#048c16',
  },
  Fullstack: {
    name: 'Fullstack',
    icon: 'FS',
    color: '#3903ff',
  },
  Designers: {
    name: 'Designers',
    icon: 'De',
    color: '#f23fda',
  },
  Admin: {
    name: 'Admin',
    icon: 'Ad',
    color: '#ff264a',
  },
  HR: {
    name: 'HR',
    icon: 'HR',
    color: '#000000',
  },
  BA: {
    name: 'BA',
    icon: 'BA',
    color: '#fc7f0a',
  },
  PM: {
    name: 'PM',
    icon: 'PM',
    color: '#633000',
  },
  Testers: {
    name: 'Testers',
    icon: 'Te',
    color: '#ff1f1f',
  },
};

export const MAX_IMAGE_INPUTS = 4;

export const AUTH_ERROR_MESSAGES = {
  'auth/admin-restricted-operation':
    'You are not authorized to perform this action',
  'auth/argument-error': 'An invalid argument was provided',
  'auth/app-not-authorized':
    'This app is not authorized to use Firebase Authentication',
  'auth/app-not-installed':
    'The requested mobile application corresponding to the provided API key is not installed on this device',
  'auth/cors-unsupported': 'This browser is not supported.',
  'auth/credential-already-in-use':
    'This credential is already associated with a different user account.',
  'auth/dependent-sdk-initialized-before-auth':
    'A dependent SDK must be initialized before the Firebase Auth SDK',
  'auth/email-change-needs-verification':
    'Email change cannot be applied. Please verify your email first.',
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/expired-action-code': 'The action code has expired. ',
  'auth/internal-error': 'An internal error has occurred.',
  'auth/invalid-api-key':
    'Your API key is invalid, please check you have copied it correctly.',
  'auth/invalid-app-id':
    'The mobile app identifier is not registered for the current project.',
  'auth/invalid-user-token':
    "The user's credential is no longer valid. The user must sign in again.",
  'auth/invalid-auth-event': 'An internal error has occurred.',
  'auth/invalid-continue-uri':
    'The continue URL provided in the request is invalid.',
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/invalid-credential':
    'The supplied auth credential is malformed or has expired.',
  'auth/invalid-action-code':
    'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
  'auth/wrong-password': 'The password is invalid.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
  'auth/network-request-failed':
    'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
  'auth/null-user':
    'A null user object was provided as the argument for an operation which requires a non-null user object.',
  'auth/no-auth-event': 'An internal error has occurred.',
  'auth/no-such-provider':
    'User was not linked to an account with the given provider.',
  'auth/timeout': 'The operation has timed out.',
  'auth/user-token-expired':
    "The user's credential is no longer valid. The user must sign in again.",
  'auth/too-many-requests':
    'We have blocked all requests from this device due to unusual activity. Try again later.',
  'auth/unauthorized-continue-uri':
    'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
  'auth/unverified-email':
    'There was an error while trying to verify the email address.',
  'auth/user-cancelled':
    'User did not grant your application the permissions it requested.',
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/user-disabled':
    'The user account has been disabled by an administrator.',
  'auth/user-mismatch':
    'The supplied credentials do not correspond to the previously signed in user.',
  'auth/user-signed-out': 'The user has already signed out.',
  'auth/weak-password': 'The password must be 6 characters long or more.',
  'auth/web-storage-unsupported': 'This browser is not supported.',
  'auth/already-initialized':
    'The Firebase Auth instance has already been initialized.',
};

export const MODAL_POSITION_STYLES = {
  'top-left': (space) => ({
    top: '0',
    left: '0',
    transform: 'translate(0, -100%)',
    paddingBottom: space,
  }),
  'top-right': (space) => ({
    top: '0',
    right: '0',
    transform: 'translate(0, -100%)',
    paddingBottom: space,
  }),
  'bottom-left': (space) => ({
    bottom: '0',
    left: '0',
    transform: 'translate(0, 100%)',
    paddingTop: space,
  }),
  'bottom-right': (space) => ({
    bottom: '0',
    right: '0',
    transform: 'translate(0, 100%)',
    paddingTop: space,
  }),
  center: (space) => ({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: space,
  }),
};
