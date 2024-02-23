import moment from "moment";

const formatDate = (data) => {
    const result = moment(data).format('DD-MM-YYYY');
    return result;
};

export const DateHelper = {
    formatDate
}