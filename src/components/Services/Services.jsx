import React from 'react';
import './Services.css';
import Service from '../Service/Service';

const Services = ({ services }) => {
  return (
    <div className='service_section'>
      <div className='services'>
        {services.map((service) => (
          <Service key={service._id} service={service} /> 
        ))}
      </div>
    </div>
  );
};

export default Services;
