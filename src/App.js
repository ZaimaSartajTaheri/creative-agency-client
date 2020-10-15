import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import MakeAdmin from './components/Admins/MakeAdmin/MakeAdmin';
import AddService from './components/Admins/AddService/AddService';
import Order from './components/Customers/Order/Order';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Review from './components/Customers/Review/Review';
import ServiceList from './components/Customers/ServiceList/ServiceList';
import AllOrders from './components/Admins/AllOrders/AllOrders';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
          <PrivateRoute path="/addService">
            <AddService></AddService>
          </PrivateRoute>
          <PrivateRoute path="/allOrders">
            <AllOrders></AllOrders>
          </PrivateRoute>:
          <PrivateRoute path="/addOrder/:serviceId">
            <Order></Order>
          </PrivateRoute>
          <PrivateRoute path="/addReview">
            <Review></Review>
          </PrivateRoute>
          <PrivateRoute path="/userServices">
            <ServiceList></ServiceList>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
