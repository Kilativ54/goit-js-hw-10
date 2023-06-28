import '/node_modules/slim-select/dist/slimselect.css';
const URL_NAME = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_p5niNW4OOHNLdJ3o6FW7N5biXaHczYp83ylEmkqFRAsQJPeqoS7SJbu2tpmQTRFt';



export function fetchBreeds(){
   return fetch(`${URL_NAME}/breeds?api_key=${API_KEY}`).then(res=>{
        if(!res.ok){
            throw new Error('Oops! Something went wrong! Try reloading the page!')
        }
return res.json();
})
};


export function  fetchCatByBreed(breedId) {
    return fetch(`${URL_NAME}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
       .then(response => {
        if(!response.ok) {
            throw new Error ('Oops! Something went wrong! Try reloading the page!')
        }
        return response.json();
    }) 
}

