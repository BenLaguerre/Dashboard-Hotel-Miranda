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
import NewRoom from './components/NewRoom';
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
`
const HeaderTableWrapper = styled.div`
 flex:1
`

/* FUNCTION APP */
export const AuthContext = createContext();

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [title,setTitle] = useState('Dashboard');
  const [navon,setNavon] = useState(  window.innerWidth > 930);
  
  let storage = localStorage.getItem('authenticated');
  
  useEffect(() => {
    function handleResize() {
      window.innerWidth <= 930 ? setNavon(false) : setNavon(true);
      document.body.classList.remove('noscroll');
    }
    window.addEventListener('resize', handleResize)

    if (localStorage.getItem('authenticated')) {
      setAuthenticated(true);
    }
  }, []); 

  const handleNavBar = () => {
    setNavon(!navon);
    if (!navon){
      if (window.innerWidth <= 930 ) { 
        if ( document.body.classList.value === 'noscroll'){
          document.body.classList.remove('noscroll');
        }else {
          document.body.classList.add('noscroll');
        }
      }
    }else {
      document.body.classList.remove('noscroll');
    }
  }

  const handleTitle = name => {
    setTitle(name);
  }
  
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
        <AuthContext.Provider value={storage}>
          <Router>
            {navon && authenticated ?
            <Navbar handleNavBar= {handleNavBar} /> : null
            }
           
            <HeaderTableWrapper>
              {authenticated ?
              <HorizontalBar authenticate={authenticate} name={title} handleNavBar={handleNavBar} navon={navon} />: null}

              <Switch>
                <PrivateRoute exact path="/roomlist">
                  <RoomList title={handleTitle} />
                </PrivateRoute> 

                <PrivateRoute exact path="/roomlist/newroom">
                  <NewRoom title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute exact path="/booking"> 
                  <GuestList title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute exact path="/conciergelist">
                  <ConciergeList title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute exact path="/reviews">
                  <ReviewList title={handleTitle} />
                </PrivateRoute>

                <Route exact path="/login">{!authenticated ?
                  <Login authenticate={authenticate} />  : <Redirect to="/dashboard" />}
                </Route>

                <Route exact path="/register">{!authenticated ?
                  <Register />  : <Redirect to="/dashboard" />}
                </Route>

                <PrivateRoute path="/roomlist/:id">
                  <Room  title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute path="/conciergelist/:id">
                  <Concierge  title={handleTitle} />
                </PrivateRoute> 

                <PrivateRoute path="/booking/:id">
                  <Guest title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute path="/reviews/:id">
                  <Review title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute exact path="/dashboard">
                  <Dashboard  title={handleTitle} />
                </PrivateRoute>

                <PrivateRoute exact path="*">
                  <Redirect to="/dashboard" />
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
