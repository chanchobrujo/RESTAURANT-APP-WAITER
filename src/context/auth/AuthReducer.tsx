import {UserResponse} from '../../model/response/entity/UserResponse';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  mydata: UserResponse | null;
  errorMessage: string;
}

type AuthAction =
  | {type: 'myData'; payload: {mydata: UserResponse}}
  | {type: 'signUp'; payload: {token: string}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'authFailed'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'myData':
      return {
        ...state,
        mydata: action.payload.mydata,
      };
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
      };

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
      };

    default:
      return state;
  }
};
