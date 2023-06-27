const URL_NAME = 'https://api.thecatapi.com/v1/breeds';


export function fetchBreeds(){
    fetch('https://api.thecatapi.com/v1/breeds').then(res=>{
        if(!res.ok){
            throw new Error(res.status)
        }
console.log(res);
return res.json();
}).then(data=> console.log(data)).catch(err=>{
    console.warn()
})
};

export function fetchCatByBreed(breedId){
    fetch()then(res=>{
        if(!res.ok){
            throw new Error(res.status)
        }
console.log(res);
return res.json();
}).then(data=> console.log(data)).catch(err=>{
    console.warn()
})