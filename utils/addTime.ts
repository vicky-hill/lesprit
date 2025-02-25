const addTime = (rating: number): any => {
    let result = new Date();
    switch (rating) {
        case 0:
            result.setHours(result.getHours() + 7);
            return result;
        case 1:
            result.setHours(result.getHours() + 14);
            return result;
        case 2:
            result.setDate(result.getDate() + 1);
            return result;
        case 3:
            result.setDate(result.getDate() + 3);
            return result;
        case 4:
            result.setDate(result.getDate() + 7);
            return result;
        case 5:
            result.setDate(result.getDate() + 14);
            return result;
        case 6:
            result.setDate(result.getDate() + 21);
            return result;
        case 7:
            result.setMonth(result.getMonth() + 1);
            return result;
        case 8:
            result.setMonth(result.getMonth() + 2);
            return result;
        case 9:
            result.setMonth(result.getMonth() + 3);
            return result;
        case 10:
            result.setMonth(result.getMonth() + 4);
            return result;
        case 11:
            result.setMonth(result.getMonth() + 5);
            return result;
        case 12:
            result.setMonth(result.getMonth() + 6);
            return result;
        case 13:
            result.setMonth(result.getMonth() + 7);
            return result;
        case 14:
            result.setMonth(result.getMonth() + 8);
            return result;
        case 15:
            result.setMonth(result.getMonth() + 9);
            return result;
        case 16:
            result.setMonth(result.getMonth() + 10);
            return result;
        case 17:
            result.setMonth(result.getMonth() + 11);
            return result;
        default:
            result.setMonth(result.getMonth() + 12);
            return result;
    }
}

export default addTime;