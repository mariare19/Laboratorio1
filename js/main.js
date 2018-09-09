function callAjax(url) {
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (response) {
        document.getElementById('principal').innerHTML = response;
    });
}

window.onload = function () {
    callAjax("../principal.html");
}

document.getElementById('navrecetas').addEventListener('click', function (event) {
    fetch("../recetas.html").then(function (response) {
        return response.text();
    }).then(function (response) {
        document.getElementById('principal').innerHTML = response;
        removeActive();
        event.target.parentElement.classList.add('active');
        llenarListado();
    });
});

document.getElementById('navprincipal').addEventListener('click', function () {
    callAjax("../principal.html");
    removeActive();
    event.target.parentElement.classList.add('active');
});

function removeActive() {
    var elementos = document.querySelectorAll('ul.nav > li');
    elementos.forEach(element => {
        element.classList.remove('active');
    });
}

var arrayRecetas = [
    {
        titulo: 'Brownies de Nutella',
        descripcion: 'Este brownie de Nutella es facilísimo de preparar, con muy pocos ingredientes, aunque puedes personalizarlo a tu gusto.',
        ingredientes: [
            'Chocolate',
            'Huevo',
            'Harina',
            'Mantequilla'
        ],
        urlimg: "assets/images/brownies.jpg"
    },
    {
        titulo: 'Crema de Queso y Cereza',
        descripcion: 'Bonitas capas de migas de galleta Graham, sabroso relleno y relleno de fruta hacen que estos postres de queso crema sean un destacado!',
        ingredientes: [
            'Azucar',
            'Mantequilla',
            'Harina',
            'Leche Condensada'
        ],
        urlimg: "assets/images/fresas.jpg"
    },
    {
        titulo: 'Tim Tam Shooters',
        descripcion: '¡Sorprenda a sus invitados con estos magníficos tiradores de postres Tim Tam, hechos con espuma de chocolate y crema batida de Tim Tam!',
        ingredientes: [
            'Azucar',
            'Mantequilla',
            'Harina',
            'Leche Condensada'
        ],
        urlimg: "assets/images/chocolate1.jpg"
    }
]

function llenarListado() {
    arrayRecetas.forEach(receta => {
        var colmd4 = document.createElement("DIV");
        colmd4.classList.add('col-md-4');
        var img = document.createElement("IMG");
        img.classList.add('img-circle');
        img.src = receta.urlimg;
        img.width = 140;
        img.height = 140;
        var h2 = document.createElement("H2");
        var titulo = document.createTextNode(receta.titulo);
        h2.appendChild(titulo);

        var p = document.createElement("P");
        var descrip = document.createTextNode(receta.descripcion);
        p.appendChild(descrip);

        var h4 = document.createElement("H4");
        var titulo2 = document.createTextNode("Ingredientes:");
        h4.appendChild(titulo2);

        var ul = document.createElement("UL");
        ul.classList.add('list-group-flush')

        receta.ingredientes.forEach(ingrediente => {
            var li = document.createElement("LI");
            var liIngrediente = document.createTextNode(ingrediente);
            li.appendChild(liIngrediente);
            li.classList.add('list-group-item');
            ul.appendChild(li);
        });
        colmd4.appendChild(img);
        colmd4.appendChild(h2);
        colmd4.appendChild(p);
        colmd4.appendChild(h4);
        colmd4.appendChild(ul);
        document.querySelector("#listadoRecetas").appendChild(colmd4);
    });
}