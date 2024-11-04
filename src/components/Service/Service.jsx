import React from 'react';
import './Service.css';
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
  return (
    <div className='service'>
      <div className='service_thumbnail'>
        {service.images.length > 0 ? (
          <img src={service.images[0]} alt={service.name} className='service_image' /> // Using the first image if available
        ) : (
          <div className='no_image'>No Image Available</div> // Placeholder if no image is available
        )}
      </div>
      <div className='service_info'>
        <div className='service_info_cont1'>
          {/* Link now navigates using both service ID and category */}
          <Link
            to={`/servicesOption/${service._id}/${service.category}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 className='service_name'>{service.name}</h3> {/* Updated from title to name */}
          </Link>
          <h4 className='service_instructor'>Description: {service.description}</h4> {/* Use description instead of instructorId */}
        </div>
      </div>
    </div>
  );
};

export default Service;
