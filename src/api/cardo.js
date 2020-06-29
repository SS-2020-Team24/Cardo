const cardBaseUrl = 'http://192.168.42.179:8163/api';
// const cardBaseUrl = 'http://cardo-sever2-dev.us-east-1.elasticbeanstalk.com/api';

export function pushCardo(cardo) {
    let url = `${cardBaseUrl}/card`;
    // console.log(JSON.stringify(cardo));
    console.log(`Making POST request to: ${url}`);
    console.log("gg");
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardo)
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        // console.log("success");
        // console.log(res.json());
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
