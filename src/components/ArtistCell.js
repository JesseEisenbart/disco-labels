const ArtistCell = ({artist, album, img}) => {
    return (
        <div className="artist-cell">
            <img src={img} alt="Album cover" className="album-img"/>
            <div className="artist-cell-text">
                <h2>{artist}</h2>
                <h3>{album}</h3>
            </div>
        </div>
    )
}

export default ArtistCell
