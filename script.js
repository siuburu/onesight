const baseURL = "https://api.sampleapis.com/switch/games";

fetch(baseURL)
    .then((resp) => resp.json())
    .then((data) => displayData(data));

function makeUL(array){
    var list = document.createElement('ul');
    var item = document.createElement('li');
    for (var i = 0; i < array.length; i++){
        

        item.appendChild(document.createTextNode(array[i]));

        list.appendChild(item);
    }
    return list;
}
function displayData(data) {
    markup = `<ul>`
    data.forEach(element => {
        console.log(element.name);
        document.getElementById('gameList').appendChild(makeUL(element.name));
    });
}

/* 
fetch(baseURL)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("NETWORK ERROR");
        }
    })
    .then((data) => {
        let currGame = new Array();
        markup = ``;
        //array de jogos
        const gameArr = data;

        markup = `<h3>Lista de jogos do Switch`;

        //Itera pelo array de jogos e encadeia com html

        for (let i = 0; i < gameArr.length; i++) {
            currGame = gameArr[i].name;
            markup += `
            <a class = "game" href = "#"
                <div class="title">${currGame.name} </div>
                <div class="genre">${currGame.genre} </div>
                <div class="content">
                    ${currGame.developers}
                    </br></br>
                    <span>${currGame.publishers}</span>
                    </br></br>
                    <span>${currGame.releaseDates}</span>
                </div>
            </a>
        `;
        }

        container.insertAdjacentHTML("afterbegin", markup);
    })
    .catch((error) => console.error("FETCH ERROR: ", error));
*/
