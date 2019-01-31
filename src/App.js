import React, { Component } from 'react';
import './App.css';
import LoginForm from './containers/loginForm/loginForm';
import SelectLanguage from './containers/selectLanguage/selectLanguage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm />
          <SelectLanguage />
        </header>
      </div>
    );
  }
}

export default App;
