import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (

        <div className="container mt-5">
            <h5 className="text-center mb-5">Provide awesome <span style={{ color: '#7AB259' }}>services</span></h5>
            <div className=" row text-center">
                {
                    services.map(service => <Service key={service._id} service={service}></Service>)
                }

            </div>
        </div>

    );
};

export default Services;