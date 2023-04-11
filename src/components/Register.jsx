import {useRef, useState} from "react";
import axiosInstance from '../axiosInstance.js';
import {Button, Container, FloatingLabel, Form, FormControl} from "react-bootstrap";
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import Header from "./Header.jsx";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function submit(event) {
        event.preventDefault();
        axiosInstance.post('api/users/register/', {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }).then((response) => {
            Notify.success(response.data['message'], {
                position: 'center-bottom',
            });
            navigate('/login');
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
                        <Button variant={"primary"} size="lg" type="submit">Register</Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
