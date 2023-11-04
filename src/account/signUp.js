import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom"; // You may need to import Link for navigation

import "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const SignUp = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  const handleSignUp = () => {
    if (email === "") {
      toast("Enter Valid email", {
        type: "warning",
      });
    } else if (password === "") {
      toast("Enter Valid password", {
        type: "warning",
      });
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          context.setUser({ email: user.email, uid: user.uid });

          // Fetch user details from the API and update context
          fetchUserDetails(user.email);
        })
        .catch((error) => {
          console.log(error);
          toast(error.message, {
            type: "error",
          });
        });
    }
  };
const fetchUserDetails = (email) => {
  setIsLoading(true); // Show loading indicator

  // PUT request to create a user
  axios
    .put(
      "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user",
      {
        email: email,
      }
    )
    .then((response) => {
      const userDetails = response.data[0];
      context.setUser({
        name: userDetails.name,
        gameUid: userDetails.UserId,
      });
      toast("Account Created", {
        type: "success",
      });

      // Now, make a GET request to fetch user details
      axios
        .get(
          "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user",
          {
            params: { email: email },
          }
        )
        .then((response) => {
          const userDetails = response.data[0];
          context.setUser({
            name: userDetails.name,
            gameUid: userDetails.UserId,
          });
        })
        .catch((error) => {
          console.error("Error fetching user details: ", error);
        })
        .finally(() => {
          setIsLoading(false); // Hide loading indicator
        });
    })
    .catch((error) => {
      console.error("Error creating a user: ", error);
      setIsLoading(false); // Hide loading indicator
    });
};
 useEffect(() => {
   // Show or hide progress toast based on isLoading state
   if (isLoading) {
     toast("Signing up...", {
       type: "info",
       autoClose: false, // Don't auto-close this toast
     });
   } else {
     toast.dismiss(); // Dismiss any active toasts
   }
 }, [isLoading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };
  if (context.user?.uid) {
    return <Navigate to="/" />;
  }
  return (
    <div
      style={{
        height: "85vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <Container className="text-center">
        <Row>
          <Col lg={6} className="offset-lg-3 mt-4">
            <Card body inverse id="signup-card">
              <Form onSubmit={handleSubmit}>
                <CardHeader id="signup-header">
                  Sign Up
                  <Link to="/signin">Already have an account? Sign In</Link>
                </CardHeader>

                <CardBody id="signup-body">
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" sm={3}>
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" block id="signup-button">
                    Sign Up
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
