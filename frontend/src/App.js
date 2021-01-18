import './App.css';
import React from 'react'
import Header from './components/Header'
import Action from './components/Action'
import Options from './components/Options'
import Option from './components/Option'
class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Header/>
        <Action/>
        <Options/>
        <Option/>
      </div>
    )
  }
}

export default App;
