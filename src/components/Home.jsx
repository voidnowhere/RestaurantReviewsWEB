import Header from "./Header.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Card, Container} from "react-bootstrap";
import emptyStar from "../assets/empty-star.png";
import fullStar from "../assets/full-star.png";
import Rating from "react-rating";
import {Link} from "react-router-dom";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axiosInstance.get('api/restaurants/').then((response) => {
            setRestaurants(response.data);
        });
    }, []);

    return (
        <>
            <Header/>
            <Container className="mt-5 d-flex flex-wrap gap-4 justify-content-center pb-5">
                {restaurants.map(restaurant => (
                    <Card key={restaurant.id} style={{width: '18rem'}} className="shadow-sm">
                        <Card.Img variant="top" src={restaurant.image}/>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="flex-grow-1">
                                <Link to={`/restaurants/${restaurant.id}`} style={{cursor: 'pointer'}}>
                                    {restaurant.city} {restaurant.name}{' '}
                                    <i className="bi bi-box-arrow-up-right fs-6"></i>
                                </Link>
                            </Card.Title>
                            <div className="d-flex align-items-center justify-content-evenly">
                                <Rating initialRating={restaurant.rating} start={0} stop={5} fractions={1}
                                        emptySymbol={<img src={emptyStar} className="icon"/>}
                                        fullSymbol={<img src={fullStar} className="icon"/>} readonly={true}/>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </>
    )
}