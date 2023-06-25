import React from "react";
import inicio from "../../images/images.jpg"

export const Header = () => {
    return(
        <header>
            <a href="#">
                <div className="logo">
                    <img src="inicio" alt="logo" width="150px"></img>
                </div>
            </a>
            <ul>
                <li>
                    <a href="#">INICIO</a>
                </li>
                <li>
                    <a href="#">PRODUCTOS</a>
                </li>
            </ul>
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className="item_total"></span>
            </div>
        </header>
    )
}