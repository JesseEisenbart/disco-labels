const Label = ({artist, album, price, currency, mediaCondition, sleeveCondition, QRSrc}) => { 
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
                    <img src={QRSrc} alt="QR code"/>
                </div>
            </div>
        </div>
    )
}

export default Label
