import {Link} from 'react-router-dom'
import Rating from './Rating'

function RelatedProduct({product}) {
    
    return ( 
            <article >
                <Link to={`/product_/${product.name}/${product._id}`} className='text_decoration_none'>
                    <div className="carousel-prod-card r_l justify-content-around" >
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
                        </div>
                    </div>
                </Link>
            </article>
     );
}

export default RelatedProduct;