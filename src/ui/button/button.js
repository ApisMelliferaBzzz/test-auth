import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = props => (
  <div className={'form__button ' + (!props.enabled && 'form__button-disabled')}
    onClick={() => props.enabled && props.onClick()}>
    {props.lable}
  </div>
);

Button.propTypes = {
  enabled: PropTypes.bool,
  onClick: PropTypes.func,
  lable: PropTypes.string,
};

export default Button;
