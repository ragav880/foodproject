import React  from 'react'



const Header = ({names, inputChange, searchRecipe}) => {
   
    return (
        <>
            <div className="jumbotron">
                <div className="tittle">
                    <h1 className="display-1 text-center">Bite Craft</h1>
                    </div>
                <div class="input-group w-50 mx-auto">
                    <input type="text" class="form-control" placeholder="Search Your Recipe" value={names} onChange={inputChange} />
                    <div className="input-group-append">
                        <button className="btn btn-dark" onClick={()=>{searchRecipe()}}>Search </button>
                    </div>

                </div>
            </div>
        </>
    )
};
export default Header;