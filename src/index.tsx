import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Fabric>
    <App />
  </Fabric>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
