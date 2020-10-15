import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../utilities/images/logos/logo.png'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCalendar, faShoppingCart, faUserPlus, faShoppingBasket, faCommentDots, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';


const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://guarded-badlands-59559.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {

                setIsAdmin(data);
            });
    }, [])

    

    return (
      <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4 " style={{ height: "100vh" }}>

      <ul className="list-unstyled">
          <li>
              <Link className="navbar-brand" to="/home"><img style={{ height: '50px' }} src={logo} alt="" /></Link>
          </li>

          {isAdmin ? <div>
              <li>
                  <Link className="sidebar-link" to="/allOrders">
                      <FontAwesomeIcon icon={faShoppingBasket} /> <span>Service List</span>
                  </Link>
              </li>
              <li>
                  <Link className="sidebar-link" to="/addService">
                      <FontAwesomeIcon icon={faPlus} /> <span>Add Service</span>
                  </Link>
              </li>
              <li>
                  <Link className="sidebar-link" to="/makeAdmin">
                      <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                  </Link>
              </li>

          </div> : <div>
                  <li>
                      <Link className="sidebar-link" to="/home">
                          <FontAwesomeIcon icon={faShoppingCart} /> <span>Order</span>
                      </Link>
                  </li>
                  <li>
                      <Link className="sidebar-link" to="/userServices">
                          <FontAwesomeIcon icon={faShoppingBasket} /> <span>Service List</span>
                      </Link>
                  </li>

                  <li>
                      <Link className="sidebar-link" to="/addReview">
                          <FontAwesomeIcon icon={faCommentDots} /> <span>Review</span>
                      </Link>
                  </li>
              </div>}


      </ul>
      <div>
          <Link className="sidebar-link" to="/home" onClick={() => { setLoggedInUser({}) }}><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
      </div>
  </div>
    );
};

export default Sidebar;