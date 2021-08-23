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
            <button type="submit" className="search-btn" value="Search" onClick={handleOnClick}><i class="fas fa-search search-icon"></i></button>         
        </div>
    )
}

export default Searchbar;



