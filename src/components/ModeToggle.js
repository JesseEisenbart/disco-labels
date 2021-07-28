
const ModeToggle = ({ mode, setMode, lightMode, darkMode }) => {
    function toggleMode() {
        if (mode === darkMode) {
            setMode(lightMode);
        } else {
            setMode(darkMode);
        }
    } 
    return (
        <div className="switch-container">
            <label class="switch">
                <input onClick={toggleMode} type="checkbox"/>
                <span class="slider round"></span>
            </label>
            <p className={mode === darkMode ? "text-dm" : "text-lm"}>{mode === lightMode ? "Enable dark mode!" : "Enable light mode!"}</p>
        </div>
    )
}

export default ModeToggle
