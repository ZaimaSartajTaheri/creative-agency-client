import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './SingleOrder.css'

const SingleOrder = (props) => {

    const { _id, name, email, service, details } = props.order;
    const [newStatus, setNewStatus] = useState(props.order);

    const handleStatusChange = (e) => {
        const status = e.target.value;

        fetch(`https://guarded-badlands-59559.herokuapp.com/updateStatus/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {

                    alert("Status Updated");
                }
            })
    }
    useEffect(() => {
        fetch(`https://guarded-badlands-59559.herokuapp.com/status/${_id}`)
            .then(res => res.json())
            .then(data => setNewStatus(data))
    }, [])

    return (
        <tr>

            <td>{name}</td>
            <td>{email}</td>
            <td>{service}</td>
            <td>{details}</td>
            <td>
                <select id="exampleFormControlSelect1" value={newStatus.status} onChange={handleStatusChange}>
                    <option style={{ color: '#FF4545' }} className='pending'>Pending</option>
                    <option style={{ color: '#FFBD3E' }} className='onGoing'>On Going</option>
                    <option style={{ color: '#009444' }} className='done'>Done</option>

                </select>

            </td>

        </tr>
    );
};

export default SingleOrder;