import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavbarWhite from "../components/NavbarWhite/NavbarWhite";
import Announcement from "../components/announcement";
import { useSelector, useDispatch } from "react-redux";
import { addBooking, removeBooking } from "../redux/cartRedux";
import axios from "axios";
import { mobile } from "./../responsive";

// Styled components
const Container = styled.div`
  padding: 20px;
  margin-top: 12vh;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === "filled" ? "none" : "1px solid black")};
  background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4vh;
  padding-left: 4vh;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  display: flex;
  gap: 5vh;
  flex-direction: column;
`;

const Booking = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BookingDetail = styled.div`
  flex: 2;
  display: flex;
`;

const ImageWrapper = styled.div`
  width: 15vw;
  height: 20vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "none" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BookingName = styled.span``;

const BookingId = styled.span``;

const Provider = styled.span`
  font-weight: bold;
  color: black;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: gold;
  margin-right: 5px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Visits = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const Remove = styled.div`
  font-size: 24px;
  margin: 5px;
  color: #73445b;
  cursor: pointer;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Warn = styled.span`
  color: red;
  margin-bottom: 40px;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [bookings, setBookings] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if (cart && Array.isArray(cart.bookings)) {
      setBookings(cart.bookings);
    } else {
      setBookings([]);
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, [cart]);

  const handleRemoveBooking = (booking) => {
    dispatch(removeBooking({ ...booking, quantity: 1 }));
  };

  const handleCheckout = async () => {
    if (bookings.length > 0 && userLocation) {
        try {
            const bookingDate = new Date().toISOString().split('T')[0]; // Format the date correctly
            const bookingTime = "10:00 AM";
            const bookingData = {
                clientId: currentUser.data._id,
                serviceId: bookings[0].serviceId,
                bookingDate: bookingDate, // Ensure this is formatted correctly
                bookingTime: bookingTime,
                location: {
                    type: "Point",
                    coordinates: [userLocation.longitude, userLocation.latitude],
                },
            };

            console.log("Booking data to be sent:", bookingData); // Log the booking data

            const response = await axios.post(
              "http://localhost:5002/client/booking/book2",
              bookingData // Send directly if it expects a single object
          );
          

            console.log("Booking posted successfully:", response.data);
            alert("Booking Done Successfully, Agent on the way");
            handleRemoveBooking(bookings[0]);
        } catch (error) {
            if (error.response) {
                console.error("Error posting booking:", error.response.data);
                alert(`Failed to book the service: ${error.response.data.message || error.response.data}`);
            } else {
                console.error("Error posting booking:", error.message);
                alert("Failed to book the service. Please try again.");
            }
        }
    } else {
        alert("No bookings found or location not available.");
    }
};


  return (
    <>
      <NavbarWhite />
      <Announcement />
      <Container>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => console.log('Continue Shopping')}>CHECK MORE SERVICES</TopButton>
        </Top>
        <Bottom>
          <Info>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Booking key={booking._id}>
                  <BookingDetail>
                    <ImageWrapper>
                      <Image src={booking.img} alt={booking.service} />
                    </ImageWrapper>
                    <Details>
                      <BookingName>
                        <b>Booking:</b> {booking.service}
                      </BookingName>
                      <BookingId>
                        <b>ID:</b> {booking._id}
                      </BookingId>
                      <Provider>
                        <b>Provider:</b> {booking.name}
                      </Provider>
                      <Rating>
                        <b>Rating:</b>
                        {booking.rating}
                      </Rating>
                    </Details>
                  </BookingDetail>
                  <PriceDetail>
                    <ProductPrice>${booking.price}</ProductPrice>
                    <Remove onClick={() => handleRemoveBooking(booking)}>Remove</Remove>
                  </PriceDetail>
                </Booking>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total || 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${(cart.total || 0) + 5.9}</SummaryItemPrice>
            </SummaryItem>
            {display === "block" && (
              <Warn>You have not filled your location</Warn>
            )}
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Container>
    </>
  );
};

export default Cart;
