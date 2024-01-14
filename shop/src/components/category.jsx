import React from "react";
import cat_1 from '../assests/categorie_images/cat_1.jpg'
import cat_2 from '../assests/categorie_images/cat_2.jpg'
import cat_3 from '../assests/categorie_images/cat_3.jpg'
import cat_4 from '../assests/categorie_images/cat_4.jpg'
import cat_5 from '../assests/categorie_images/cat_5.jpg'
import cat_6 from '../assests/categorie_images/cat_6.jpg'
import { Link } from "react-router-dom";

function Category() {
    return ( 
        // <CATEGORY LINKS>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="carousel-cat-container">
                <div className="carousel-cat-wrapper">
                  <Link to="/category/womenfashion" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_1} alt="...." />
                      <div className="lh">
                        <p>Women Fashion</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/category/watches" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_2} alt="...." />
                      <div className="lh">
                        <p>Watches</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/category/menfashion" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_3} alt="...." />
                      <div className="lh">
                        <p>Men Fashion</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/category/menfootwear" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_4} alt="...." />
                      <div className="lh">
                        <p>Men's footwear</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_5} alt="...." />
                      <div className="lh">
                        <p>Health & Beauty</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_6} alt="...." />
                      <div className="lh">
                        <p>Women's Footwear</p>
                      </div>
                    </div>
                  </Link>
                  {/* <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_7} alt="...." />
                      <div className="lh">
                        <p>Home Appliances</p>
                      </div>
                    </div>
                  </Link> */}
                  {/* <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_8} alt="...." />
                      <div className="lh">
                        <p>Generators</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_9} alt="...." />
                      <div className="lh">
                        <p>Perfumes & Deodorants</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={cat_10} alt="...." />
                      <div className="lh">
                        <p>Grains & Rice</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={small} alt="...." />
                      <div className="lh">
                        <p>Mobile Accessories</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="#" className="text_decoration_none">
                    <div className="carousel-cat-card">
                      <img src={small} alt="...." />
                      <div className="lh">
                        <p>Computing Deals</p>
                      </div>
                    </div>
                  </Link> */}
                </div>
                {/* <div className="carousel-cat-controls">
                  <button className="prev-cat-btn d-none">
                    <span className="arrow left"></span>
                  </button>
                  <button className="next-cat-btn">
                    <span className="arrow right"></span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
     );
}

export default Category;