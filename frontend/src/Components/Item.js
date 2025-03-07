import React from 'react'


const Item = ({label, image, lines}) => {
    return (
        <>
            <div className="col-md-3">
                <div className="card my-2 py-2">
                    <img src={image} className="img-fluid w-50 mx-auto rounded-circle" />
                    <div className="card-body">
                        <h5 className="text-center">{label}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            lines.map((currItem) => {
                                return (
                                    <li className="list-group-item text-center">{currItem}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Item;
