const formatData = (date) => {
    return new Intl.DateTimeFormat().format(new Date(date));
};

export default formatData;