// == Import npm
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

// == Import assets
import './index.css';

// == Import components 
import { EthProvider } from './contexts/EthContext'
import Voting from './components/Voting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EthProvider>
        <Voting />
    </EthProvider>
);
