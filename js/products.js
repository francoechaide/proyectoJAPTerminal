<<<<<<< Updated upstream
let currentProductosArray = [];
let currentSortCriteria = undefined;
=======
//const CAT_101 = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductArray = [];
let currentSortCriteria = undefined;
let ordenaAsc = false;
let ordenaDesc = false;
let arregloOriginal = [];
let minCount = undefined;
let maxCount = undefined;
function sortCategories(criteria, array) {
	let result = [];
	/*Si el valor devuelto es negativo, significa que a debe estar antes que b en el arreglo ordenado.
	 Si el valor es positivo, significa que b debe estar antes que a. */
	if (criteria === ORDER_ASC_BY_COST) {
		result = array.sort(function (a, b) {
			return a.cost - b.cost;
		});
	} else if (criteria === ORDER_DESC_BY_COST) {
		result = array.sort(function (a, b) {
			return b.cost - a.cost;
		});
	} else if (criteria === ORDER_BY_PROD_COUNT) {
		result = array.sort(function (a, b) {
			let aCount = parseInt(a.soldCount);
			let bCount = parseInt(b.soldCount);
			return bCount - aCount;
		});
	}
>>>>>>> Stashed changes

	return result;
}
function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "products.html";
}

<<<<<<< Updated upstream
function showProductosList() {
=======
function showProductList() {
>>>>>>> Stashed changes
	let htmlContentToAppend = "";

	document.getElementById("titulo").innerHTML = `<h2>Productos</h2>
<<<<<<< Updated upstream
        <p class="lead">Verás aquí todos los productos de la categoria ${currentProductosArray.catName}.</p>`;

	for (let i = 0; i < currentProductosArray.products.length; i++) {
		let Producto = currentProductosArray.products[i];
		htmlContentToAppend += `
            <div onclick="setCatID(${Producto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${Producto.image}" alt="${Producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4  class="mb-1">${Producto.name} - USD ${Producto.cost} </h4>
                            <small class="text-muted">${Producto.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${Producto.description}</p>
=======
        <p class="lead">Verás aquí todos los productos de la categorioa ${currentProductArray.catName}.</p>`;

	for (let i = 0; i < currentProductArray.products.length; i++) {
		let product = currentProductArray.products[i];
		if (
			(minCount == undefined || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
			(maxCount == undefined || (maxCount != undefined && parseInt(product.cost) <= maxCount))
		) {
			htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active product-container">
                
                    
                        <img src="${product.image}" alt="${product.name}" class=" img">
                    
                    <div class="col">
                        <div class="product-overlay">
                            <div class="d-flex w-100 justify-content-between">
                             <h4 id="n">${product.name} </h4>
                             <small >${product.soldCount} vendidos</small>
                            </div>
                         <h5 class"" id="precio"> ${product.currency} ${product.cost}</h3>
                         <p id="d">${product.description}</p>
                        </div>
>>>>>>> Stashed changes
                    </div>
                
            </div>
            `;
<<<<<<< Updated upstream

		document.getElementById("containe").innerHTML = htmlContentToAppend;
=======
		}

		document.getElementById("contenedor-articulo").innerHTML = htmlContentToAppend;
>>>>>>> Stashed changes
	}
}

function sortAndShowProduct(sortCriteria, productArray) {
	currentSortCriteria = sortCriteria;

	if (!ordenaAsc || !ordenaDesc) {
		arregloOriginal = [...currentProductArray.products];
		currentProductArray.products = sortCategories(currentSortCriteria, currentProductArray.products);
		ordenaAsc = true;
	} else {
		currentProductArray.products = arregloOriginal;
		ordenaAsc = false;
	}

	//Muestro las categorías ordenadas
	showProductList();
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function (resultObj) {
<<<<<<< Updated upstream
		if (resultObj.status === "ok") {
			currentProductosArray = resultObj.data;
			showProductosList();
			//sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
=======
		if (resultObj.status == "ok") {
			currentProductArray = resultObj.data;
			//arregloOriginal = [...currentProductArray.products];
			showProductList();
>>>>>>> Stashed changes
		}
	});

	document.getElementById("sortAsc").addEventListener("click", function () {
		sortAndShowProduct(ORDER_ASC_BY_COST);
	});

	document.getElementById("sortDesc").addEventListener("click", function () {
		sortAndShowProduct(ORDER_DESC_BY_COST);
	});

	document.getElementById("sortByCount").addEventListener("click", function () {
		sortAndShowProduct(ORDER_BY_PROD_COUNT);
	});

	document.getElementById("clearRangeFilter").addEventListener("click", function () {
		document.getElementById("rangeFilterCountMin").value = "";
		document.getElementById("rangeFilterCountMax").value = "";

		minCount = undefined;
		maxCount = undefined;

		showProductList();
	});

	document.getElementById("rangeFilterCount").addEventListener("click", function () {
		//Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
		//de productos por categoría.
		minCount = document.getElementById("rangeFilterCountMin").value;
		maxCount = document.getElementById("rangeFilterCountMax").value;

		if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
			minCount = parseInt(minCount);
		} else {
			minCount = undefined;
		}

		if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
			maxCount = parseInt(maxCount);
		} else {
			maxCount = undefined;
		}

		showProductList();
	});
});

//BUSCADOR
document.addEventListener("keyup", function (e) {
	//detecta el teclado y procede a hacer una accion
	if (e.target.matches("#buscador")) {
		//si donde se detecto el target coidide con el id buscador entra al if
		let product = document.querySelectorAll(".product-container"); //traigo todo los productos
		for (p of product) {
			//recorro los productos
			if (
				//aca busco los nombre y las descripciones las paso a minuscula y con include comparo coicidencias con lo que escribi en el buscador
				p.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value) ||
				p.querySelector("#d").innerHTML.toLowerCase().includes(e.target.value) ||
				e.target.value === ""
			) {
				p.classList.remove("filtro"); //en caso de que sea verdadero le saco el filtro que es el que los oculta
			} else {
				p.classList.add("filtro"); //aca se los agrego porque no coincide
			}
		}

		/*document.querySelectorAll(".product-container").forEach(producto => {
			if (
				producto.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value) ||
				producto.querySelector("#d").innerHTML.toLowerCase().includes(e.target.value)
			) {
				producto.classList.remove("filtro");
			} else {
				producto.classList.add("filtro");
			}

			//console.log(producto.querySelector("#n").innerHTML.toLowerCase().includes(e.target.value));
		});*/
	}
});

//MUESTRO BUSCADOR O LO OCULTO
let checkboton = document.getElementById("bus");
let buscador = document.getElementById("buscador");
bus.addEventListener("click", function () {
	if (buscador.classList.contains("MostrarBuscador")) {
		buscador.classList.remove("MostrarBuscador");
		checkboton.classList.remove("bus");
	} else {
		buscador.classList.add("MostrarBuscador");
		checkboton.classList.add("bus");
		buscador.focus();
	}
});

document.addEventListener("click", function (event) {
	if (!buscador.contains(event.target) && !bus.contains(event.target)) {
		buscador.classList.remove("MostrarBuscador");
		checkboton.classList.remove("bus");
	}
});
