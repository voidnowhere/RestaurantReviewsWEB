import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Restaurant (){
    const routeParams = useParams();
    const [data, setData] = useState([])
    const [image, setImage] = useState('')
    useEffect(()=>{
    fetch(`http://localhost:8000/api/restaurant/list`)
    .then((response) => response.json())
    .then((data)=> setData(data));
    }, []);

    return (
     <>
     <h1 style={{textAlign:"center", marginBottom:"50px", marginTop:"50px"}}>{routeParams.nom}</h1>

     <div>
        {data.map((dataImage) => (
            dataImage.nom == routeParams.nom ? (<> <img src={'https://www.bestrestaurantsmaroc.com/'+dataImage.imagesI} alt={routeParams.nom} style={{width:"50%", display:"block",marginLeft:"auto" , marginRight:"auto"}}/>
            <h2>{dataImage.cuisines}</h2>
            <h3>Range price : {dataImage.prix}</h3>
            <h4>{dataImage.phone}</h4>
            <h4>{dataImage.web}</h4>
            <h5> l'Adresse : {dataImage.adresse}</h5>
            <h6> MENU : {dataImage.menu.split(",").join("\n")} </h6>
            </>):null 
        ))}
     </div>

     </>   
    );
}