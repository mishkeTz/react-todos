import React, { Component } from 'react';

import Todos from './containers/Todos';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todos />
      </div>
    );
  }
}

export default App;
