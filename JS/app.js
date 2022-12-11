let countriesContainer = document.querySelector(".countries .container ")
let countryDetailes = document.querySelector(".countryDetailes .container")
let filterNameInput = document.querySelector(".filterNameInput")
let selectRegions = document.querySelector("#selectRegions")
function getCountryInfo() {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => displayCountryInfo(data))
}

function displayCountryInfo(infos) {

    let countryInfo = ""
    infos.forEach((info, i) => {
        countryInfo += ` 
    <div class="country">
    <a class="country-image" onclick=moreDetails(${i})>
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

filterNameInput.addEventListener("input", function () {
    let searchName = filterNameInput.value
    if(searchName.length>0){
    fetch(`https://restcountries.com/v3.1/name/${searchName}`)
        .then(res => res.json())
        .then(data => {
            if (!data.length) {
                countriesContainer.innerHTML = `<div class="errorContainer"><span class="errorContent">No İnformation Found</span></div>`
            } else {
                getData()
            }
        })
    }else{
        getCountryInfo()
    
    }
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
            option.classList.add(".option")
            option.innerHTML = element
            option.value = index
            selectRegions.appendChild(option)
        })
    })
}
let region
async function changeRegion(e) {
    await getRegions().then(res => {
         {region = res[e.value] }})
    fetch(` https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => { 
            console.log(e.value)
        displayCountryInfo(data)
        })
}
function getData (){
    let filteredCountryList = [];
    countriesContainer.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => {
            data.forEach(function (element) {
                    if (filterNameInput.value.length> 0) {
                        let filterName = filterNameInput.value;
                        if(selectRegions.value=="All"){
                            if (element.name.common.toLowerCase().includes(filterName.toLowerCase())) {
                                     filteredCountryList.push(element);       
                            } 
                        }else{
                            if (element.name.common.toLowerCase().includes(filterName.toLowerCase())) {
                                if((element.region==region)){
                                     filteredCountryList.push(element);
                                }    
                            }
                        }
                    }  
            })
            displayCountryInfo(filteredCountryList);
        })
}
displayRegions()
getCountryInfo()

function moreDetails(index) {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            console.log(data[index].name.common)
            localStorage.setItem("countryName", JSON.stringify(data[index].name.common))
            window.location = "./description.html"
        })

}
