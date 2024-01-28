// Formats a date "startDate": "2024-01-28T18:29:56.277Z", to dd.mm.yyyy
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};
