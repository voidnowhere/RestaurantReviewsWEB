import Header from "./Header.jsx";
import {Button, Card, Container, FloatingLabel, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Confirm} from 'notiflix/build/notiflix-confirm-aio';
import {Notify} from 'notiflix/build/notiflix-notify-aio';


function RestaurantsVerification() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        axiosInstance.get('api/restaurants/verification/').then((response) => {
            setRestaurants(response.data);
        });
    }, []);

    useEffect(() => {
        if (currentRestaurantId !== null) {
            axiosInstance.get(`api/restaurants/verification/${currentRestaurantId}/`).then((response) => {
                setCurrentRestaurant(response.data);
                setShowDetailModal(true);
            });
        }
    }, [currentRestaurantId]);

    function openMap(latitude, longitude) {
        window.open(`
            https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, "_blank");
    }

    function verify(e, id) {
        Confirm.show(
            'Confirm',
            'Do you want to verify this restaurant?',
            'Yes',
            'No',
            () => {
                axiosInstance.patch(`api/restaurants/verification/${id}/verify`).then(() => {
                    Notify.success(`Restaurant ${(e.target.checked) ? 'verified' : 'unverified'} successfully.`, {position: 'center-bottom'});
                });
            },
            () => {
                e.target.checked = !e.target.checked;
            }
        );
    }

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h3>Restaurants verification</h3>
                <div className="d-flex justify-content-center flex-wrap gap-5 mt-4">
                    {restaurants.map((restaurant) => (
                        <Card key={restaurant.id} style={{width: '18rem'}}>
                            <Card.Img variant="top" src={restaurant.image}/>
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <div className="d-flex align-items-center justify-content-evenly">
                                    <Form.Check type="switch" label="Verified"
                                                onChange={(e) => verify(e, restaurant.id)}
                                                defaultChecked={restaurant.is_verified}/>
                                    <Button variant="primary" onClick={() => setCurrentRestaurantId(restaurant.id)}>
                                        <i className="bi bi-card-list"></i>
                                    </Button>
                                    <Button variant="success"
                                            onClick={() => openMap(restaurant.latitude, restaurant.longitude)}>
                                        <i className="bi bi-geo-alt"></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                {
                    currentRestaurant
                    &&
                    <Modal show={showDetailModal} onHide={() => {
                        setShowDetailModal(false);
                        setCurrentRestaurantId(null);
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>{currentRestaurant.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FloatingLabel label="Cuisines" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.cuisines}
                                              placeholder="Cuisines"/>
                            </FloatingLabel>
                            <FloatingLabel label="Price range" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.price_range}
                                              placeholder="Price range"/>
                            </FloatingLabel>
                            <FloatingLabel label="Meals" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.meals}
                                              placeholder="Meals"/>
                            </FloatingLabel>
                            <FloatingLabel label="Address" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.address}
                                              placeholder="Address"/>
                            </FloatingLabel>
                            <FloatingLabel label="Phone number" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.phone_number}
                                              placeholder="Phone number"/>
                            </FloatingLabel>
                            <FloatingLabel label="Website" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.website}
                                              onClick={() => window.open(currentRestaurant.website, "_blank")}
                                              placeholder="Website" style={{cursor: 'pointer'}}/>
                            </FloatingLabel>
                        </Modal.Body>
                    </Modal>
                }
            </Container>
        </>
    )
}

export default RestaurantsVerification;