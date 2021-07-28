
const TabSelector = ({ currentTab, setTab, catalog, label}) => {
    function setCurrentTab() {
        if (currentTab === catalog) {
            setTab(label);
        } else {
            setTab(catalog);
        }
    } 
    return (
        <div className="tab-container">
            <div onClick={setCurrentTab} className="tab">
                <h1 className={`tab-header ${
                    (currentTab === catalog) 
                        ? "tab-selected" 
                        : ""
                }`}>CATALOG</h1>
            </div>
            <div onClick={setCurrentTab} className="tab">
                <h1 className={`tab-header ${
                    (currentTab === label) 
                            ? "tab-selected" 
                            : ""
                }`}>LABELS</h1>
            </div>  
        </div>
    )
}

export default TabSelector

