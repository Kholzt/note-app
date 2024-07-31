import React, { SyntheticEvent, useState } from "react";
import { useTitle } from "./../utils/useDocuments";
import { Card, Button, Container, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null); // For handling errors
  useTitle("Login");
  const { isLogin } = useAuth();

  if (isLogin) {
    return <Navigate to="/" />;
  }

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
      setLoginError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleEmailPasswordLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setPassword("");
      console.error("Email/Password login error:", error);
      setLoginError("Failed to sign in. Please check your email and password.");
    }
  };

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await handleEmailPasswordLogin();
  };

  return (
    <Container className="d-flex justify-content-center vh-100 align-items-center">
      <Card style={{ maxWidth: "100%", width: "30rem" }} border="0">
        <Card.Body>
          <Card.Title className="fs-1 fw-medium">Login</Card.Title>
          <Card.Text>Enter your account details to continue</Card.Text>
          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2"
                type="email"
                placeholder="E.g. jhondoe@email.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2"
                type="password"
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Link
                className="text-decoration-none mb-4 d-inline-block text-primary"
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-100">
              Continue
            </Button>
          </Form>
          <div className="mt-3 text-secondary d-flex justify-content-center mb-3 or-form">
            <span>OR</span>
          </div>
          <Button
            onClick={loginWithGoogle}
            variant="outline-light"
            className=" w-100 text-dark border"
          >
            Login with Google
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
