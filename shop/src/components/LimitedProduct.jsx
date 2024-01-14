import {Link} from 'react-router-dom'
import Rating from './Rating'
import { useState, useEffect } from 'react';

const ProgressBar = ({ initialCountInStock, countInStock }) => {
    const progress = (countInStock / initialCountInStock) * 100;

    return (
        <div className='p-1 pl-0'>
            <span className='fsp-5 pl-0 py-1 d-inline-block'>Items left: {countInStock} </span>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

function Product({product}) {

    const initialCountInStock = 10;
    const [countInStock, setCountInStock] = useState(initialCountInStock);

    useEffect(() => {
        if (countInStock > 0) {
            setCountInStock(product.countInStock);
        }
    }, [countInStock])

    
    
    return (
        <article>
            {product.countInStock > 0 &&
                <Link to={`/product_/${product.name}/${product._id}`} className='text_decoration_none'>
                    <div className="carousel-prod-card c_w">
                        <div className="prod-card">
                            <img src={product.image} alt="images"/>
                        </div>
                        <div className="product-container-adj lh p-1">
                            <p className="product-name">{(product.name).toUpperCase()}</p>
                            <span className='original-price'>₦ {Number(product.price).toLocaleString()}</span>
                            <Rating 
                                value={product.rating} 
                                text={`${product.numReviews} reviews`} 
                                color={'#f8e825'}
                            />
                            <div>
                            <div className="p-1"></div>
                            <ProgressBar initialCountInStock={initialCountInStock} countInStock={countInStock}/></div>
                        </div>
                    </div>
                </Link>
            }
        </article>
     );
}

export default Product;