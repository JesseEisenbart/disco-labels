import Logo from '../Logo.png';
import GitHub from '../GitHub.png';
import Searchbar from './Searchbar.js';

const Header = ({ handleSubmit, updateInput }) => {
    return (
        <div className="header-container">
            <div className="header">
                <div className="logo-container">
                    <img src={Logo} alt="logo" className="logo"/>
                    <h1 className="logo-text">DISCO LABELS</h1>
                </div>
                <Searchbar handleSubmit={handleSubmit} updateInput={updateInput}/>
                <div className="github-container">
                    <img src={GitHub} alt="GitHub logo" className="github-img"/><h3 className="github-text">VIEW ON GITHUB</h3>
                </div>
            </div>
        </div>
    )
}

export default Header
