import { fromJS } from 'immutable';
import {connect} from 'react-redux';

const possibleLocales = {
  en: 'EN',
  de: 'DE',
  ru: 'RU',
};
let browserLang = navigator.language.slice(0, 2);
browserLang = Object.keys(possibleLocales).includes(browserLang) ? browserLang : 'en';

const initialState = fromJS({
  possibleLocales,
  locale: browserLang,
  strings: {
    en: {
      loginTitle: 'Login',
      loginButton: 'Log in',
      email: 'email',
      password: 'password',
      switchToRecovery: 'Forgot password?',
      recoveryTitle: 'Recovery',
      recoveryButton: 'Recover your password',
      successTitle: 'Logging in...',
      recoverySent: 'Email sent',
    },
    de: {
      loginTitle: 'das Login',
      loginButton: 'Einloggen',
      email: 'email',
      password:'passwort',
      switchToRecovery: 'Passwort vergessen?',
      recoveryTitle: 'Passwort-Wiederherstellung',
      recoveryButton: 'Wiederherstellung',
      successTitle: 'Einloggen...',
      recoverySent: 'E-Mail gesendet',
    },
    ru: {
      loginTitle: 'Авторизация',
      loginButton: 'Авторизоваться',
      email: 'email',
      password:'пароль',
      switchToRecovery: 'Забыли пароль?',
      recoveryTitle: 'Восстановление пароля',
      recoveryButton: 'Восстановить',
      successTitle: 'Авторизация...',
      recoverySent: 'Письмо отправлено',
    }
  }
});

export const localizationReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_LANGUAGE':
    return state.set('locale', action.locale);
  default:
    return state;
  }
};

export const localization = connect(state => ({
  strings: state.getIn(
    ['localization', 'strings', state.getIn(
      ['localization', 'locale']
    )]
  ).toJS()
}));
