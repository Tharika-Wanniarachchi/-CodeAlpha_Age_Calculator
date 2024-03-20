// Function to calculate age
const ageCalculator = () => {
    // Get today's date
    const today = new Date();
    // Get the birthdate from the input field
    const inputDate = new Date(document.getElementById("inputDate").value);

    // Extract year, month, and day from today's date
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Note: January is 0
    const currentDate = today.getDate();

    // Create an object to hold birthdate details
    const birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1, // Note: January is 0
        year: inputDate.getFullYear(),
    };

    // Check if the birthdate is in the future
    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        // Display an alert for invalid future date
        alert("Invalid Date! Not Born Yet");
        // Display placeholders for age
        displayResult("--", "--", "--");
        return;
    }

    // Calculate age
    const { years, months, days } = calculateAge(
        birthDetails,
        currentYear,
        currentMonth,
        currentDate
    );

    // Display the calculated age
    displayResult(days, months, years);
};

// Function to check if the date is in the future
const isFutureDate = (
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
) => {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth &&
                    birthDetails.date > currentDate
                )
            )
        )
    );
};

// Function to calculate age
const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    // Calculate the difference in years, months, and days
    let years = currentYear - birthDetails.year;
    let months = currentMonth - birthDetails.month;
    let days = currentDate - birthDetails.date;

    // Adjust months and days if necessary
    if (days < 0) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days += daysInLastMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
};

// Function to get the number of days in a month
const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
};

// Function to display the calculated age
const displayResult = (bdate, bmonth, byear) => {
    document.getElementById("years").textContent = byear;
    document.getElementById("months").textContent = bmonth;
    document.getElementById("days").textContent = bdate;
};

// Event listener for the calculate age button
document.getElementById("calAgeBtn").addEventListener("click", ageCalculator);

