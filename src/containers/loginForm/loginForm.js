import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import {localization} from '../../localizeReducer';
import {connect} from 'react-redux';
import { setEmail, setFormState } from './action';
import './loginForm.css';
import arrow from './arrow.svg';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValid: false,
      passValid: false,
    };
  }

  validateEmail = email => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regexp.test(email);
    this.setState({'emailValid': isValid});
    this.props.onSetEmail(email);
    return isValid;
  };

  validatePass = pass => {
    const isValid = pass.length >= 4;
    this.setState({'passValid': isValid});
    return isValid;
  };

  render() {
    const {strings, formState, email} = this.props;
    return (
      <div className="form">
        {formState === 'login' &&
          <>
            <h1 className="form__title">{strings.loginTitle}</h1>
            <Input lable={strings.email} validate={this.validateEmail} value={email}/>
            <Input lable={strings.password} validate={this.validatePass} pass={true}>
              <span className="form__recovery" onClick={() => this.props.onSetFormState('recover')}>{strings.switchToRecovery}</span>
            </Input>
            <Button lable={strings.loginButton}
              enabled={this.state.emailValid && this.state.passValid}
              onClick={() => this.props.onSetFormState('success')}
            />
          </>
        }
        {formState === 'recover' &&
          <>
            <h1 className="form__title">
              <img src={arrow} className="form__arrow" alt="back" onClick={() => this.props.onSetFormState('login')} />
              {strings.recoveryTitle}
            </h1>
            <Input lable={strings.email} validate={this.validateEmail} value={email} />
            <Button lable={strings.recoveryButton}
              enabled={this.state.emailValid}
              onClick={() => this.props.onSetFormState('recoverySent')}
            />
          </>
        }
        {formState === 'success' &&
          <>
            <h1 className="form__title">{strings.successTitle}</h1>
          </>
        }
        {formState === 'recoverySent' &&
          <>
            <h1 className="form__title">
              <img src={arrow} className="form__arrow" alt="back" onClick={() => this.props.onSetFormState('login')} />
              {strings.recoverySent}
            </h1>
          </>
        }
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSetEmail: PropTypes.func,
  onSetFormState: PropTypes.func,
  strings: PropTypes.object,
  formState: PropTypes.string,
  email: PropTypes.string,
};

const mapStateToProps = state => ({
  formState: state.getIn(['loginForm', 'formState']),
  email: state.getIn(['loginForm', 'email']),
});
const mapDispatchToProps = dispach => ({
  onSetEmail: email => dispach(setEmail(email)),
  onSetFormState: formState => dispach(setFormState(formState))
});

export default localization(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
