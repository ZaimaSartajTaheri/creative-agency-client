import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './AddService.css';

const AddService = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('description', info.description);

        fetch('https://guarded-badlands-59559.herokuapp.com/addServices', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                history.replace("/home");

            })
            .catch(error => {

            })
    }
    return (

        <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9 col-sm-12 col-12">
                <nav className="navbar navbar-expand-lg ">
                    <h3 className="navbar-brand">Add Service</h3>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h6>{loggedInUser.name}</h6>
                        </li>
                    </ul>
                </nav>
                <div className="service-right-part">
                    <div className=" serviceFormContainer mt-5">
                        <form className="service-form" onSubmit={handleSubmit} >

                            <label htmlFor="serviceTitle">Service Title</label>
                            <input onBlur={handleBlur} className="form-control" name="title" id="serviceTitle" />


                            <label htmlFor="Description">Description</label>
                            <textarea onBlur={handleBlur} className="form-control" name="description" id="Description"  ></textarea>



                            <div className="upload-btn-wrapper">
                                <label htmlFor="serviceImage">Icon</label>
                                <br></br>
                                <button className="upload-btn"> <FontAwesomeIcon icon={faCloudUploadAlt} className="icon" /> Upload image</button>
                                <input onChange={handleFileChange} id="serviceImage" type="file" required />
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-success">Submit</button>

                        </form>
                    </div>

                </div>

            </div>

        </div>

    );
};

export default AddService;