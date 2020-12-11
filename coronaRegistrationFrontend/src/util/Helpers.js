//ALL REUSE HELPER FUNCTIONS

export function checkRegex(regexp, value) {
    if (value) {
        value = value.trim();
        const o_Regex = new RegExp(regexp)
        if (!o_Regex.test(value)) {
          return "Ungültig";
        }
    }
}

export function trimFormData(formData) {
    Object.keys(formData).map(key => formData[key] = typeof formData[key] == "string" ? formData[key].trim() : formData[key]);
    return formData; 
}

export function formatDateTime(dateISO) {
    const o_dateObj = new Date(dateISO);
    const s_time = " um " + o_dateObj.toTimeString().substring(0, 5);
    const s_formattedDate = o_dateObj.getDate() + "." + (o_dateObj.getMonth() + 1) + "." + o_dateObj.getFullYear();
    return { s_time, s_formattedDate}
}