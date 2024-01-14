function Rating({value, text, color, fontSize}) {
    return ( 
        <div className="rating">
            <span className="fs-p8">
                <i style={{color, fontSize}} className={
                    value >= 1
                    ? 'fas fa-star'
                    : value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
            <span className="fs-p8">
                <i style={{color, fontSize}} className={
                    value >= 2
                    ? 'fas fa-star'
                    : value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
            <span className="fs-p8">
                <i style={{color, fontSize}} className={
                    value >= 3
                    ? 'fas fa-star'
                    : value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
            <span className="fs-p8">
                <i style={{color, fontSize}} className={
                    value >= 4
                    ? 'fas fa-star'
                    : value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
            <span className="fs-p8">
                <i style={{color, fontSize}} className={
                    value >= 5
                    ? 'fas fa-star'
                    : value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                }>

                </i>
            </span>
            <span className="lt-small">{text && text}</span>
        </div>
     );
}

export default Rating;