import Label from "./Label";

const LabelGrid = ({ list }) => {
    let array = [];
    let wrapperArray = [];
    let grid = [];
    var size = 30;

    if (list !== [] && list !== undefined) {
        // Push data from list into new array
        for (var i=0; i < list.length; i++) {

            let QRSrc = "";

            // Generate QR code image source
            if (list[i].url !== undefined) {
                if (list[i].url.length > 0) {
                    QRSrc = "https://api.qrserver.com/v1/create-qr-code/?size=70x70&data="+list[i].url; 
                }
            } 

            array.push(
                <Label 
                    artist={list[i].artist} 
                    album={list[i].album} 
                    price={list[i].price} 
                    currency={list[i].currency} 
                    mediaCondition={list[i].mediaCondition} 
                    sleeveCondition={list[i].sleeveCondition}  
                    url={list[i].url} 
                    key={list[i].id} 
                    QRSrc={QRSrc}
                />
            )    
        }
        // Split data from array into lists of 30
        for (var j=0; j<array.length; j+=size) {
            wrapperArray.push(array.slice(j,j+size));
        }
        // Add container to data and add to final grid
        for (var k=0; k < wrapperArray.length; k++) {
            grid.push(
                <div className={"label-grid"} >
                    {wrapperArray[k]}
                </div>
            )
        }
    }

    return (
        <div className="label-container">
           {grid}
        </div>
    )
}

export default LabelGrid
