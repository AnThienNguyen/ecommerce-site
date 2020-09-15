import React from 'react';
import './Receipt.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

function Receipt() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const emptyBasket = () => {
        // dispatch item in data layer
        dispatch({
            type: "EMPTY_BASKET"
        });

        history.replace('/orders');
    };

    return (
        <div className='receipt'>
            <h1>Review Order</h1>
            <div className='receipt__info'>
                <div key={basket}>
                    {basket.map((item) => (
                        <div className='receipt__detail'>
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            hideButton
                            />
                        </div>
                    ))}
                </div>
                <CurrencyFormat
                    renderText={(value) => (
                        <p className="receipt__total">Order Total: {value}</p>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                />  
            </div>
            <button onClick={emptyBasket} className='receipt__orders'>Go to Orders</button>
        </div>
    )
}

export default Receipt
