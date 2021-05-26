const continentSelect = document.getElementById("continent-select")

queryFetch(`
        query{
            continents{
                name
                code
            }
        }
    `)
    .then(data => {
        console.log(data.data.continents);
        data.data.continents.forEach(continent => {
            const option = document.createElement('option')
            option.value = continent.code;
            option.innerText = continent.name;
            continentSelect.append(option)
        })
    })

continentSelect.addEventListener("change", async e => {
    const continentCode = e.target.value
    const countries = await getContinentCountries(continentCode)
})

function getContinentCountries(continentCode) {
    return queryFetch(`
        query getCountries($code: String){
            continent(code: $code){
                countries{
                    name
                }
            }
        }
        `, { code: continentCode }).then(data => {
        console.log(data);
    })
}



function queryFetch(query, variables) {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    }).then(response => response.json())
}