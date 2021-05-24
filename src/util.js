export const sortData = (data) => {
    let sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

// can also write as:
// return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

// RETURNING -1 IS EQUIVALENT TO RETURNING FALSE
// RETURNING 1 IS EQUIVALENT TO RETURNING TRUE