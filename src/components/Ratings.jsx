import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import Header from "./Header.jsx";
import {Card, Container, FormCheck} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Confirm} from "notiflix/build/notiflix-confirm-aio";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import Rating from "react-rating";
import full from './images/full-star.png'
import empty from './images/empty-star.png'


function Ratings() {
    const [ratings, setRatings] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const {restaurantId} = useParams();

    useEffect(() => {
        axiosInstance.get(`api/reviewer/ratings/${restaurantId}`)
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleCheckboxChange(event, restaurantId, isChecked) {
        Confirm.show(
            'Confirm',
            'Do you want to make this comment verified ?',
            'Yes',
            'No',
            () => {
                axiosInstance.patch(`api/reviewer/restaurant/${restaurantId}/ratings`, {
                    is_verified: isChecked
                }).then(() => {
                    setRestaurants((prevState) => prevState.map((restaurant) => {
                            if (restaurant.id === restaurantId) {
                                restaurant.is_verified = !restaurant.is_verified;
                            }
                            return restaurant;
                        })
                    );
                    Notify.success(
                        `Reservation made ${(isChecked) ? 'verified' : 'not verified'} successfully.`,
                        {position: 'center-bottom', fontSize: '10'}
                    );
                }).catch((error) => {
                    console.log(error);
                });
            },
            () => {
                event.target.checked = !(isChecked);
            },
        )
    }


    return (
        <>
            <Header/>

            <Container className="mt-5">

                {ratings.map((rating) => (


                    <Card key={rating.id}>
                        <Card.Header as="h5"><strong>User : </strong>{rating.customer.email}</Card.Header>
                        <Card.Body>

                            <Card.Text>
                                {rating.comment}
                                {rating.id}
                            </Card.Text> <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <FormCheck
                                type="checkbox"
                                defaultChecked={rating.is_verified}
                                onChange={(event) =>
                                    handleCheckboxChange(event, rating.id, event.target.checked)
                                }
                            />
                        </div>
                            <Rating initialRating={rating.stars}  emptySymbol={<img src={empty} className="icon" />}
                                    fullSymbol={<img src={full} className="icon" />} readonly/>


                        </Card.Body>
                    </Card>


                ))}
            </Container>
        </>
    )

}

export default Ratings;