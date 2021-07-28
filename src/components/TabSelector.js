import { useState } from "react";

const TabSelector = ({ currentTab, setTab, select, print, mode, darkMode, lightMode }) => {
    function setCurrentTab() {
        if (currentTab === select) {
            setTab(print);
        } else {
            setTab(select);
        }
    } 
    return (
        <div className="tab-container">
            <div onClick={setCurrentTab} className="select-tab tab">
                <h1 className={`tab-header select-header ${
                    (currentTab === select) 
                        ? "tab-selected" 
                        : "tab-header"
                }`}>CATALOG</h1>
            </div>
            <div onClick={setCurrentTab} className="print-tab tab">
                <h1 className={`tab-header print-header ${
                    (currentTab === print) 
                            ? "tab-selected" 
                            : "tab-header"
                }`}>LABELS</h1>
            </div>  
        </div>
    )
}

export default TabSelector

