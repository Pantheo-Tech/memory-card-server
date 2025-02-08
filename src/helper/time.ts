export function getCurrentHour() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function getCurrentDate() {
    const date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${year}/${(month < 10 ? '0' : '') + month}/${(day < 10 ? '0' : '') + day}`;
}