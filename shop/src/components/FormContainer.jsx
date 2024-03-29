import React from "react";

function FormContainer({children}) {
    return ( 
        <div className="container-fluid">
            <div className="row justify-content-md-center">
                <div className="col-xs-12 col-md-6">
                    {children}
                </div>
            </div>

        </div>
     );
}

export default FormContainer;