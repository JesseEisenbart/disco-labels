
const Label = ({artist, album, price, currency, mediaCondition, sleeveCondition, url, mode, darkMode, lightMode}) => {

    let imgSrc = "";

    // Generate QR code image source
    if (url !== undefined) {
        if (url.length > 0) {
            imgSrc = "https://api.qrserver.com/v1/create-qr-code/?size=70x70&data="+url; 
        }
    } 
    
    return (
        <div className="label"> 
            <div className="label-inner">
                <div className="info text">
                    <div className="artist">{artist}</div>
                    <div className="album">{album}</div>
                    <div className="price">${price} {currency}</div>
                    <div className="condition">Media {mediaCondition}</div>
                    <div className="condition">Sleeve {sleeveCondition}</div>
                </div>
                <div className="qr-img">
                    <img src={imgSrc} alt="QR code"/>
                </div>
            </div>
        </div>
    )
}

export default Label
