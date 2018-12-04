import React from 'react';
import './App.scss';

import { Application } from './Components/Application/Application.jsx';
import { BodyWidget } from './Components/Application/BodyWidget.jsx';

const App = () => {
  const app = new Application();
  return(
    <div>
      <BodyWidget app={app} />
    </div>
  )
}

export default App;
