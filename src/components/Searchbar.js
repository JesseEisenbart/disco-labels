import Search from '../Search.png';

const Searchbar = ({handleSubmit, updateInput, updateLabelList}) => { 

    function handleOnClick() {
        handleSubmit();
        updateLabelList([]);
    }
    return (
        <div className="search-container">
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search for a user" onChange={(e) => { updateInput(e.target.value); }}></input>
            </div>
            <button type="submit" className="search-btn" value="Search" onClick={handleOnClick}><img src={Search} alt="Search icon" className="search-icon"/></button>         
        </div>
    )
}

export default Searchbar;



