import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../../router';
import Theme from './Theme';

function App(props) {
  const { version } = props;

  return (
    <Theme dark>
      <BrowserRouter>
        <React.Suspense fallback='Carregando...'>
          <Router version={version} />
        </React.Suspense>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
