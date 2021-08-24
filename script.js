const baseURL = "https://api.sampleapis.com/switch/games";

fetch(baseURL)
    .then((resp) => resp.json())
    .then((data) => displayData(data));

//cria uma lista não ordenada dado um array
function makeUL(array){
    var list = document.getElementById('nameList');
   
    for (var i = 0; i < array.length; i++){
         var item = document.createElement('li');

        item.appendChild(document.createTextNode(array[i]));

        list.appendChild(item);
    }
    return list;
}
//Lista os elementos da api em uma UL
function displayData(data) {
    const gameNames = [];
    for (var i = 0; i < data.length; i++){
        gameNames[i] = data[i].name;
    }
    document.getElementById('gameList').appendChild(makeUL(gameNames));
    /*
    data.forEach(element => {
        console.log(element.name);
        //adiciona todos os títulos dos jogos numa lista não ordenada.
        document.getElementById('gameList').appendChild(makeUL(element.name));
    });
    */
}

function getDescription(target, data){
    data.forEach(element => {
        if(element.name === target.innerHTML ){
            var developers = document.createElement('h3');
            var genre = document.createElement('h3');
            var publishers = document.createElement('h3');
            var releaseDates = document.createElement('h3');
            developers.appendChild(document.createTextNode("Desenvolvedora: " + element.developers));
            genre.appendChild(document.createTextNode("Gênero: " + element.genre));
            publishers.appendChild(document.createTextNode("Distribuidora: " + element.publishers));
            target.appendChild(developers);
            target.appendChild(genre);
            target.appendChild(publishers);
        }
    });
}

function getEventTarget(e){
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('nameList');
ul.onclick = function(event){
    var target = getEventTarget(event);
    fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
            getDescription(target, data);
        })
};
