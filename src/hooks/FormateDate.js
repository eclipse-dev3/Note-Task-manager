// Format full date + time
export function FormatDateShort(dateString) {
    const date = new Date(dateString);

    if (isNaN(date)) return "Invalid date";

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

// Format short date
export function FormatDate(dateString) {
    const date = new Date(dateString);

    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    return date.toLocaleString('en-US', options).replace(',', '');
}

