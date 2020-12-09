//ALL API CALLS
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

export async function getBookings() {
    //später api/bookings mit isRedeemed
    const response = await fetch("/api/visitors",
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
    return {result, s_authToken};
}

export async function getRedeemBooking(verificationCode) {
    const response = await fetch("/api/bookings/redeem",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem("s_authToken")
            },
            body: JSON.stringify({
                //zum testen 000000003C2A <-- aus dem beispielbuchungen
                "verificationCode": verificationCode,
            })
        });
    const result = await response.json();
    return result;
}

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
                "maxSpaces": matchData.i_maxSpaces,
                "isCancelled": matchData.b_isCancelled
            })
        });
    const result = await response.json();
    return result;
}






