const getToken = (privateKey) => {
    fetch('https://us-central1-pyxy-f84e8.cloudfunctions.net/api/token', {
        method: 'POST',
        headers: {
            'X-Requested-With': 'xmlhttprequest'
        },
        body: {
            key: privateKey,
            ACP: true
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
};

export default getToken;