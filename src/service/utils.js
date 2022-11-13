export const formatDate = (date) => {
    const calendar = date.split('T')[0].split('-')
    let newDate = `${calendar[2]}/${calendar[1]}/${calendar[0].slice(2)}`

    return newDate
}