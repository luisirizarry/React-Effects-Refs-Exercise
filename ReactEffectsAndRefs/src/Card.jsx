import React from "react";

const Card = ({ image, altText }) => {
    

    return (
        <img src={image} alt={altText} className="Card"/>
    )
}

export default Card;