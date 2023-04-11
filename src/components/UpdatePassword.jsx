import Header from "./Header.jsx";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {useRef, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Notify} from "notiflix/build/notiflix-notify-aio";

export default function UpdatePassword() {
    const passwordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmationRef = useRef(null);
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmationError, setConfirmationError] = useState('');

    function submit(event) {
        event.preventDefault();
        axiosInstance.patch('api/users/update_password/', {
            password: passwordRef.current.value.trim(),
            new_password: newPasswordRef.current.value.trim(),
            confirmation: confirmationRef.current.value.trim(),
        }).then((response) => {
            passwordRef.current.value = '';
            newPasswordRef.current.value = '';
            confirmationRef.current.value = '';
            setPasswordError('');
            setNewPasswordError('');
            setConfirmationError('');
            Notify.success(response.data.message, {
                position: 'center-bottom',
            });
        }).catch((error) => {
            passwordRef.current.value = '';
            newPasswordRef.current.value = '';
            confirmationRef.current.value = '';
            const errors = error.response.data;
            setPasswordError(errors.password);
            setNewPasswordError(errors.new_password);
            setConfirmationError(errors.confirmation);
        });
    }

    return (
        <>
            <Header/>
            <Container className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 mt-5 p-4 border rounded shadow">
                <Form onSubmit={submit} noValidate>
                    <FloatingLabel label="Password" className="mt-3">
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                        <div className="text-danger">{passwordError}</div>
                    </FloatingLabel>
                    <FloatingLabel label="New password" className="mt-3">
                        <Form.Control ref={newPasswordRef} type="password" placeholder="New password" required/>
                        <div className="text-danger">{newPasswordError}</div>
                    </FloatingLabel>
                    <FloatingLabel label="Confirmation" className="mt-3">
                        <Form.Control ref={confirmationRef} type="password" placeholder="Confirmation" required/>
                        <div className="text-danger">{confirmationError}</div>
                    </FloatingLabel>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant={"primary"} size="lg" type="submit">Update</Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}