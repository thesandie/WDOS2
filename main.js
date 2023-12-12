// DECLARING THE DOM ELEMETS
// Forms
const firstForm = document.getElementById("book-form");
const secondForm = document.getElementById("book-form2");
const thirdForm = document.getElementById("book-form3");

// Personal Information 
const nameInput = document.getElementById("fullName");
const numberInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");

// Room Booking Details
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const adultsInput = document.getElementById("adults");
const childrenInput = document.getElementById("noChildren");
const mealsInput = document.getElementById("mealsKids");
const sroomInput = document.getElementById("singleRooms");
const droomInput = document.getElementById("doubleRooms");
const troomInput = document.getElementById("tripleRooms");

// Extra Requirements
const extraBedsInput = document.getElementById("extraBed");
const wifiInput = document.getElementById("wifi");
const beachInput = document.getElementById("beachView");
const poolInput = document.getElementById("poolView");

// Promocode and Loyalty points
const codeInput = document.getElementById("promocode");
const loyaltyOutput = document.getElementById("loyaltyBox");

//Current and Overall Booking Costs
const currentBooking = document.getElementById("currentBookOutput");
const overallBooking = document.getElementById("overallBookOutput");

// Booking Form Buttons
const loyaltyBtn = document.getElementById("checkBtn");
const bookBtn = document.getElementById("bookNow");

// Adventure Booking Details
const advNameInput = document.getElementById("advName");
const advDropDown = document.getElementById("adventureType");
const advWaterInput = document.getElementById("advWater");
const advBeachInput = document.getElementById("advBeach");
const advSightSeeInput = document.getElementById("advSightSee");
const advLocalAdults = document.getElementById("localAdults");
const advLocalChildren = document.getElementById("localKids");
const advForeignAdults = document.getElementById("foreignAdults");
const advForeignChildren = document.getElementById("foreignKids");
const advGuideAdults = document.getElementById("guideAdults");
const advGuideChildren = document.getElementById("guideKids");

//Current and Overall Adventure Booking Costs
const adventureBooking = document.getElementById("currentAdvOutput");
const overallAdvBooking = document.getElementById("overallAdvOutput");

// Adventure Booking Button
const advBtn = document.getElementById("bookAdv");

// Add to Favourites button
const addFavBtn = document.getElementById("favourites");

// Display Tables
const bookDisplay = document.getElementById("bookTableBody");
const adventureDisplay = document.getElementById("advTableBody");



// ADDING THE EVENT LISTENERS
// Check Loyalty Points Button
loyaltyBtn.addEventListener('click', checkLoyalty);

// Calculate Current Booking Cost
checkinInput.addEventListener('input', calculateBookingCost);
checkoutInput.addEventListener('input', calculateBookingCost);
mealsInput.addEventListener('input', calculateBookingCost);
sroomInput.addEventListener('input', calculateBookingCost);
droomInput.addEventListener('input', calculateBookingCost);
troomInput.addEventListener('input', calculateBookingCost);
extraBedsInput.addEventListener('change', calculateBookingCost);
codeInput.addEventListener('input', calculateBookingCost);

// Calculate Current Adventure Cost
advLocalAdults.addEventListener('input', calculateAdventureCost);
advLocalChildren.addEventListener('input', calculateAdventureCost);
advForeignAdults.addEventListener('input', calculateAdventureCost);
advForeignChildren.addEventListener('input', calculateAdventureCost);
advGuideAdults.addEventListener('input', calculateAdventureCost);
advGuideChildren.addEventListener('input', calculateAdventureCost);

// Add to favourites button
addFavBtn.addEventListener('click', addToFavorites);

// INITIALIZING THE INITIAL VALUES
let totalRooms = 0;
let points = 0;

// Book Now Button - add to table and reset fields
bookBtn.addEventListener('click', () => {
    if(validateForm()) {
        const confirmed = window.confirm("Thank you for your room reservation with Ocean Elegance. Do you want to proceed?");
        if(confirmed){
            addBookTable();
            resetbooking();
    
            const tablePosition = bookDisplay.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: tablePosition,
                behavior: 'smooth'
            });
        }
    }    
});

// Book Adventure Button - add to table, reset fields and display confimation
advBtn.addEventListener('click', () => {
    if(advValidateForm()) {
        const confirmed = window.confirm("Thank you for your adventure booking at Ocean Elegance. Do you want to proceed?");
        if(confirmed){
            addAdvTable();
            resetbooking();

            const tablePosition = adventureDisplay.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: tablePosition,
                behavior: 'smooth'
            });
        }
    }
});

