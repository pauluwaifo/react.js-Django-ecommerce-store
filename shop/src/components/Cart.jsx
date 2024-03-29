function Cart({item}) {
    console.log(item.name)
    
    return ( 
        <div className="container-fluid">
            <div className="row" key={item.product}>
                {/* <div className="col-md-3">
                    <p>{item.name}</p>
                </div> */}
                <div className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img src={item.image} alt={item.name} className="img-fluid rounded-3" />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                                <p className="lead fw-normal mb-2">{item.name}</p>
                                {/* <p><span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey</p> */}
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button className="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                <i className="fas fa-minus"></i>
                                </button>

                                <input id="form1" min="0" name="quantity" value="2" type="number"
                                className="form-control form-control-sm" />

                                <button className="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0">${item.price}</h5>
                            </div>
                            {/* <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" className="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Cart;