import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions";
import CategoryCard from '../components/CategoryCard';
import GoToTop from '../components/GoToTop';

function MenFootwear() {

    const subCategory = "Mens Shoes"
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products} = productList
    console.log(products)


    useEffect(()=> {
        dispatch(listProducts())
    }, [dispatch])

    return ( 
        <div className="row gx-3"> 
            <div className="col-12 d-flex flex-row flex-wrap bg-white p-2 rounded-1 shadow">
                <GoToTop />
                {products.map((product) => (
                    <div key={product._id}> 
                        {product.subCategory.startsWith(subCategory)  &&
                            <CategoryCard product={product}/>
                        }
                    </div>
                ))}
            </div>
        </div>
     );
}

export default MenFootwear;