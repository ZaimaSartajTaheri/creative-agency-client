import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './Order.css';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    const [serviceData, setServiceData] = useState({})

    const { serviceId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/getServiceData/${serviceId}`)
            .then(res => res.json())
            .then(data => setServiceData(data))
    }, [])

    if (serviceData[0] != undefined) {
        var title = serviceData[0].title;
    }


    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("Pending");
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
        const formData = new FormData()

        if (file != null) {
            formData.append('file', file);
        }

        formData.append('name', info.name);
        formData.append('email', loggedInUser.email);
        if (serviceData[0] != undefined) {
            formData.append('service', serviceData[0].title);
            formData.append('serviceImage', serviceData[0].image.img);
            formData.append('serviceDescription', serviceData[0].description);
        }
        formData.append('details', info.details);
        formData.append('price', info.price);
        formData.append('status', status);



        fetch('http://localhost:5000/orderedService', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                history.replace("/userServices");
            })
            .catch(error => {

            })
    }
    return (
        <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9 col-sm-12 col-12 bg-white">
                <nav className="navbar navbar-expand-lg ">
                    <h3 className="navbar-brand">Order</h3>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h6>{loggedInUser.name}</h6>
                        </li>
                    </ul>
                </nav>
                <div className="order-right-part">

                    <form className="order-form" onSubmit={handleSubmit} >


                        <input onBlur={handleBlur} className="form-control" name="name" placeholder="Your name/company's name" />
                        <br />
                        <input className="form-control" name="email" defaultValue={loggedInUser.email} />
                        <br />

                        <input className="form-control" name="service" defaultValue={title} />
                        <br />
                        <textarea onBlur={handleBlur} className="form-control" name="details" placeholder="Project Details"  ></textarea>
                        <br />
                        <div className="form-row">
                            <div className="col">
                                <input onBlur={handleBlur} className="form-control" name="price" placeholder="Price" />

                            </div>

                            <div className="col">
                                <div className="project-upload-btn-wrapper">
                                    <button className="project-upload-btn"> <FontAwesomeIcon icon={faCloudUploadAlt} className="icon" /> Upload project file</button>
                                    <input onChange={handleFileChange} id="projectImage" type="file" />
                                </div>

                            </div>



                        </div>

                        <br></br>
                        <button type="submit" style={{ backgroundColor: '#111430', color: 'white' }} className="btn">Send</button>

                    </form>


                </div>

            </div>

        </div>

    );
};

export default Order;