// == Import npm
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

// == Import assets
import './index.css';

// == Import components 
import Voting from './components/Voting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Voting />
  </React.StrictMode>
);
