fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function (res){  return res.json() } ).then( function(data) {console.log(data)})


function populeteUFs() {

    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res =>  res.json() )
    .then( states => {
        
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populeteUFs();

function getCities(event) {
    const ufcities = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufvalue = event.target.value;

    stateInput.value = event.target.options[event.target.selectedIndex].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`;

    ufcities.innerHTML= "<option value> Selecione a Cidade </option>";
    ufcities.disabled = true;

    fetch(url).then( res =>  res.json() )
    .then( cities => {
        

        for(const city of cities){
            ufcities.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        ufcities.disabled = false;
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change",getCities)

// itens de coleta

const itensdeColeta = document.querySelectorAll(".itens-grid li");

for(const item of itensdeColeta){
    item.addEventListener("click",handleSelectedItem);
}

const collecteditens = document.querySelector("input[name=itens]")

let selectedItens = [];

function handleSelectedItem(event){

    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemID = event.target.dataset.id;

    const alredySelected = selectedItens.findIndex( item => item == itemID)

    if(alredySelected >= 0){
        const filterItems = selectedItens.filter( item => {
            const ItemIsDifferent = item != itemID;
            return ItemIsDifferent;
        } )

        selectedItens = filterItems;
    }else{
        selectedItens.push(itemID);
    }

    collecteditens.value = selectedItens;

 

    console.log(event.target.dataset.id)
}
