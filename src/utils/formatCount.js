export const formatCount = (totalCount) => {

    if (!totalCount || isNaN(totalCount) || totalCount < 0) {
        return '0'
    }

    const billion = 1000000000
    const million = 1000000
    const thousand = 1000

    if (totalCount >= billion) {
        return (totalCount / billion).toFixed(1) + 'B'
    }
    
    if (totalCount >= million) {
        return (totalCount / million).toFixed(1) + 'M'
    }
    
    if (totalCount >= thousand) {
        return (totalCount / thousand).toFixed(1) + 'K'
    }

    return totalCount.toString()
};