// Filter array from value and key
export function filterInArrays(value, array, data, isArray = true) {
    if (!value) {
        return data
    }
    return isArray ? data.filter(item => item[array].filter(g => g === value).length > 0) : data.filter(item => item[array] === value)
}

// Order array from key
export function orderArrays(data, asc = true, key = null) {
    return data.sort((a, b) => {
        if (key) {
            return asc ? a[key] - b[key] : b[key] - a[key]
        } else {
            return asc ? a - b : b - a
        }
    })
}

// Extract values from an object field
export function getValues(data, key, isArray = true) {
    const values = []
    data.forEach(d => {
        if (isArray) {
            d[key].forEach(item => {
                if (!values.find(i => i === item)) {
                    values.push(item)
                }
            });
        } else {
            if (d[key] && !values.find(i => i === d[key])) {
                values.push(parseFloat(d[key]))
            }
        }
    });
    return values
}