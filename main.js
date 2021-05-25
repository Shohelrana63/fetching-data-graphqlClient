fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
        query{
            continents{
                name
            }
        }
    `
    })
}).then(response => response.json())
    .then(data => {
        console.log(data.data.continents);
    })