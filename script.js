const baseURL = "https://api.sampleapis.com/switch/games";

fetch(baseURL)
    .then((resp) => resp.json())
    .then((data) => displayData(data));

//cria uma lista não ordenada dado um array
function makeUL(array, data) {
    var list = document.getElementById('nameList');
    var genres;
    for (j = 0; j < data.lenght; j++) {
        alert(JSON.stringify(data[j].genre).split(','));
    }
    genres = data[1]["genre"];
    alert(JSON.stringify(genres));
    alert(data[1]["genre"]);
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');

        var a = document.createElement('a');
        a.setAttribute('href', '#');
        item.appendChild(a);
        a.appendChild(document.createTextNode(array[i]));

        list.appendChild(item);
    }
    return list;
}
//Lista os elementos da api em uma UL
function displayData(data) {
    const gameNames = [];
    //cria um array só com os titulos dos jogos
    for (var i = 0; i < data.length; i++) {
        gameNames[i] = data[i].name;
    }
    document.getElementById('gameList').appendChild(makeUL(gameNames, data));


    /*
    data.forEach(element => {
        console.log(element.name);
        //adiciona todos os títulos dos jogos numa lista não ordenada.
        document.getElementById('gameList').appendChild(makeUL(element.name));
    });
    */
}

function getDescription(target, data) {
    data.forEach(element => {
        if (element.name === target.innerHTML) {
            var developers = document.createElement('h3');
            var genre = document.createElement('h3');
            var publishers = document.createElement('h3');
            developers.appendChild(document.createTextNode("Desenvolvedora: " + element.developers));
            genre.appendChild(document.createTextNode("Gênero: " + element.genre));
            publishers.appendChild(document.createTextNode("Distribuidora: " + element.publishers));
            alert(target.p);
            target.appendChild(developers);
            target.appendChild(genre);
            target.appendChild(publishers);
        }
    });
}

function getGenre(data) {
    const gameGender = [];
    //cria um array só com os titulos dos jogos
    for (var i = 0; i < data.length; i++) {
        gameGender[i] = data[i].genre;
    }
    //Converte array de generos em array 1D
    var arr1d = [].concat(...gameGender);
    var lower = [];
    //transforma valores em lowercase para facilitar remoção de duplicados
    for (var i = 0; i < arr1d.length; i++) {
        try {
            lower[i] = arr1d[i].toLowerCase();
        } catch (error) {

        }

    }
    //remove valores duplicados
    let unique = [...new Set(lower)];
    return unique;
}

function listTags(tag) {

    for (var i = 0; i < tag.length; i++) {
        var tagButton = document.createElement('button');
        tagButton.classList.add('btn');
        tagButton.setAttribute("onclick", `filterSelection('${tag[i]}')`)
        tagButton.innerHTML = tag[i];
        document.getElementById('myTags').appendChild(tagButton);
    }
}

fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
        listTags(getGenre(data));
    })

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}
//Função de busca baseada em filtrar baseado no que é digitado no input
function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("nameList");
    li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

var ul = document.getElementById('nameList');
ul.onclick = function (event) {
    var target = getEventTarget(event);
    fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
            getDescription(target, data);
        })
};