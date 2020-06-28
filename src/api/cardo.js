const cardBaseUrl = 'http://172.20.10.3:8050/api';

export function pushCardo(text) {
    let url = `${cardBaseUrl}/card`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
            console.log("abcddddd")

        return res.json();
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
        throw error;
    });
}

export function pullCardo(id) {
    let url = `${cardBaseUrl}/card?id=${id}`;

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
    });
}
