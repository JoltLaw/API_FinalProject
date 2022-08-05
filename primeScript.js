"use strict"
// Declairing vars 
const modal = document.getElementById("modal");
const wrapper = document.getElementById("wrapper");
const GUIBalance = document.getElementById("GUIBalance");
var acount = b$("John", "Doe", 1000);
var adding;
var acountingGUI = document.createElement("div");
var amountIntake;
var banner;
var DataDisplay = document.createElement("div");
var i = 0;
var apiData = callApi()
var data;
var stockBoard = document.createElement("div")
var stockContainer;
var datalogBoard = document.createElement("div");

// Api keys and host


// Calling the google finance api for real world stock info.
async function callApi() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e706584409msh658cdac31c28492p1d03cbjsn05848e856c06',
            'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
        }
    };
const response = await fetch('https://google-finance4.p.rapidapi.com/search/?q=airbnb&hl=en&gl=US', options);
data = await response.json();
console.log(data)
return data
}

// Setting acount Balance via a function so that more can be added to the on load chain in fure
function onload() {
GUIBalance.textContent = "Balance: " + acount.Balance;
}

// Basic Banner display function
function createBanner() {

    // Checking if banner exists and if not creating a new one
    if(!banner){
    var banner = document.createElement("div");
    banner.classList.add("banner");
    var bannerMsg = document.createElement("p");
    bannerMsg.textContent = "Transaction Complete!";
    banner.appendChild(bannerMsg);
    wrapper.appendChild(banner);
    }

    // Hiding the banner after two seconds
    setTimeout(function () {
        banner.classList.add("Hidden");
    }, 2000)
    
}

// loading up the GUI for all acounting functionality
function makeAcountingGUI() {
    modal.classList.remove("Hidden");
    // If a GUI doesn't exist create one
    if (!acountingGUI.classList.contains("acountingGUI")) {
    acountingGUI.classList.add("acountingGUI");
    var amountIntake = document.createElement("input");
    amountIntake.placeholder = "Enter Amount here...";
    amountIntake.classList.add("amountIntake");
    var transferBtn = document.createElement("button");
    transferBtn.textContent = "Transfer";
    transferBtn.classList.add("transferBtn");
    acountingGUI.appendChild(amountIntake);
    acountingGUI.appendChild(transferBtn);
    
    // Adding an event listener to actually kick off the Functionality
    transferBtn.addEventListener("click", function () {
        acount.addnSubtract(amountIntake.value, adding);
        GUIBalance.textContent = "";
        GUIBalance.textContent = "Balance: " + acount.Balance;
        modal.classList.add("Hidden");
        acountingGUI.classList.add("Hidden");
        amountIntake.value = "";
        createBanner()
    })

    // Adding the GUI to Modal so that it can be viewed in the window
    modal.appendChild(acountingGUI);
    } 

    else {
        acountingGUI.classList.remove("Hidden")
    }


}

// Calling the acounting functions GUI and figuring out if we are adding or subtracting
function withDrawOrPaymentOrDiposit(addingTorF) {
    // Setting the value of adding equal to the value given by the function call
    adding = addingTorF
    makeAcountingGUI();
}

// Function that creates second GUI to display non acounting information
function openDataDisplay(stocks) {
    // Hidding modal
    modal.classList.remove("Hidden");
    // Building GUI if one doesn't already exist
    if (!DataDisplay.classList.contains("DataDisplay")) {
        DataDisplay.classList.add("DataDisplay");
    } 
    // Removing the hidden class if a GUI exists
    else {
        DataDisplay.classList.remove("Hidden");
    } 
    
    // If we are not displaying stock related information display transaction history
    if(!stocks) {
        // check if this is the first time displaying transaction history
   while (i < acount.history.length) {
    var log = document.createElement("p");
    log.textContent = acount.history[i];
    datalogBoard.appendChild(log);
    i++
   }
   DataDisplay.appendChild(datalogBoard);
   
   datalogBoard.classList.remove("Hidden");
} 
// If we are displaying stock related information display the following
else if (stocks) {
    
    // Check if this is the first time opening stocks and if so build the GUI
    if(stockBoard.classList = " ") {
    data.forEach((stock) => {
         stockContainer = document.createElement("div");
        stockContainer.classList.add("stockContainer");
        var title = document.createElement("h2");
        title.textContent = `${stock.info.title}`
        var type = document.createElement("p");
        type.textContent = `${stock.info.type}`
        var price = document.createElement("h3");
        price.textContent = `${stock.price.previous_close} ${stock.price.currency}`
        stockContainer.appendChild(title);
        stockContainer.appendChild(type);
        stockContainer.appendChild(price);
        stockBoard.appendChild(stockContainer);
    });
    DataDisplay.appendChild(stockBoard)
    } 
    else {
        stockBoard.classList.remove("Hidden")
    }
   }


   modal.append(DataDisplay)
}

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        if (acountingGUI.classList.contains("acountingGUI")) {
        acountingGUI.classList.add("Hidden")};
        if (DataDisplay.classList.contains("DataDisplay")){
        DataDisplay.classList.add("Hidden")};
        if (i !== 0) {
            datalogBoard.classList.add("Hidden");
        }
        if(stockBoard.classList = " "){
            stockBoard.classList.add("Hidden");
        }

        modal.classList.add("Hidden");
    }
})

onload();