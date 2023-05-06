import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import Header from "./Header.jsx";
import {Card, Container, FormCheck} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Confirm} from "notiflix/build/notiflix-confirm-aio";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import Rating from "react-rating";
import fullStar from '../assets/full-star.png'
import emptyStar from '../assets/empty-star.png'


function RatingsVerification() {
    const [restaurant, setRestaurant] = useState(null);
    const {restaurantId} = useParams();

    useEffect(() => {
        axiosInstance.get(`api/reviewers/restaurants/${restaurantId}/ratings/`)
            .then(response => {
                setRestaurant(response.data);
            });
    }, []);

    function handleCheckboxChange(event, restaurantId, isChecked) {
        Confirm.show(
            'Confirm',
            'Do you want to make this comment verified ?',
            'Yes',
            'No',
            () => {
                axiosInstance.patch(`api/reviewers/ratings/${restaurantId}/verify`).then(() => {
                    Notify.success(
                        `Reservation made ${(isChecked) ? 'verified' : 'not verified'} successfully.`,
                        {position: 'center-bottom', fontSize: '10'}
                    );
                }).catch((error) => {
                    console.log(error);
                });
            },
            () => {
                event.target.checked = !isChecked;
            },
        )
    }

    return (
        <>
            <Header/>
            <Container className="mt-5 d-flex gap-2 flex-column">
                {
                    restaurant
                    &&
                    <h2>{restaurant.city} {restaurant.name}</h2>
                }
                {
                    restaurant
                    &&
                    restaurant.ratings.map((rating) => (
                        <Card key={rating.id}>
                            <Card.Header className="d-flex gap-3">
                                <i className="bi bi-person-circle"></i>
                                <span>{rating.customer.email}</span>
                                <i className="bi bi-calendar-check"></i>
                                <span>{rating.created_at}</span>
                            </Card.Header>
                            <Card.Body className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <Card.Text>{rating.comment}</Card.Text>
                                    <Rating initialRating={rating.stars}
                                            emptySymbol={<img src={emptyStar} className="icon"/>}
                                            fullSymbol={<img src={fullStar} className="icon"/>} readonly/>
                                </div>
                                <div>
                                    <FormCheck type="switch" defaultChecked={rating.is_verified}
                                               onChange={(event) =>
                                                   handleCheckboxChange(event, rating.id, event.target.checked)
                                               }
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Container>
        </>
    )
}

export default RatingsVerification;