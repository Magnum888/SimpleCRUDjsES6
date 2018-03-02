let allCards = [];
class CreateCard{
    constructor(optionsCard){
        this._title = optionsCard.inputTitle;
        this._text = optionsCard.inputText;
        this._img = optionsCard.inputImg;
        this._element;
    }
    newElement(){
        let div = document.createElement('div');
        div.className = 'card';
        div.dataset.check = false;
        div.innerHTML = `<img class="card-img" src="img/${this._img}.jpg"><p>Title: ${this._title}</p><p>Text: ${this._text}</p>
            <button class="change-btn" type="submit" data-btn_change="true">Change</button>
            <button class="save-btn" data-btn_save="false">Save</button>`;
        document.getElementById('card-section').appendChild(div);
        this._element = div;
    }
    set title(value){
        this._title = value;
    }
    set text(value){
        this._text = value;
    }
    changeCard(properties = CreateCard.getDefaultInputs()){
        this.title = properties.title;
        this.text = properties.text;
    }
    static getDefaultInputs(){
        return {
            title: 'default_1',
            text: 'default_2'
        }
    }
}

let createOneCard = () => {
    let form = document.forms.inputForm;
    let inputTitle = form.elements.title.value;
    let inputText = form.elements.text.value;
    let inputImg = form.elements.img.value;
    let optionsCard = {
        inputTitle,
        inputText,
        inputImg
    };

    if(optionsCard.inputTitle != "" && optionsCard.inputText != "" && optionsCard.inputImg != ""){
        let card = new CreateCard(optionsCard);
        form.elements.title.value = "";
        form.elements.text.value = "";
        form.elements.img.value = "";
        allCards.push(card);
        card.newElement();

        let changeOneCard = (e) =>{
            e.stopImmediatePropagation();
            e.target.previousElementSibling.dataset.show = true;
            e.target.nextElementSibling.dataset.btn_save = true;
            e.target.dataset.btn_change = false;

            let saveChanges = (e) =>{

                let changeForm = e.target.parentElement.children[3];
                let title = changeForm.children[0].value;
                let text =  changeForm.children[1].value;
                let properties = {
                    title,
                    text
                };
                card.changeCard(properties);
                e.target.parentElement.children[1].innerHTML = `Title: ${title}`;
                e.target.parentElement.children[2].innerHTML = `Text: ${text}`;
                changeForm.children[0].value = "";
                changeForm.children[1].value = "";
                e.target.parentElement.children[3].dataset.show = false;
                e.target.parentElement.children[5].dataset.btn_save = false;
                e.target.parentElement.children[4].dataset.btn_change = true;
            }
            e.target.nextElementSibling.addEventListener('click', saveChanges);

            // e.preventDefault();
            // this.removeEventListener('click', changeOneCard);

        }
        let elementsAll = document.querySelectorAll('.change-btn');
        for (let i = 0; i < elementsAll.length; i++) {
            elementsAll[i].addEventListener('click', changeOneCard);
        }
        console.log(allCards)
    }
}

let deleteAllCard = () => {
    while (document.getElementById('card-section').firstChild) {
        document.getElementById('card-section').removeChild(document.getElementById('card-section').firstChild);
    }
}
let deleteOneCard = (e) => {
    let elem = document.getElementById('card-section').children;
    for(let i = 0; i < elem.length; i++){
        if(document.querySelector('[data-check="true"]')){
            document.querySelector('[data-check="true"]').remove();
        }
    }
}
let checkCard = (e) => {
    if(e.ctrlKey || e.metaKey){
        if(e.target.parentElement.dataset.check != true){
            e.target.parentElement.dataset.check = true;
        }
    }else{
        let cardN = document.querySelectorAll('.card');
        for(let i = 0; i < cardN.length; i++){
            cardN[i].dataset.check = false;
        }
        if(e.target.parentElement.dataset.check){
            e.target.parentElement.dataset.check = true;
        }
    }
}

document.querySelector('.add').addEventListener('click', createOneCard);
document.querySelector('.deleteAll').addEventListener('click', deleteAllCard);
document.querySelector('.delete').addEventListener('click', deleteOneCard);
document.querySelector('#card-section').addEventListener('click', checkCard);