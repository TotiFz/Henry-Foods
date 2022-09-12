import React from "react";
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card ({id, title, image, diet}) {
    const getDiets = () => {
        let arr = [];
        if(diet){
            for(let i of diet) {
                typeof i === 'object'? arr.push(i.name) : arr.push(i)                
            }
            return arr.length? arr.join(', ') : 'Sorry, Diet not found'
        }
    }
    return (
        <React.Fragment>
            <Link to={`/recipe/${id}`} className='cardLk'>
                <div>
                    <img className="card-img" src={image} alt={title}/>
                </div>
                <div className="card-data">
                    <h2 className="card-title">{title}</h2>
                    <h3 className="card-diets">{getDiets()}</h3>
                </div>
            </Link>
        </React.Fragment>
    )
}