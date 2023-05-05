import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axiosInstance from "../axiosInstance.js";
import { useEffect, useState } from 'react';

export default function ListRestaurant () {
  const [cuisines, setCuisines] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8000/api/restaurant/list`) 
      .then((response) => response.json()) 
      .then((jsonData) => setCuisines(jsonData)) 
  }, []);
    return(
        <>
    <h1 style={{textAlign:"center"}}>Restaurants in Casablanca</h1>
    <div style={{display: "flex",flexWrap: "wrap", justifyContent:"center", marginTop:"20px"}}>
    {cuisines.map((result) => (
        
            <Card style={{ width: '18rem' }}>
      <a href={`/restaurant/${result.nom}`}><Card.Img variant="top" src={`https://www.bestrestaurantsmaroc.com/${result.imagesI}`} /></a>
    
      <Card.Body style={{flex:"auto"}}>
        <Card.Title>{result.nom}</Card.Title>
        <Card.Text>
        {result.cuisines}
        </Card.Text>
      </Card.Body>
    </Card>
        
      ))}
  </div>
    </>
    );
}