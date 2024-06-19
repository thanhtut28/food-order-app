/**
 * To simulate slower operations
 * @returns promise delay
 */
export async function delay() {
   return new Promise(resolve => setTimeout(resolve, 2000));
}
