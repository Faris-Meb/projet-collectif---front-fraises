import React from "react";
import Card from 'react-bootstrap/Card';
import ViewDetails from "./ViewDetails";
import AddToCart from "./AddToCart";

const Preview = ({ furniture }) => {
    return (
            <Card style={{ width: '24rem'}} className='card' border="secondary" bg="light" text="dark">
                <Card.Header>
                    <Card.Title>
                        <h3>{furniture.title}</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Img className="card-img" src={furniture.pictureUrl} variant="center" />
                <Card.Body>
                    <Card.Text>
                        {furniture.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {furniture.price.toLocaleString()} € <br />
                    <ViewDetails furniture={furniture} />
                    {localStorage.getItem("user-info") ? (
                    <AddToCart furniture={furniture}>Ajouter au panier</AddToCart>
                ) : null}
                </Card.Footer>
            </Card>
    );
};

export default Preview;