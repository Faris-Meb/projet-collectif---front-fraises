import Preview from "./Preview";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const typeList = ["assise", "literie", "table", "bureau", "rangement", "linge de maison", "décoration", "luminaire", "art de la table", "salle de bain", "autre"];

const colorList = ["argent","beige","blanc","bleu","bois","bordeaux","doré","gris","jaune","marron","multicolore","noir","orange","rose","rouge","transparent","vert","violet","autre"];

const FurnituresBis = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(1000);
    const [typeValue, setTypeValue] = useState("all");
    const [colorValue, setColorValue] = useState("all");
    const [keyword, setKeyword] = useState("");

    useEffect( () => {
    axios.get("http://localhost:3001/api/furnitures")
    .then((res) => setData(res.data));
    }, []);
    console.log(data);
    
    return (
    <div className="container">
        <div className="filter">
            <div className="keyword">
                <Form.Label>
                    <h5>Mot-clé :</h5>
                </Form.Label>
                <Form.Control
                    id="keyword"
                    type="input"
                    defaultValue={keyword}
                    placeholder="Une idée bien précise ? 🔍"
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className="type-color">
                <Form.Label>
                    <h5>Choississez :</h5>
                </Form.Label>
                <div className="select-type-color">
                    <Form.Select aria-label="Type de meuble" onChange={(e) => setTypeValue(e.target.value)}>
                        <option value="all">Tous les types</option>
                        {typeList.map(function(object){
                                return  <option value={object}>{capitalize(object)}</option>
                            })}
                    </Form.Select>
                    <Form.Select aria-label="Couleur du meuble" onChange={(e) => setColorValue(e.target.value)}>
                        <option value="all">Toutes les couleurs</option>
                        {colorList.map(function(object){
                                return  <option value={object}>{capitalize(object)}</option>
                            })}
                    </Form.Select>
                </div>
            </div>
            <div className="price">
                <Form.Label ><h5>Prix :</h5></Form.Label>
                <Form.Range 
                    id="rangePrice"
                    name="rangePrice"
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                    variant = "secondary"
                />
                <Form.Text muted>jusqu'à {rangeValue} €</Form.Text>
                {/* <label for="rangePrice">Prix :<br />jusqu'à {rangeValue} €</label> */}
            </div>
        </div>
        <div className="furnitures">
            {data
            .filter((furniture) => {
                if(keyword === ""){
                    // eslint-disable-next-line
                    return furniture === furniture
                } else {
                    return furniture.description.toLowerCase().includes(keyword) || furniture.title.toLowerCase().includes(keyword);
                }})
            .filter((furniture) => furniture.price <= rangeValue)
            .filter((furniture) => {
                if(typeValue === "all"){
                    // eslint-disable-next-line
                    return furniture === furniture
                } else {
                    return furniture.type === typeValue
                }})
            .filter((furniture) => {
                if(colorValue === "all"){
                    // eslint-disable-next-line
                    return furniture === furniture
                } else {
                    return furniture.colors === colorValue
                }})
            .map((furniture) => (
            <Preview furniture={furniture} />
            ))}
        </div>
    </div>
    );
};

export default FurnituresBis;
