//ALL API CALLS
/**
 * @module ApiRequests
 */

/**
 * fetches data from api - gets all matches
 * @returns {Object}
 */
export async function getAllMatches() {
    const response = await fetch("/api/matches",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    const result = await response.json();
    return result;
}

/**
 * fetches data from api - gets all matches
 * @returns {Object} returns all match data
 */
export async function getNextMatch() {
    const response = await fetch("/api/nextMatch",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    const result = await response.json();
    return result;
}

/**
 * fetches data from api - gets all bookings
 * @returns {Object} returns all booking data
 */
export async function getBookings() {
    //später api/bookings mit isRedeemed
    const response = await fetch("/api/bookings",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            }
        });
    const result = await response.json();
    return result;
}

/**
 * fetches data from api - gets one specific match
 * @param {String} id contains match id to be fetched
 * @returns {Object} returns data from the specific match
 */
export async function getMatchById(id) {
    const response = await fetch("/api/matches/" + id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
    const result = await response.json();
    return result;
}


/**
 * posts data to api - posts booking data for a match
 * @param {String} matchDataId contains match id
 * @param {Object} formData contains data to be posted
 * @returns {Object} returns the booking with an id added to it as a confirmation
 */
export async function postBooking(matchDataId, formData) {
    const response = await fetch("/api/bookings",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                "matchId": matchDataId.toString(),
                "fName": formData.s_firstName,
                "lName": formData.s_surname,
                "city": formData.s_city,
                "postcode": formData.s_postcode,
                "street": formData.s_street,
                "houseNumber": formData.s_houseNr,
                "phoneNumber": formData.s_telNr,
                "eMail": formData.s_email
            })
        });
    const result = await response.json();
    return result;
}

/**
 * Gets login information for authentification
 * @param {String} username contains entered username
 * @param {String} password contains entered password
 * @returns {Object} returns an authentification token and the api response
 */
export async function getLogin(username, password) {
    const s_authToken = "Basic " + new Buffer(username + ":" + password).toString("base64");
    const response = await fetch("/api/isAdmin",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": s_authToken
            }
        });
    const result = await response.json();
    return { result, s_authToken };
}

/**
 * Redeems a booking
 * @param {String} verificationCode
 * @returns {Object} returns the booking with an id added to it as a confirmation
 */
export async function redeemBooking(verificationCode) {
    const response = await fetch("/api/bookings/redeem",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            },
            body: JSON.stringify({
                "verificationCode": verificationCode,
            })
        });
    const result = await response.json();
    return result;
}

/**
 * posts a new match to the api to be added in the backend
 * @param {Object} matchData contains the match to be added
 * @returns {Object} returns the match as a confirmation
 */
export async function postNewMatch(matchData) {
    const response = await fetch("/api/matches",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            },
            body: JSON.stringify({
                "opponent": matchData.s_opponent,
                "date": matchData.s_dateTime,
                "maxSpaces": matchData.n_maxSpaces,
                "isCancelled": matchData.b_isCancelled
            })
        });
    const result = await response.json();
    return result;
}

/**
 * Updates a match in the database via the api (PUT)
 * @param {Object} matchData contains the chainged match data
 * @param {Number} matchId contains the match id of the match that should be changed
 * @returns {Object} returns the matchdata as a confirmation
 */
export async function putExistingMatch(matchData, matchId) {
    const response = await fetch("/api/matches/" + matchId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            },
            body: JSON.stringify({
                "opponent": matchData.s_opponent,
                "date": matchData.s_dateTime,
                "maxSpaces": matchData.n_maxSpaces,
                "isCancelled": matchData.b_isCancelled
            })
        });
    const result = await response.json();
    return result;
}

/**
 * Deletes an existing match
 * @param {Number} matchId contains the id of the match that should be deleted
 * @returns {Object} returns the deleted object
 */
export async function deleteExistingMatch(matchId) {
    const response = await fetch("/api/matches/" + matchId,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            }
        });
    const result = await response.json();
    return result;
}

/**
 * fetches all bookings for a specific match
 * @param {Number} id contains the match id
 * @returns {Object} returns a booking object containing all bookings for a matchday
 */
export async function getBookingsByMatchId(id) {
    const response = await fetch("/api/matches/" + id + "/redeemedBookings",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            }
        });
    const result = await response.json();
    return result;
}

/**
 * Deletes any booking that is older then 28 days
 * @returns {Array} returns all deleted bookings 
 */
export async function deleteOldBookings() {
    const response = await fetch("api/bookings/overdue",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            }
        });
        const result = await response.json(); 
        return result; 
}







