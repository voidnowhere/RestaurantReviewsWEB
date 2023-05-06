import Header from "./Header.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance.js";
import {Button, Card, Container, Form, InputGroup} from "react-bootstrap";
import emptyStar from "../assets/empty-star.png";
import fullStar from "../assets/full-star.png";
import Rating from "react-rating";
import {Link} from "react-router-dom";

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        getRestaurants();
    }, []);

    function getRestaurants(name) {
        const url = (name) ? `api/restaurants?name=${name}` : 'api/restaurants/';
        axiosInstance.get(url).then((response) => {
            setRestaurants(response.data);
        });
    }

    useEffect(() => {
        if (name.length > 3) {
            getRestaurants(name);
        }
    }, [name]);

    return (
        <>
            <Header/>
            <Container className="mt-5 pb-5">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <InputGroup>
                        <InputGroup.Text>
                            <i className=" bi bi-search fs-5"></i>
                        </InputGroup.Text>
                        <Form.Control placeholder="Name" value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                    </InputGroup>
                    <Button variant="outline-primary" onClick={() => {
                        setName('');
                        getRestaurants();
                    }}>Reset</Button>
                </div>
                <div className=" mt-5 d-flex flex-wrap gap-4 justify-content-center">
                    {restaurants.map(restaurant => (
                        <Card key={restaurant.id} style={{width: '18rem'}} className=" shadow-sm">
                            <Card.Img variant=" top" src={restaurant.image}/>
                            <Card.Body className=" d-flex flex-column">
                                <Card.Title className=" flex-grow-1">
                                    <Link to={`/restaurants/${restaurant.id}`} style={{cursor: 'pointer'}}>
                                        {restaurant.city} {restaurant.name}{' '}
                                        <i className=" bi bi-box-arrow-up-right fs-6"></i>
                                    </Link>
                                </Card.Title>
                                <div className=" d-flex align-items-center justify-content-evenly">
                                    <Rating initialRating={restaurant.rating} start={0} stop={5} fractions={1}
                                            emptySymbol={<img src={emptyStar} className=" icon"/>}
                                            fullSymbol={<img src={fullStar} className=" icon"/>} readonly={true}/>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )
}