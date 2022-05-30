() => {
let uri = "https://api.coinranking.com/v2/coins";

let h = new Headers();

// add new entry to the header
h.append("x-access-token", "coinrankingf4f50f46ee7fff173f7a0c22cdb44bf2369f30d9f4983ab5")

// add
// h.set()
let req = new Request(uri, {
        method: "GET",
        headers: h,
        mode: 'cors',
});


fetch(req)
        .then( (response)=>{
                if(response.ok){
                        return response.json();
                } else {
                        throw new Error('Uh oh');
                }
        })
        .then( (jsonData) =>{
                console.log(jsonData)
                return jsonData
        })
        .catch( (err) =>{
                console.log(err.message);
        });

}