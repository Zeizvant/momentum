function formatDateToGeorgianDateWithDay(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Define Georgian day abbreviations
    const georgianDays = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getUTCDay();

    // Get the Georgian day abbreviation
    const georgianDay = georgianDays[dayOfWeek];

    // Get the day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are 0-indexed, so add 1
    const year = date.getUTCFullYear();

    // Format the date as "ორშ - 02/2/2025"
    const formattedDate = `${georgianDay} - ${month}/${day}/${year}`;

    return formattedDate;
}

export default formatDateToGeorgianDateWithDay;