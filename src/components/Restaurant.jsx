import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import img1 from './images/téléchargement.jpeg'


function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/reviewer/restaurant/")
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                {restaurants.map((restaurant) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={restaurant.id} >
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={img1} />
                            <Card.Body>
                                <Card.Title><strong>Cuisine:</strong> {restaurant.cuisines}</Card.Title>
                                <Card.Text><strong>Price Range:</strong> {restaurant.price_range}</Card.Text>
                                <Card.Text> <strong>Address :</strong> {restaurant.address}</Card.Text>
                                <Button variant="primary">View Ratings</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default Restaurant;