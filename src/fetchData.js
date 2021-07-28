import { CONSUMER_KEY, CONSUMER_SECRET } from "./consumerAuth";

var Discogs = require('disconnect').Client; // Create new client object

// Create new user with authentication
var user = new Discogs({
	consumerKey: CONSUMER_KEY, 
	consumerSecret: CONSUMER_SECRET
}).user();

const DEBUG = false;

// Fetches the given user's inventory and returns the data in a callback
function fetchInventory(username, callback, page, prevData) {   
    user.getInventory(username, {per_page: '100', page: page}, function(err, data) {      
        if (DEBUG) console.log(data); // Debugging
        if (err) {
            console.log(err); // Log error message
        } else {           
            repeatCalls(username, callback, page, data.pagination.pages, concatData(prevData, data.listings));
        }
    });        
}

// Calls fetchInventory until it reaches the last page of the inventory
// then returns a callback with the data
function repeatCalls(username, callback, page, pages, data) {
    if (page < pages) {
        if (DEBUG) console.log("Pages: " + pages); // Debugging
        fetchInventory(username, callback, page+1, data);
    } else {
        callback(data);
    }
}

// Concatenates the previous data with new data
function concatData(prevData, newData) {
    return(prevData.concat(newData));
}

export default fetchInventory;


