//ALL REUSE HELPER FUNCTIONS
/**
 * @module Helpers
 */


/**
 * Checks value using regexp
 * @param {String} regexp Contains value constraints
 * @param {String} value contains value to be checked
 */
export function checkRegex(regexp, value) {
    if (value) {
        value = value.trim();
        const o_Regex = new RegExp(regexp)
        if (!o_Regex.test(value)) {
          return "Ungültig";
        }
    }
}
/**
 * 
 * @param {Object} formData 
 * @returns {Object} 
 */
export function trimFormData(formData) {
    Object.keys(formData).map(key => formData[key] = typeof formData[key] == "string" ? formData[key].trim() : formData[key]);
    return formData; 
}
/**
 * 
 * @param {*} dateISO 
 * @returns {Object} s_time Returns a string saying "um (Time in 24h fromat)"
 *                    s_formattedDate Returns Date in DD.MM.YYYY format
 */
export function formatDateTime(dateISO) {
    const o_dateObj = new Date(dateISO);
    const s_time = " um " + o_dateObj.toTimeString().substring(0, 5);
    const s_formattedDate = o_dateObj.getDate() + "." + (o_dateObj.getMonth() + 1) + "." + o_dateObj.getFullYear();
    return { s_time, s_formattedDate}
}