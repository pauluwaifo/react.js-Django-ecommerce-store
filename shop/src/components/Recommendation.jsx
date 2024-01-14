import { Link } from "react-router-dom";
import rcd_1 from "../assests/recomended_images/rcd_1.png";
import rcd_2 from "../assests/recomended_images/rcd_2.png";
import rcd_3 from "../assests/recomended_images/rcd_3.png";
import rcd_4 from "../assests/recomended_images/rcd_4.png";
import rcd_5 from "../assests/recomended_images/rcd_5.png";
import rcd_6 from "../assests/recomended_images/rcd_6.png";
import rcd_7 from "../assests/recomended_images/rcd_7.png";

function Recommendation() {
  return (
    <div className="col-lg-12 mt-3">
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_1} alt="...." />
              <div className="d-inline-block lh">
                <h6>Deodorants</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_2} alt="...." />
              <div className="d-inline-block lh">
                <h6>Groceries</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_3} alt="...." />
              <div className="d-inline-block lh">
                <h6>Women Shoes</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_4} alt="...." />
              <div className="d-inline-block lh">
                <h6>Sneakers</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_5} alt="...." />
              <div className="d-inline-block lh">
                <h6>Jewelry</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_6} alt="...." />
              <div className="d-inline-block lh">
                <h6>Hand Bags</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="carousel-card">
              <img className="d-inline-block" src={rcd_7} alt="...." />
              <div className="d-inline-block lh">
                <h6>Beauty</h6>
                <p>Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="carousel-controls">
          <button className="prev-btn">
            <span className="arrow left"></span>
          </button>
          <button className="next-btn">
            <span className="arrow right"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
