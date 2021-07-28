
const PrintButton = ({ show }) => {
    // Prints the current window
    function printWindow() {
        window.print();
    }
    return (      
        <div className="print-btn-container">
            {show ? <button className="print-btn" type="button" onClick={printWindow}>Print Labels</button> : <div></div>}            
        </div>
    )
}

export default PrintButton
