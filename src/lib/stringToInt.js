const stringToInt = (str)=>{
    try {
        const number = parseInt(str);
        if(isNaN(number)){
            return -1;
        }
        return number;
    } catch (error) {
        return -1;
    }
};

export default stringToInt;