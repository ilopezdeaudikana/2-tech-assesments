import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TreePage, Four04Page, HomePage } from './pages';
import { store } from './store/store';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  color: #444;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div data-testid='App'>
          <header>
            <nav>
              <ul className='nav'>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/tree'>Tree</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Wrapper>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/tree' component={TreePage} />
              <Route component={Four04Page} />
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
