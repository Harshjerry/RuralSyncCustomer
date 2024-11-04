import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../redux/cartRedux';
import NavbarWhite from "../../components/NavbarWhite/NavbarWhite";
import './ServiceOptions.css';
import axios from 'axios';
import { debounce } from 'lodash'; // Import debounce

const ServiceOptions = () => {
  const { id: serviceId, serviceType } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5002/client/booking/service-provider');
        setServiceProviders(response.data.data);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchServiceProviders();
  }, []);

  const filterProviders = debounce(() => {
    if (serviceType && serviceProviders.length > 0) {
      const filtered = serviceProviders.filter(provider =>
        provider.serviceCompany && provider.serviceCompany.categories &&
        provider.serviceCompany.categories.some(category =>
          serviceType.toLowerCase().split(' ').some(word =>
            category.toLowerCase().includes(word.trim())
          )
        )
      );
      setFilteredProviders(filtered);
    } else {
      setFilteredProviders(serviceProviders);
    }
  }, 300); // Adjust delay as needed

  useEffect(() => {
    filterProviders();
    
    return () => {
      filterProviders.cancel(); // Clean up on unmount or when serviceType changes
    };
  }, [serviceType, serviceProviders]);

  const handleBook = (provider) => {
    dispatch(addBooking({
      serviceId,
      _id: provider._id,
      name: provider.name,
      service: provider.serviceCompany.categories.join(', '),
      price: provider.price,
      quantity: 1,
      img: provider.serviceCompany.img || '/arch.png', // Use '/arch.png' as default image
      rating: provider.serviceCompany.rating,
    }));
    
    navigate('/cart');
  };

  return (
    <>
      <NavbarWhite />
      <div className="service_options">
        <h1 className='show_res'>Showing Results for "{serviceType}"</h1>

        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div className="service_card" key={provider._id}>
              <div>
                <img
                  src={provider.serviceCompany.img || '/AR.png'} // Use '/arch.png' as default image
                  alt={provider.name}
                  className="provider_image"
                  onError={(e) => { e.target.src = '/arch.png'; }} // Fallback to /arch.png on error
                />
              </div>
              <div className="card_content">
                <h3 className="provider_name">{provider.name}</h3>
                <p className="provider_description">{provider.serviceCompany.description}</p>
                <p className="provider_rating">Rating: {provider.serviceCompany.rating} ⭐</p>
                <p className="provider_price">Price: ${provider.price}</p>
                <button className="book_button" onClick={() => handleBook(provider)}>BOOK</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no_results">
            <p>No service providers found for this service type.</p>
            <p>Try refining your search or checking other categories.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceOptions;
