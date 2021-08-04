import './App.css';
import styled from "styled-components";
import RoomList from './components/RoomList';
import GuestList from './components/GuestList';
import Guest from './components/Guest'
import Dashboard from './components/Dashboard';
import ConciergeList from './components/ConciergeList';
import Concierge from './components/Concierge';
import Navbar from './components/Navbar';
import ReviewList from './components/ReviewList';
import Review from './components/Review';
import Login from './components/Login';
import Room from './components/Room';
import PrivateRoute from './components/PrivateRoute';
import HorizontalBar from './components/HorizontalBar';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect, createContext } from 'react';

/* STYLED COMPONENTS */

const ContentWrapper = styled.div`
 display: flex;
`;

const HeaderTableWrapper = styled.div`
 flex:1
`;

/* FUNCTION APP */
export const AuthContext = createContext();

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [title,setTitle] = useState('Dashboard');
  const [navon,setNavon] = useState(true);

  const handleNavBar = () => {
    setNavon(!navon);
  }

  const handleTitle = (name) => {
    setTitle(name);
  }
  
  useEffect(() => {
    if (localStorage.getItem('authenticated')) {
      setAuthenticated(true);
    }
  }, []); 
  
  const authenticate = loggedIn => {
    setAuthenticated(loggedIn);
    if (loggedIn) {
      localStorage.setItem('authenticated', '1');
    } else {
      localStorage.removeItem('authenticated');
      setNavon(true);
    }
  };

 return (
    <div className="App">
      <ContentWrapper> 
        <AuthContext.Provider value={authenticated}>
          <Router>
            {navon ?
              <Navbar handleTitle = {handleTitle} /> : null
            }
           
            <HeaderTableWrapper>
              {authenticated ?
              <HorizontalBar authenticate={authenticate} name={title} handleNavBar={handleNavBar} navon={navon} />: null}

              <Switch>
                <PrivateRoute exact path="/roomlist">
                  <RoomList />
                </PrivateRoute> 

                <PrivateRoute exact path="/booking"> 
                  <GuestList />
                </PrivateRoute>

                <PrivateRoute exact path="/conciergelist">
                  <ConciergeList />
                </PrivateRoute>

                <PrivateRoute exact path="/reviews">
                  <ReviewList />
                </PrivateRoute>

                <Route exact path="/login">{!authenticated ?
                  <Login authenticate={authenticate} />  : <Redirect to="/dashboard"></Redirect>}
                </Route>

                <Route exact path="/register">{!authenticated ?
                  <Register />  : <Redirect to="/dashboard"></Redirect>}
                </Route>

                <PrivateRoute path="/roomlist/:id">
                  <Room />
                </PrivateRoute>

                <PrivateRoute path="/conciergelist/:id">
                  <Concierge />
                </PrivateRoute> 

                <PrivateRoute path="/booking/:id">
                  <Guest />
                </PrivateRoute>

                <PrivateRoute path="/reviews/:id">
                  <Review />
                </PrivateRoute>

                <PrivateRoute exact path="/dashboard">
                  <Dashboard />
                </PrivateRoute>

                <PrivateRoute exact path="/">
                  <Dashboard />
                </PrivateRoute> 

              </Switch>
            </HeaderTableWrapper>
          </Router>
        </AuthContext.Provider>
      </ContentWrapper>
    </div>
  );
}

export default App;
