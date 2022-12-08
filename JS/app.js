let countriesContainer=document.querySelector(".countries .container")

function getCountryInfo(){
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(data=>displayCountryInfo(data))
}

function displayCountryInfo(infos){
    let countryInfo=""
    infos.forEach(info => {
        console.log(info)
        countryInfo+=` 
        <div class="country">
        <div class="country-image">
            <img src="${info.flags.svg}" class="country-img" alt="">
        </div>
        <div class="country-info">
            <div><span class="country-name">${info.name.common}</span></div>
            <div>Population: <span class="country-population">${info.population}</span></div>
            <div>Region: <span class="country-region">${info.region}</span></div>
            <div>Capital: <span class="country-capital">${info.capital[0]}</span></div>
        </div>
    </div>    
        `

    countriesContainer.innerHTML=countryInfo
    });
}

getCountryInfo()
