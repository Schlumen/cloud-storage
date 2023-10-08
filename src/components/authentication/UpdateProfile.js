import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        setError("");
        setMessage("");
        setLoading(true);

        try {
            let updatedSomething = false;
            if (emailRef.current.value !== currentUser.email) {
                await updateEmail(emailRef.current.value);
                updatedSomething = true;
            }
            if (passwordRef.current.value) {
                await updatePassword(passwordRef.current.value);
                passwordRef.current.value = "";
                passwordConfirmRef.current.value = "";
                updatedSomething = true;
            }
            if (updatedSomething) {
                setMessage("Profile successfully updated.");
            }
        } catch {
            setError("Failed to update account");
        }
        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message} <Link to="/user">Go to Profile</Link></Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email} required />
                        </Form.Group>
                        <Form.Group id="password" className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mt-2">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100 mt-3'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to="/user">Cancel</Link>
            </div>
        </CenteredContainer>
    )
}
