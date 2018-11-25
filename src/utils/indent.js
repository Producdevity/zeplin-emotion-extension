/**
 *
 * @param {number} spaces
 * @return {function(*): string}
 */
const indent = (spaces = 4) => text => `${text.padStart(text.length + spaces, ' ')}`

export default indent
