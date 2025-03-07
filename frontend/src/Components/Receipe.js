import React from 'react'
import Item from './Item';


const Recepes = ({recipe})=>{
    return(
        <>
            <div className="row">
                {
                    recipe.map((currEle, index)=>{
                        return(

                            <Item key={index} label={currEle.recipe.label} image={currEle.recipe.image} lines={currEle.recipe.ingredientLines} />
                        )
                    })
                }
            </div>
        </>
    )
};
export default Recepes;