function validateForm() {
    //Personal Information Form
    if (!nameInput.value.trim() || !numberInput.value.trim() || !emailInput.value.trim()) {
        alert("Please fill in all the the fields in the Personal Information section.");
        return false;
    }

    //Room Booking Form
    if(!checkinInput.value.trim() || !checkoutInput.value.trim() || !adultsInput.value.trim()) {
        alert("Please fill in all the fields in the Room Booking section.");
        return false;
    }

    return true;
}

function advValidateForm() {
    // Adventure Booking Form
    if(!advNameInput.value.trim() || !advDropDown.value || !advLocalAdults.value || !advLocalChildren.value || !advForeignAdults.value || !advForeignChildren.value) {
        alert("Please fill in all the fields in the Adventure Booking section.");
        return false;
    }

    return true;
}


// Function to calculate Loyalty Points
function checkLoyalty(event) {
    event.preventDefault(); //Prevents the website from resetting and reloading when check loyalty button is clicked

    const sRooms = parseInt(sroomInput.value)||0;
    const dRooms = parseInt(droomInput.value)||0;
    const tRooms = parseInt(troomInput.value)||0;

    const totalRooms = sRooms + dRooms + tRooms;

    if(totalRooms > 3) {
        points = totalRooms*20;
    }

    loyaltyOutput.innerText = `${points} points`;
}

// Function to calculate the booking cost
function calculateBookingCost() {
    // Constants for booking costs
    const singleRoomCost = 25000;
    const doubleRoomCost = 35000;
    const tripleRoomCost = 40000;
    const mealsCost = 5000;
    const extraBedCost = 8000;

    // Getting the number of days
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    // Calculate the number of days
    const numOfDays = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    // Get the number of rooms and additional costs
    const sRooms = parseInt(sroomInput.value) || 0;
    const dRooms = parseInt(droomInput.value) || 0;
    const tRooms = parseInt(troomInput.value) || 0;
    const kidsMeal = parseInt(mealsInput.value) || 0;
    const extraBeds = extraBedsInput.checked ? extraBedCost : 0;

    // Calculate the total cost
    let currentCost = (sRooms * singleRoomCost + dRooms * doubleRoomCost + tRooms * tripleRoomCost + kidsMeal * mealsCost ) * numOfDays;
    currentCost += extraBeds;

    // Check for promo code and apply discount if applicable
    const promoCode = codeInput.value.trim();
    if (promoCode === 'Promo123') {
        const discount = currentCost * 0.05;
        currentCost -= discount;
    }

    // Display the total cost
    currentBooking.innerText = `LKR ${currentCost.toLocaleString()}`;

    return currentCost;
}

// Function to add booking details to table
function addBookTable(){
    const nameTbl = nameInput.value;
    const checkInTbl = checkinInput.value;
    const checkOutTbl = checkoutInput.value;
    const adultsTbl = adultsInput.value || 0;
    const childrenTbl = childrenInput.value || 0;
    const mealTbl = mealsInput.value || 0;
    const singleTbl = sroomInput.value || 0;
    const doubleTbl = droomInput.value || 0;
    const tripleTbl = troomInput.value || 0;
    const wifiTbl = wifiInput.checked ? 'Yes' : 'No';
    const poolTbl = poolInput.checked ? 'Yes' : 'No';
    const beachTbl = beachInput.checked ? 'Yes' : 'No';
    const extrabedTbl = extraBedsInput.checked ? 'Yes' : 'No';
    const promocodeTbl = codeInput.value ? 'Yes' : 'No';
    const totalbookTbl = calculateBookingCost();

    const details = {
        name: nameTbl,
        checkInDate: checkInTbl,
        checkOutDate: checkOutTbl,
        adults: adultsTbl,
        children: childrenTbl,
        kids: mealTbl,
        single: singleTbl,
        double: doubleTbl,
        triple: tripleTbl,
        wifi: wifiTbl,
        pool: poolTbl,
        beach: beachTbl,
        extraBed: extrabedTbl,
        promocode: promocodeTbl,
        totalCost: totalbookTbl,
    };

    const labels = {
        name: 'Name',
        checkInDate: 'Check-in',
        checkOutDate: 'Check-Out',
        adults: 'Adults',
        children: 'Children',
        kids: 'Above 5 Years',
        single: 'Single Rooms',
        double: 'Double Rooms',
        triple: 'Triple Rooms',
        wifi: 'WiFi',
        pool: 'Pool View',
        beach: 'Beach View',
        extraBed: 'Extra Bed',
        promocode: 'PromoCode',
        totalCost: 'Overall Total',
    };

    const newRow = bookDisplay.insertRow(-1);
    for (const detail in details) {
        const cell = newRow.insertCell();
        cell.textContent = details[detail];
        cell.setAttribute('data-label', labels[detail]);
    };
    
}

