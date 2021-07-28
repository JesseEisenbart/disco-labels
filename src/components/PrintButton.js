
import { useEffect, useState } from "react"

const PrintButton = ({ length }) => {
    const [loading, setLoading] = useState(true);
    // Update rows when new data is received
    useEffect(() => {
        var delayInMilliseconds = 100*length; //2 seconds
        setTimeout(function() {
            setLoading(false);
        }, delayInMilliseconds);
            
    });
    
    // Prints the current window
    function printWindow() {
        if (!loading) window.print();     
    }

    return (      
        <div className="print-btn-container">
            <button className="print-btn" type="button" onClick={printWindow}>{loading ? "Loading...": "Print Labels"}</button>      
        </div>
    )
}

export default PrintButton
