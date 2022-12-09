let countriesContainer = document.querySelector(".countries .container ")
let countryDetailes=document.querySelector(".countryDetailes .container")
let filterNameInput = document.querySelector(".filterNameInput")
let selectRegions = document.querySelector("#selectRegions")

function getCountryInfo() {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => displayCountryInfo(data))
}

function displayCountryInfo(infos) {
    let countryInfo = ""
    infos.forEach((info,i)=> {

        countryInfo += ` 
<div class="country">
<a href="description.html" class="country-image" onclick=moreDetails(${i})>
    <img src="${info.flags.svg}" class="country-img" alt="">
</a>
<div class="country-info">
    <div><span class="country-name">${info.name.common}</span></div>
    <div>Population: <span class="country-population">${info.population}</span></div>
    <div>Region: <span class="country-region">${info.region}</span></div>
    <div>Capital: <span class="country-capital">${info.capital}</span></div>
</div>
</div> 
        `
        countriesContainer.innerHTML = countryInfo
    });
}

filterNameInput.addEventListener("keyup", function () {
    let searchName = filterNameInput.value
    fetch(`https://restcountries.com/v3.1/name/${searchName}`)
        .then(res => res.json())
        .then(data => {
            displayCountryInfo(data)
        })
})

async function getRegions() {
    let resgions = []
    await fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data =>
            data.forEach(element => {
                if (!resgions.includes(element.region)) {
                    resgions.push(element.region)
                }
            }))
    return resgions
}

function displayRegions() {
    getRegions().then(res => {
        res.forEach((element, index) => {
            let option = document.createElement("option")
            option.innerHTML = element
            option.value = index
            selectRegions.appendChild(option)
        })
    })

}
async function changeRegion(e) {
    let region
    await getRegions().then(res => { region = res[e.value] })
    fetch(` https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => displayCountryInfo(data))
}


displayRegions()
getCountryInfo()


function moreDetails(index){
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data =>displayCountryMoreInfo(data[index].name.common))
}

function displayCountryMoreInfo(country){

    let countryName=country
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(res=>res.json())
    .then(data=>{
        let newCountryInfo=""
        let name=data[0].name.common
        let nativeName=Object.entries(data[0].name.nativeName)[0][0]
        let population=data[0].population
        let region=data[0].region
        let subRegion=data[0].subregion
        let capital=data[0].capital[0]
        let currencies=Object.entries(data[0].currencies)[0][0]
        let languages=Object.entries(data[0].languages)[0]
        let borders=data[0].borders

        newCountryInfo+=`
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
            <div class="borders">
                <div>
                    Border Countries:
                </div>
                <div class="borders-btns">
                    <button class="btn">France</button>
                    <button class="btn">Germany</button>
                    <button class="btn">Spain</button>
                </div>
            </div>
        </div>
    </div>
        `
        countryDetailes.appendChild(newCountryInfo)
    })

}