// Function to calculate Adventure Booking cost
function calculateAdventureCost() {
    // Constants for adventure costs
    const localAdultCost = 5000;
    const localKidCost = 2000;
    const foreignAdultCost = 10000;
    const foreignKidCost = 5000;
    const guideAdultCost = 1000;
    const guideKidCost = 500;

    // Get the input values
    const localAdults = parseInt(advLocalAdults.value) || 0;
    const localChildren = parseInt(advLocalChildren.value) || 0;
    const foreignAdults = parseInt(advForeignAdults.value) || 0;
    const foreignChildren = parseInt(advForeignChildren.value) || 0;
    const adultGuide= advGuideAdults.checked ? guideAdultCost : 0;
    const kidGuide = advGuideChildren.checked ? guideKidCost : 0;

    // Calculating the current adventure booking cost
    let currentAdvCost =
        localAdults * localAdultCost +
        localChildren * localKidCost +
        foreignAdults * foreignAdultCost +
        foreignChildren * foreignKidCost + adultGuide + kidGuide;

    // Display the current adventure booking cost
    adventureBooking.innerText = `LKR ${currentAdvCost.toLocaleString()}`;

    return currentAdvCost;
}

//Adventure Booking Table
function addAdvTable(){
    const nameAdvTbl = advNameInput.value;
    const dropdownAdvTbl =  advDropDown.value;
    const localadultsAdvTbl = advLocalAdults.value || 0;
    const localkidsAdvTbl = advLocalChildren.value || 0;
    const foreignadultsAdvTbl = advForeignAdults.value || 0;
    const foreignkidsAdvTbl = advForeignChildren.value || 0;
    const guideAdultTbl = advGuideAdults.checked ? 'Yes' : 'No';
    const guideKidTbl = advGuideChildren.checked ? 'Yes' : 'No';
    const totalAdvTbl = calculateAdventureCost();
    
    const details = {
        name: nameAdvTbl,
        dropdown: dropdownAdvTbl,
        localadults: localadultsAdvTbl,
        localkids: localkidsAdvTbl,
        foreignadults: foreignadultsAdvTbl,
        foreignkids: foreignkidsAdvTbl,
        DiveAdult: guideAdultTbl,
        DiveKids: guideKidTbl,
        totalcost: totalAdvTbl,
    };

    const labels = {
        name: 'Name',
        dropdown: 'Adventure',
        localadults: 'Local Adults',
        localkids: 'Local Kids',
        foreignadults: 'Foreign Adults',
        foreignkids: 'Foreign Kids',
        DiveAdult: 'Guide for Adults',
        DiveKids: 'Guide for Kids',
        totalcost: 'Overall Cost',
    };

    const newRow = adventureDisplay.insertRow(-1);
    for (const detail in details) {
        const cell = newRow.insertCell();
        cell.textContent = details[detail];
        cell.setAttribute('data-label', labels[detail]);
    };

}

//Reset Booking
function resetbooking(){
    (firstForm).reset();
    (secondForm).reset();
    (thirdForm).reset();
    
    currentBooking.innerHTML = `LKR 0.00`;
    adventureBooking.innerHTML = `LKR 0.00`;
}

//Function to add to favourites button
function addToFavorites() {
    if (validateForm() && advValidateForm()) {
        const confirmed = window.confirm("Do you want to add this booking to your favourites?");
        if (confirmed) {
            // Save booking details to local storage
            saveBookingToFavorites();

            alert("Booking has been added to your favourites!");

            // Reset the form
            resetbooking();
        }
    }
}


function saveBookingToFavorites() {
    // Retrieve existing favourites from local storage
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Creating a new booking object for room reservation
    const newRoomBooking = {
        type: 'Room Booking',
        name: nameInput.value,
        checkInDate: checkinInput.value,
        checkOutDate: checkoutInput.value,
        adults: adultsInput.value,
        children: childrenInput.value,
        kids: mealsInput.value,
        single: sroomInput.value,
        double: droomInput.value,
        triple: troomInput.value,
        wifi: wifiInput.checked,
        pool: poolInput.checked,
        beach: beachInput.checked,
        extraBed: extraBedsInput.checked,
        promocode: codeInput.value,
        totalCost: calculateBookingCost(),
        loyaltyPoints: points,
    };

    // Creating a new booking object for adventure
    const newAdvBooking = {
        type: 'Adventure Booking',
        name: advNameInput.value,
        adventureType: advDropDown.value,
        localAdults: advLocalAdults.value,
        localChildren: advLocalChildren.value,
        foreignAdults: advForeignAdults.value,
        foreignChildren: advForeignChildren.value,
        guideAdults: advGuideAdults.checked,
        guideChildren: advGuideChildren.checked,
        totalCost: calculateAdventureCost(),
    };

    // Add the new bookings to the favorites
    existingFavorites.push(newRoomBooking, newAdvBooking);

    // Save the updated favourites to local storage
    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
}

// Initial calculation when the page loads
calculateBookingCost();