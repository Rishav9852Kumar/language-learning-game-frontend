import React, { useState, useContext, useEffect } from "react";
import { FiUnlock } from "react-icons/fi";
import { app } from "../config/firebase-config";
import axios from "axios";
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

import "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("guest@123.gmail.com");
  const [password, setPassword] = useState("Strong@123");
  const [isLoading, setIsLoading] = useState(false); // To track loading state

const fetchUserDetails = async (email) => {
  try {
    const response = await axios.get("api/user", {
      params: {
        email: email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response = " + response);
    console.log("response.data = " + response.data);
    const userDetails = response.data[0];
    const userName = userDetails.UserName;
    const gameUid = `name${userDetails.UserId}`;

    context.setUser({
      name: userName,
      gameUid: gameUid,
    });

    console.log("context = " + context);
    console.log("context.user = " + context.user);
    console.log("context.user.name = " + context.user.name);
    console.log("context.user.gameUid = " + context.user.gameUid);

    context.log("context.user.uid = " + context.user.uid);

    setIsLoading(false);

    toast("Account Logged in", {
      type: "success",
    });
  } catch (error) {
    console.error(error);
    setIsLoading(false);

    if (error.response && error.response.status === 404) {
      toast("Unable to register account", {
        type: "error",
      });
    } else {
      toast(error.message, {
        type: "error",
      });
    }
  }
};

  const handleSignin = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
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
  };
  useEffect(() => {
    // Show or hide progress toast based on isLoading state
    if (isLoading) {
      toast("Signing in...", {
        type: "info",
        autoClose: true, //  auto-close this toast
      });
    } else {
      toast.dismiss(); // Dismiss any active toasts
    }
  }, [isLoading]);
  const defaultlogin = () => {
    setEmail("guest@123.gmail.com");
    setPassword("Strong@123");
    handleSubmit();
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    handleSignin();
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
            <Card body inverse id="signin-card">
              <Form onSubmit={handleSubmit}>
                <CardHeader id="signin-header">
                  Sign In
                  <FiUnlock
                    className="ml-auto"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="To Login as Guest Click Here"
                    onClick={defaultlogin}
                    size={30}
                  />
                  Guest login
                </CardHeader>

                <CardBody id="signin-body">
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
                  <Button type="submit" block id="signin-button">
                    Sign In
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
export default SignIn;
