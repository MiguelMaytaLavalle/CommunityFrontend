import './App.css';
import './Bootstrap.css'
import React, {Component} from 'react';
import ViewController from './components/viewControl/ViewController';

class App extends Component{
  render(){
    return (
        <div className="App">
          <ViewController/>
        </div>
    );
  }
}

export default App;
