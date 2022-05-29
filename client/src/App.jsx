import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {ContextProvider} from './context/Context'
import Header from './components/Utilities/Header'
import Navigation from './components/Utilities/Navigation'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1230px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
  box-shadow: 0 0 50px #2B2B2B;
`;

function App() {
  return (
    <ContextProvider>
      <Router>
        <Container>
          <Header />
          <Navigation />
        </Container>
      </Router>
    </ContextProvider>
  );
}

export default App;
