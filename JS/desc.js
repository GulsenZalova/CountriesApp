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
            let name = data.name
            let nativeName = Object.entries(data[0].name.nativeName)[0][0]
            let population = data[0].population
            let region = data[0].region
            let subRegion = data[0].subregion
            let capital = data[0].capital[0]
            let currencies = Object.entries(data[0].currencies)[0][0]
            let languages = Object.entries(data[0].languages)[0]
            let borders = data[0].borders
            console.log(borders)
            newCountryInfo += `
        <a class="btn-back">Back</a>
        <div class="countryInfos">
        <div class="country-image">
            <img src="${data[0].flags.svg}" alt="">
        </div>
        <div class="country-info">
            <div class="countryName">${countryName ? countryName : ""}</div>
            <div class="country-details">
                <div>
                    <div>Native Name: <span class="nativeName">${nativeName ? nativeName : ""}</span></div>
                    <div>Population: <span class="population">${population ? population : ""}</span></div>
                    <div>Region: <span class="region">${region ? region : ""}</span></div>
                    <div>Sub Region: <span class="subRegion">${subRegion ? subRegion :""}</span></div>
                </div>
                <div>
                    <div>Capital: <span class="capitalname">${capital ? capital : ""}</span></div>
                    <div>Currencies: <span class="currencies">${currencies ? currencies : ""}</span></div>
                    <div class="languages">

                    </div>
                </div>
            </div>
            <div class="bordersDiv">
            </div>
        </div>
    </div>
        `
            let bordersList = "Border Countries:"
            if(borders){
                borders.forEach(element => {
                    bordersList += `
                    <div class="borders-btns">
                        <button class="btn btn-border">${element}</button>
                    </div>
            `
                });
            }else{
                bordersList+=` This country has no borders`
            }
            let languagesList="Languages: "
            languages.forEach((language)=>{
                languagesList+= `
                <span class="btn"> ${language}</span> 
                `
            })

            countryDetailes.innerHTML = newCountryInfo
            let bordersDiv=document.querySelector(".bordersDiv")
            let languagesDiv=document.querySelector(".languages")
            let backBTN = document.querySelector(".btn-back") 
            languagesDiv.innerHTML=languagesList
            bordersDiv.innerHTML=bordersList
            backBTN.addEventListener("click", function () {
                window.location = "./index.html"
            })

            let btnBorders=document.querySelectorAll(".btn-border")
            btnBorders.forEach((btnBorder)=>{
                btnBorder.addEventListener("click",function(){
                  let borderCountry=btnBorder.innerHTML
                  fetch(`https://restcountries.com/v3.1/name/${borderCountry}`)
                  .then(res=>res.json())
                  .then(data=>displayCountryMoreInfo(borderCountry))
                })
            })

        })
}

displayCountryMoreInfo(nameCount)