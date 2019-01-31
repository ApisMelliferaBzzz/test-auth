import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false,
      res: 0,
    };
    this.input = React.createRef();
    this.timeout = null;
  }

  inputHandler = () => {
    clearTimeout(this.timeout);
    const res = this.props.validate(this.input.current.value);
    res
      ? this.setState({res: 1})
      : this.timeout = setTimeout(() => {
        this.setState({res: -1});
      }, 1000);
  }

  componentDidMount = () => {
    if (this.props.value) {
      this.input.current.value = this.props.value;
      const res = this.props.validate(this.input.current.value);
      this.setState({res: res ? 1 : -1});
    }
  }

  render() {
    return (
      <div className="form__group">
        <span className="form__lable">{this.props.lable}</span>
        {this.props.children}
        <input className={'form__input ' + (this.state.res === 1 ? 'form__input-success' : '') + (this.state.res === -1 ? 'form__input-error' : '')}
          type={this.props.pass ? 'password' : 'text'}
          ref={this.input}
          placeholder=''
          onInput={() => this.inputHandler()}
        />
      </div>
    );
  }
}

Input.propTypes = {
  validate: PropTypes.func,
  children: PropTypes.node,
  value: PropTypes.string,
  lable: PropTypes.string,
  pass: PropTypes.bool,
};

export default Input;
