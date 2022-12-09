let countryDetailes = document.querySelector(".countryDetailes .container")
let backBTN = document.querySelector(".btn-back")
let nameCount = JSON.parse(localStorage.getItem("countryName"))

// function moreDetails(index){
//     fetch("https://restcountries.com/v3.1/all")
//     .then(res => res.json())
//     .then(data =>displayCountryMoreInfo(nameCount))
// }

function displayCountryMoreInfo(nameCount) {
    let countryName = nameCount
    let newCountryInfo = ""
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let name = data[0].name.common
            let nativeName = Object.entries(data[0].name.nativeName)[0][0]
            let population = data[0].population
            let region = data[0].region
            let subRegion = data[0].subregion
            let capital = data[0].capital[0]
            let currencies = Object.entries(data[0].currencies)[0][0]
            let languages = Object.entries(data[0].languages)[0]
            let borders = data[0].borders

            newCountryInfo += `
        <a class="btn-back">Back</a>
        <div class="countryInfos">
        <div class="country-image">
            <img src="${data[0].flags.svg}" alt="">
        </div>
        <div class="country-info">
            <div class="countryName">${name}</div>
            <div class="country-details">
                <div>
                    <div>Native Name: <span class="nativeName">${nativeName}</span></div>
                    <div>Population: <span class="population">${population}</span></div>
                    <div>Region: <span class="region">${region}</span></div>
                    <div>Sub Region: <span class="subRegion">${subRegion}</span></div>
                </div>
                <div>
                    <div>Capital: <span class="capitalname">${capital}</span></div>
                    <div>Currencies: <span class="currencies">${currencies}</span></div>
                    <div>Languages: bla, bla, bla</div>
                </div>
            </div>
            <div class="bordersDiv">
            <div>
            Border Countries:
            </div>
            </div>
        </div>
    </div>
        `
            let bordersList = ""
            borders.forEach(element => {
                bordersList += `

                <div class="borders-btns">
                    <button class="btn">${element}</button>
                </div>
        `
            });
            console.log(borders)
            countryDetailes.innerHTML = newCountryInfo
            let bordersDiv=document.querySelector(".bordersDiv")
            bordersDiv.innerHTML=bordersList
            let backBTN = document.querySelector(".btn-back")
            backBTN.addEventListener("click", function () {
                window.location = "./index.html"
            })
        })
}

displayCountryMoreInfo(nameCount)