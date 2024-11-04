import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch } from "react-redux"; // Import useDispatch
import { login } from "./../redux/apiCalls"; // Import the login function

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2a223d;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 19%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  z-index: 555;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 55;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleClick = async (e) => {
    e.preventDefault();

    // Create a user object to send
    const user = {
      username,
      email,
      password,
      role,
    };

    // Call the login function with dispatch and user object
    await login(dispatch, user);

    // After login, you can add a check for currentUser in the Redux state
    // and navigate if successful, otherwise handle error accordingly
    // (Assuming you have access to the Redux state here)
    // For now, assuming successful login and navigating to home
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Img src="/frames.png" alt="Background" />

      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Role" onChange={(e) => setRole(e.target.value)} />
            <Button onClick={handleClick}>LOGIN</Button>
            <StyledLink to="/register">CREATE A NEW ACCOUNT</StyledLink>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
