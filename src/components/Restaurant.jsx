import Header from "./Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Button, Card, Container, Form, Image} from "react-bootstrap";
import axiosInstance from "../axiosInstance.js";
import emptyStar from "../assets/empty-star.png";
import fullStar from "../assets/full-star.png";
import Rating from "react-rating";
import {Report} from 'notiflix/build/notiflix-report-aio';
import {useSelector} from "react-redux";
import {Confirm} from 'notiflix/build/notiflix-confirm-aio';


function Restaurant() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isReviewer = useSelector(state => state.user.isReviewer);
    const [restaurant, setRestaurant] = useState(null);
    const {restaurantId} = useParams();
    const commentRef = useRef();
    const [stars, setStars] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getRestaurant();
    }, []);

    function getRestaurant() {
        axiosInstance.get(`api/restaurants/${restaurantId}/`).then((response) => {
            setRestaurant(response.data);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!isAuthenticated) {
            Confirm.show(
                'Confirm',
                'You need to be logged in to submit your rating.',
                'Yes',
                'No',
                () => {
                    navigate('/login');
                },
            );
            return;
        }
        if (commentRef.current.value.length === 0) {
            Report.failure(
                'Failure',
                'You comment is required!',
                'Okay',
                {backOverlay: false},
            );
            return;
        }
        axiosInstance.post('api/ratings/', {
            restaurant: restaurant.id,
            comment: commentRef.current.value.trim(),
            stars: stars,
        }).then(() => {
            Report.success(
                'Success',
                'Your rating will soon get verified.',
                'Okay',
                {backOverlay: false},
            );
            commentRef.current.value = '';
            setStars(0);
            getRestaurant();
        });
    }

    return (
        <>
            <Header/>
            {
                restaurant
                &&
                <Container className="mt-5 pb-5">
                    <div className="d-flex flex-column align-items-center gap-3 mb-5">
                        <Image src={restaurant.image} className="shadow-lg" rounded fluid/>
                        <h3>{restaurant.city + ' ' + restaurant.name}</h3>
                        <Rating initialRating={restaurant.rating} start={0} stop={5} fractions={1}
                                emptySymbol={<img src={emptyStar} className="icon"/>}
                                fullSymbol={<img src={fullStar} className="icon"/>} readonly={true}/>
                    </div>
                    <div className="d-flex flex-wrap gap-sm-3 justify-content-sm-around">
                        <div>
                            <h4>Phone number</h4>
                            <p>
                                <a href={"tel:" + restaurant.phone_number}>{restaurant.phone_number}</a>
                            </p>
                        </div>
                        <div>
                            <h4>Website</h4>
                            <p>
                                <a href={restaurant.website}>{restaurant.website}</a>
                            </p>
                        </div>
                        <div>
                            <h4>Address</h4>
                            <p>{restaurant.address}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4>Cuisines</h4>
                        <p>{restaurant.cuisines}</p>
                        <h4>Description</h4>
                        <p>{restaurant.description}</p>
                    </div>
                    {
                        !isReviewer
                        &&
                        <Form className="mb-3">
                            <div className="d-flex justify-content-between">
                                <h5>Your rate</h5>
                                <Rating start={0} stop={5} initialRating={stars}
                                        onChange={value => setStars(value)}
                                        emptySymbol={<img src={emptyStar} className="icon"/>}
                                        fullSymbol={<img src={fullStar} className="icon"/>}/>
                            </div>
                            <Form.Control ref={commentRef} as="textarea" rows={3} className="mb-2"/>
                            <div className="d-flex justify-content-end">
                                <Button variant="outline-primary" type="submit" size="sm"
                                        onClick={handleSubmit}>Submit</Button>
                            </div>
                        </Form>
                    }
                    <div className="d-flex flex-column gap-3">
                        {
                            restaurant.ratings.map((rating, index) => (
                                <Card key={index}>
                                    <Card.Header className="d-flex flex-column flex-sm-row gap-3">
                                        <div className="d-flex gap-2">
                                            <i className="bi bi-person-circle"></i>
                                            <span>{rating.customer.email}</span>
                                        </div>
                                        <div className="d-flex gap-2 flex-grow-1">
                                            <i className="bi bi-calendar-check"></i>
                                            <span>{rating.created_at}</span>
                                        </div>
                                        <div>
                                            <Rating initialRating={rating.stars}
                                                    emptySymbol={<img src={emptyStar} className="icon"/>}
                                                    fullSymbol={<img src={fullStar} className="icon"/>} readonly/>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="d-flex align-items-center">
                                        <Card.Text>{rating.comment}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </div>
                </Container>
            }
        </>
    )
}

export default Restaurant;