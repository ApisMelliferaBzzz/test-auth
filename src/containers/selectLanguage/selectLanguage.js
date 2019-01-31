import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './selectLanguage.css';
import {setLanguage} from './actions';

class SelectLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.timer = null;
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleSetLanguage = locale => {
    this.setState({open: false});
    this.props.onSetLanguage(locale);
  }

  handleMouseEnter = () => {
    clearTimeout(this.timer);
  }

  handleMouseLeave = () => {
    if (this.state.open) this.timer = setTimeout(() => {
      this.setState({open: false});
    }, 1000);
  }

  render() {
    const {possibleLocales, locale} = this.props;

    return (
      <div className="set_language" onClick={this.handleToggle}>
        <span className="set_language__lable">{possibleLocales[locale]}</span>
        <div className={'set_language__dropdown ' + (this.state.open && 'set_language__dropdown-active')}>
          {Object.entries(possibleLocales).map(([key, value], id) =>
            key !== locale &&
              <div className="set_language__select"
                key={id}
                onClick={() => this.handleSetLanguage(key)}
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}
              >{value}
              </div>
          )}
        </div>
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  onSetLanguage: PropTypes.func,
  possibleLocales: PropTypes.object,
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  possibleLocales: state.getIn(['localization', 'possibleLocales']).toJS(),
  locale: state.getIn(['localization', 'locale']),
});
const mapDispatchToProps = dispatch => ({
  onSetLanguage: locale => dispatch(setLanguage(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
