async function fetcher(type, number) {
    let fetched = {
        name: "ERROR"
    }
    try {
        const response = await fetch(`https://swapi.dev/api/${type}/${number}/`)
        const data = await response.json()
        fetched = data
    } catch {
        console.log("Invalid parameters, using error object.")
    } finally {
        return fetched
    }
}
fetcher("planets", 1).then(x => console.log(x))
