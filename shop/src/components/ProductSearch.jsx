import {Link} from 'react-router-dom'
import Rating from './Rating'

function ProductSearch({product}) {

    return ( 
        <article>
            {product.countInStock > 0 &&
                <Link to={`/product_/${product.name}/${product._id}`} className='text_decoration_none'>
                    <div className="card"> 
                        <div className="prod-card">
                            <img src={product.image} alt="images"/>
                        </div>
                        <div className="product-container lh p-1">
                            <p className="product-name">{(product.name).toUpperCase()}</p>
                            <span className='original-price'>₦ {Number(product.price).toLocaleString()}</span>
                            <Rating 
                                value={product.rating} 
                                text={`${product.numReviews} reviews`} 
                                color={'#f8e825'}
                            />
                        </div>
                    </div>
                </Link>
            }
        </article>
    );
}

export default ProductSearch;