import Header from "./Header.jsx";
import {Button, Card, Container, FloatingLabel, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Confirm} from 'notiflix/build/notiflix-confirm-aio';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {Link} from "react-router-dom";

function RestaurantsVerification() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        axiosInstance.get('api/reviewers/restaurants/').then((response) => {
            setRestaurants(response.data);
        });
    }, []);

    useEffect(() => {
        if (currentRestaurantId !== null) {
            axiosInstance.get(`api/reviewers/restaurants/${currentRestaurantId}/`).then((response) => {
                setCurrentRestaurant(response.data);
                setShowDetailModal(true);
            });
        }
    }, [currentRestaurantId]);

    function verify(e, id) {
        Confirm.show(
            'Confirm',
            'Do you want to verify this restaurant?',
            'Yes',
            'No',
            () => {
                axiosInstance.patch(`api/reviewers/restaurants/${id}/verify`).then(() => {
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
            <Container className="mt-5 pb-5">
                <h3>Restaurants verification</h3>
                <div className="d-flex justify-content-center flex-wrap gap-5 mt-4 justify-content-center">
                    {restaurants.map((restaurant) => (
                        <Card key={restaurant.id} style={{width: '18rem'}} className="shadow">
                            <Card.Img variant="top" src={restaurant.image}/>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="flex-grow-1">{restaurant.city} {restaurant.name}</Card.Title>
                                <div className="d-flex align-items-center justify-content-evenly">
                                    <Form.Check type="switch" label="Verified" defaultChecked={restaurant.is_verified}
                                                onChange={(e) => verify(e, restaurant.id)}/>
                                    <Link to={`/verifications/${restaurant.id}/ratings`}>
                                        <Button variant="outline-primary" size="sm">
                                            <i className="bi bi-clipboard2-pulse-fill">{' ' + restaurant.unverified_ratings_count}</i>
                                        </Button>
                                    </Link>
                                    <Button variant="outline-primary" size="sm"
                                            onClick={() => setCurrentRestaurantId(restaurant.id)}>
                                        <i className="bi bi-credit-card-2-front-fill"></i>
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
                            <FloatingLabel label="City" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.city}
                                              placeholder="City"/>
                            </FloatingLabel>
                            <FloatingLabel label="Description" className="mb-3">
                                <Form.Control type="text" readOnly value={currentRestaurant.description}
                                              placeholder="Cuisines"/>
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