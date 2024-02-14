const FormatDate =  {

    toDay: (date: Date) => {
        const day = date.getDate();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    },

    toHour: (date: Date) => {
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`
    }

}

export default FormatDate;