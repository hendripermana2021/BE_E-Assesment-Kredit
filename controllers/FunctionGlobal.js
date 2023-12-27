const timestamp = "2023-12-24T08:14:59.000Z";
const dateObject = new Date(timestamp);

// Get the date components
const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Month is zero-based
const day = dateObject.getDate();

console.log(year)
console.log(month)
console.log(day)

// Create a formatted date string
const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

console.log(formattedDate);