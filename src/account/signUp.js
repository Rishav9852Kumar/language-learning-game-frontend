import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
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
          toast("Account Created", {
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          toast(error.message, {
            type: "error",
          });
        });
    }
  };

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
