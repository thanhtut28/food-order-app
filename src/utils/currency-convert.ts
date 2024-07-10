/**
 * @description Convert dollars to cents to calculate currency precisely
 * @param {number} dollars
 * @returns {number}
 */
export function toCents(dollars: number): number {
   return Math.round(dollars * 100);
}

/**
 * @description Convert cents to dollars to calculate currency precisely
 * @param {number} cents
 * @returns {number}
 */
export function toDollars(cents: number): number {
   return +(cents / 100).toFixed(2);
}
