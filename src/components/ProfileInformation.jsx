import Header from "./Header.jsx";
import {Button, Container, FloatingLabel, Form, FormControl} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Notify} from "notiflix/build/notiflix-notify-aio";

export default function ProfileInformation() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        axiosInstance.get('api/users/profile/')
            .then((response) => {
                emailRef.current.value = response.data.email;
            });
    }, []);

    function submit(event) {
        event.preventDefault();
        axiosInstance.put('api/users/profile/', {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
        }).then((response) => {
            passwordRef.current.value = '';
            setEmailError('');
            setPasswordError('');
            Notify.success(response.data.message, {
                'position': "center-bottom",
            });
        }).catch((error) => {
            passwordRef.current.value = '';
            const errors = error.response.data;
            setEmailError(errors.email);
            setPasswordError(errors.password);
        });
    }

    return (
        <>
            <Header/>
            <Container className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 mt-5 p-4 border rounded shadow">
                <Form onSubmit={submit} noValidate>
                    <FloatingLabel label="Email address">
                        <FormControl ref={emailRef} type="email" placeholder="name@example.com" required/>
                        <div className="text-danger">{emailError}</div>
                    </FloatingLabel>
                    <FloatingLabel label="Password" className="mt-3">
                        <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                        <div className="text-danger">{passwordError}</div>
                    </FloatingLabel>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant={"primary"} size="lg" type="submit">Edit</Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}