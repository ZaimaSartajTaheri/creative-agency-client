import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './MakeAdmin.css';

const MakeAdmin = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        fetch('https://guarded-badlands-59559.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    history.replace("/allOrders");
                }

            })
    };
    return (
        <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9 col-sm-12 col-12 bg-white">
                <div id="content">
                </div>
                <nav className="navbar navbar-expand-lg ">
                    <h3 className="navbar-brand">Add Admin</h3>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h6>{loggedInUser.name}</h6>
                        </li>
                    </ul>
                </nav>
                <div className="admin-right-part">
                    <div className=" adminFormContainer mt-5">
                        <form className="admin-form" onSubmit={handleSubmit(onSubmit)} >

                            <label htmlFor="eventTitle">Email</label><br></br>
                            <input className="input-box" name="email" placeholder=" join@gmail.com" id="eventTitle" ref={register({ required: true })} />
                            {errors.name && <span className="error">Field is required</span>}
                            <input style={{ height: '40px' }} className="btn btn-success ml-2 mb-1" type="Submit" />
                        </form>
                    </div>

                </div>

            </div>

        </div>


    );
};

export default MakeAdmin;