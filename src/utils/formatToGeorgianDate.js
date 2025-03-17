const formatToGeorgianDate = (dateString) => {
    const georgianMonths = [
        "იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ",
        "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = georgianMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;s
};


export default formatToGeorgianDate;