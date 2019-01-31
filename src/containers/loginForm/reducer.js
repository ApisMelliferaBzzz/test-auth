import { fromJS } from 'immutable';

const initialState = fromJS({
  email: '',
  formState: 'login',
});

const loginFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return state.set('email', action.email);
  case 'SET_FORM_STATE':
    return state.set('formState', action.formState);
  default:
    return state;
  }
};

export default loginFormReducer;
