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
        id: '1',
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
        id: '2',
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
        id: '3',
        titulo: 'Tim Tam Shooters',
        descripcion: '¡Sorprenda a sus invitados con estos magníficos tiradores de postres Tim Tam, hechos con espuma de chocolate y crema batida de Tim Tam!',
        ingredientes: [
            'Azucar',
            'Mantequilla',
            'Harina',
            'Leche Condensada'
        ],
        urlimg: "assets/images/chocolate2.jpg"
    }
]

function llenarListado() {
    arrayRecetas.forEach(receta => {
        var colmd4 = document.createElement("DIV");
        colmd4.classList.add('col-md-4', 'col-sm-6', 'col-listado');

        var div = document.createElement("DIV");
        div.classList.add('text-right');
        div.id = receta.id;

        var btnEditar = document.createElement('BUTTON');
        btnEditar.classList.add('btn', 'btn-default', 'btnEditar');
        var editar = document.createTextNode('Editar');
        btnEditar.setAttribute('data-toggle', 'modal');
        btnEditar.setAttribute('data-target', '#editarReceta');
        btnEditar.appendChild(editar);

        var btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-default', 'btnEliminar');
        var eliminar = document.createTextNode('Eliminar');
        btnEliminar.appendChild(eliminar);

        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);

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
        var hr = document.createElement("HR");
        colmd4.appendChild(div);
        colmd4.appendChild(img);
        colmd4.appendChild(h2);
        colmd4.appendChild(p);
        colmd4.appendChild(h4);
        colmd4.appendChild(ul);
        colmd4.appendChild(hr);
        document.querySelector("#listadoRecetas").appendChild(colmd4);
    });
    agregarListener();
}

function agregarListener() {
    document.querySelectorAll('.btnEditar').forEach(elemento => {
        elemento.addEventListener('click', function (event) {
            for (let i = 0; i < arrayRecetas.length; i++) {
                const element = arrayRecetas[i];
                if (element.id == event.target.parentElement.id) {
                    document.querySelector('#EdId').value = element.id;
                    document.querySelector('#EdTitulo').value = element.titulo;
                    document.querySelector('#EdDescripcion').value = element.descripcion;
                    var ingredientes = '';
                    element.ingredientes.forEach(ingrediente => {
                        ingredientes += ingrediente + ',';
                    })
                    ingredientes = ingredientes.substring(0, ingredientes.length - 1);
                    document.querySelector('#EdIngredientes').value = ingredientes;
                }
            }
        })
    })

    document.querySelectorAll('.btnEliminar').forEach(elemento => {
        elemento.addEventListener('click', function (event) {
            for (let i = 0; i < arrayRecetas.length; i++) {
                const element = arrayRecetas[i];
                if (element.id == event.target.parentElement.id) {
                    arrayRecetas.splice(i, 1);
                    actualizarListado();
                }
            }
        })
    })

    
    document.getElementById('btnNuevaReceta').addEventListener('click',function(event) {
        var inputs = document.querySelector('#formNueva');
        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
    })

    document.querySelector('#guardarRecetaNueva').addEventListener('click', function () {
        var inputs = document.querySelector('#formNueva');
        var receta = [];
        receta['id'] = arrayRecetas.length + 1;
        receta['titulo'] = inputs[0].value;
        receta['descripcion'] = inputs[1].value;
        var ingredientes = [];
        inputs[2].value.split(',').forEach(ingrediente => {
            ingredientes.push(ingrediente);
        })
        receta['ingredientes'] = ingredientes;
        receta['urlimg'] = 'assets/images/default.jpg'
        arrayRecetas.push(receta);
        actualizarListado();
    });

    document.querySelector('#btnGuardarEdicion').addEventListener('click', function () {
        var inputs = document.querySelector('#formEditar');
        for (let i = 0; i < arrayRecetas.length; i++) {
            const element = arrayRecetas[i];
            if (element.id == inputs[0].value) {
                element.id = inputs[0].value;
                element.titulo = inputs[1].value;
                element.descripcion = inputs[2].value;
                var ingredientes = [];
                inputs[3].value.split(',').forEach(ingrediente => {
                    ingredientes.push(ingrediente);
                })
                element.ingredientes = ingredientes;
                break;
            }
        }
        actualizarListado();
    })
}

function actualizarListado() {
    var elemento = document.querySelectorAll(".col-listado");
    elemento.forEach(el => {
        el.parentNode.removeChild(el);
    })
    llenarListado();
}
