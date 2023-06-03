import "../src/sass/style.scss";

class API_breeds {
    constructor(){
        this.adress = 'https://dog.ceo/api';
        this.randomImage();
        this.listBreeds();
        // this.writeBreeds = this.writeBreeds.bind(this)()
        this.renderInput()
    }
    // dodawanie zdjecia
    addImage(src){ 
        const img = document.querySelector('img');
        img.setAttribute('src', src)
    };
    // wyświetlanie zdjecia klikanej rasy
    clickItem(){
        const listItem = document.body.querySelectorAll('.item-breed');
        listItem.forEach (item => {
            item.addEventListener('click', ()=>{
                const breed = item.textContent;
                if (!document.querySelector('.titleBreed')) {
                        let titleBreed = document.createElement('h1');
                        titleBreed.setAttribute('class', 'titleBreed');
                        titleBreed.textContent = breed;
                        titleBreed.style.textTransform = 'uppercase'
                        document.querySelector('.open').appendChild(titleBreed);
                }else {
                    document.querySelector('.titleBreed').textContent = breed;
                    }
                let values = this.getValueClick(breed);
                if(values.length === 2){
                    this.myBreed(values[0], values[1]);
                }else{
                    this.myBreed(values);
                }
                window.scrollTo({
                    top: 280,
                    behavior: 'smooth'
                  });
            });
        })
    };
    // wyświetlanie wpisanej rasy
    writeBreeds(){
        let breed = this.getValueInput()
        if (!breed) {
            return
        }else if (!document.querySelector('.titleBreed')) {
            let titleBreed = document.createElement('h1');
            titleBreed.setAttribute('class', 'titleBreed');
                if(breed.length === 2){
                    titleBreed.textContent = breed.join(' ');
                    this.myBreed(breed[0].toLowerCase(), breed[1].toLowerCase());
                    console.log(`dwa słowa: ${breed.join(' ')}`);
                }else {
                    titleBreed.textContent = breed;
                    this.myBreed(breed.toLowerCase());
                    console.log(`jedno słowo: ${breed}`);
                };
            titleBreed.style.textTransform = 'uppercase';
            document.querySelector('.open').appendChild(titleBreed);
            breed = '';
        }else {
            let titleBreed = document.querySelector('.titleBreed')
            if(breed.length === 2){
                titleBreed.textContent = breed.join(' ');
                this.myBreed(breed[0].toLowerCase(), breed[1].toLowerCase());
                console.log(`nadpisuje dwa słowa: ${breed.join(' ')}`);
            }else {
                titleBreed.textContent = breed;
                this.myBreed(breed.toLowerCase());
                console.log(`nadpisuje jedno słowo: ${breed}`);
            };
        }
                
            
                window.scrollTo({
                    top: 200,
                    behavior: 'smooth'
                  });
    };
    renderInput(){
        document.body.addEventListener('submit',(e)=>{
            e.preventDefault()
            this.writeBreeds()
        });
    }
    // wyświetlanie losowego zdjęcia
    randomImage() {
        fetch(`${this.adress}/breeds/image/random`)
            .then(data=>data.json())
            .then(image=>this.addImage(image.message))

            .catch(error => console.log("Błąd: ", error))          
    };
    // dadawanie ras na strone
    addListBreeds(breed, subBreed=0, section) {
        const El1 = document.createElement('div');
        El1.setAttribute('class', 'item-breed');
        if (subBreed.length > 0){
            El1.textContent = `${breed} ${subBreed}`;
            section.appendChild(El1);
        }else{
            El1.textContent = breed;
            section.appendChild(El1);
        }
    };
    // pobieranie listy ras z API
    listBreeds() {
        fetch(`${this.adress}/breeds/list/all`)
            .then(data=>data.json())
            .then(json=>json.message)
            .then(listBreeds=>{
                for (const breed in listBreeds) {
                    const section = document.querySelector('.list-breeds');
                    const subBreeds = listBreeds[breed];
                    if (subBreeds.length > 0) {
                        for (const subBreed of subBreeds) {
                            // console.log(`${breed} ${subBreed}`);
                            this.addListBreeds(breed, subBreed, section);
                        }
                    } else {
                        // console.log(breed);
                        this.addListBreeds(breed, 0, section);
                    }
                }
                this.clickItem();
            })
            .catch(error => console.log("Błąd: ", error))
    };
    // wartość wpisywana w okienko
    getValueInput(){
        let valueIpt = document.querySelector('.form__ipt').value
        let getValue = [];
            if(valueIpt.includes(' ')){
                getValue = valueIpt.split(' ');
                return getValue
            }else{
                getValue = valueIpt;
                return getValue
            };
    };
    // wartość klikniętej rasy
    getValueClick(value){
        let values= [];
        if(value.includes(' ')){
            values = value.split(' ');
            return values;
        }else{
            values = value
            return values;
        }
    };
    // wyświetlanie podanej rasy
    myBreed(breed,subBreed=0) {
        if (subBreed){
        fetch(`${this.adress}/breed/${breed}/${subBreed}/images/random`)
            .then(data=>data.json())
            .then(json=>json.message)
            .then(link=>this.addImage(link))
            .catch(error => alert(`błędna nazwa ${breed} ${subBreed}`))
        }else {
            fetch(`${this.adress}/breed/${breed}/images/random`)
                .then(data=>data.json())
                .then(json=>json.message)
                .then(link=>this.addImage(link))
                .catch(error => alert(`błędna nazwa ${breed}`))
        }
    };
};
const api = new API_breeds;
