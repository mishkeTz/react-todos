import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Todos from './containers/Todos';

library.add(faPlus)

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
