import EnhancedTable from './components/EnhancedTable';
import LabelGrid from './components/LabelGrid';
import Header from './components/Header';
import PrintButton from './components/PrintButton';
import TabSelector from './components/TabSelector';
import './App.css';
import { useState } from "react";
import fetchInventory from './fetchData';
import { createTheme, ThemeProvider } from '@material-ui/core';

// Create Material UI custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#683fff"
    }
  },
  typography: {
    fontFamily:"'Poppins', 'Segoe UI', 'Roboto'",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 450,
    fontWeightBold: 700,
    h1: {
      fontFamily:"'Poppins', 'Segoe UI', 'Roboto'",
      fontWeight: 400,
      fontSize: "1.2rem"
    },
    body2: {
      fontSize: "1.1rem"
    }
  },
  shadows: ["none"]
});

// Selection tab constants
const CATALOG_TAB = "select";
const LABEL_TAB = "print";

const App = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [labelList, setLabelList] = useState([]);
  const [newData, setNewData] = useState([]);
  const [tab, setTab] = useState(CATALOG_TAB);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Populates array with formatted data
  function populateArray(data) {
    let tempArr = [];
    if (data !== [] && data !== undefined) {
      var dataLength = data.length;
      var name, artist, album, format, mediaNumeric, sleeveNumeric, mediaCondition, sleeveCondition, price, currency, url, id, imageUrl;
      for (var i=0; i < dataLength; i++) {
        artist = data[i].release.artist;
        name = artist;
        album = data[i].release.title;
        format = data[i].release.format;
        mediaNumeric= numericCondition(data[i].condition);
        sleeveNumeric = numericCondition(data[i].sleeve_condition);
        mediaCondition = data[i].condition;
        sleeveCondition = data[i].sleeve_condition;
        price = data[i].price.value;
        currency = data[i].price.currency;
        url = data[i].uri;
        id = data[i].id;
        imageUrl = data[i].release.thumbnail;
        tempArr.push(createData(name, artist, album, format, mediaNumeric, sleeveNumeric, mediaCondition, sleeveCondition, price, currency, url, id, imageUrl));
      }
      //console.log(data); // Debugging 
      //console.log(tempArr); // Debugging 
      return tempArr;
    }
  }

  // Creates an object with row data
  function createData(name, artist, album, format, mediaNumeric, sleeveNumeric, mediaCondition, sleeveCondition, price, currency, url, id, imageUrl) {
    return {name, artist, album, format, mediaNumeric, sleeveNumeric, mediaCondition, sleeveCondition, price, currency, url, id, imageUrl};
    
  }

  // Set a numeric condition for each media/sleeve
  function numericCondition(condition) {
    let conditions = [
      /0/,
      /No\WCover/,
      /General/,
      /Fair/,
      /Good\Plus/,
      /Good/,
      /Very\WGood/,
      /Very\WGood\WPlus/,
      /Near\WMint/,
      /Mint/,
    ];

    // Loop through conditions
    for (var i=0; i < conditions.length; i++) {
      if (conditions[i].test(condition) === true) return i;
    }
    return 0;
  }

  // Updates state with new data
  function updateData(data) {
    setNewData(populateArray(data));    
  }

  // Fetches the inventory of the current user entered in the search field
  function searchInventory() {
    //console.log("This is the current input when fetching " + currentInput); // Debugging
    fetchInventory(currentInput, updateData, 1, []);
  }

  // Handles updating the list of labels
  function handleLabelUpdate(newList) {
    setLabelList(newList);
    // console.log(newList); // Debugging
  }

  return (
    <div>
      <div className="noprint">   
        <Header handleSubmit={searchInventory} updateInput={setCurrentInput} updateLabelList={handleLabelUpdate}/>
        <TabSelector currentTab={tab} setTab={setTab} catalog={CATALOG_TAB} label={LABEL_TAB}/>
      </div>  
      { tab === CATALOG_TAB ? 
        <div> 
          <ThemeProvider theme={theme}>
            <EnhancedTable className="noprint" newData={newData} updateLabelList={handleLabelUpdate} selectedList={labelList} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
          </ThemeProvider>
        </div>
      : 
        <div>
          <div className="noprint">   
            <PrintButton length={labelList.length}/>
          </div>   
          <LabelGrid className="print" list={labelList} />
        </div> 
      }           
    </div>
  );
}

export default App;
