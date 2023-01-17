/* eslint-disable prettier/prettier */
const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (f, ...args) => {
        // ei args hocche shei argument gula jegula handleSearch recieve kore
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
            fn(args); // handleSearch er argument doSearch er parameter hishebe pass kora holo. 
        }, delay);
    };
};

const doSearch = (value) => {
    console.log(value);
};

const handleSearch = debounceHandler(doSearch, 500);

handleSearch(1,2,3);