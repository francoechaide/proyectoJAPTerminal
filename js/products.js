let currentProductArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "product-info.html";
}

function showCategoriesList() {
	let htmlContentToAppend = "";
	document.getElementById("titulo").innerHTML = `<h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categorioa ${currentProductArray.catName}.</p>`;

	for (let i = 0; i < currentProductArray.products.length; i++) {
		let Productos = currentProductArray.products[i];

		htmlContentToAppend += `
            <div onclick="setCatID(${Productos.id})"class="nose" class="list-group-item list-group-item-action cursor-active">
               
                    <div class="col1">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${Productos.name}</h4>
                    
                            <small class="text-muted">${Productos.soldCount} artículos</small>
                        </div>
						<h4 class"mb-1">USD${Productos.cost}</h3>
                        <p class="mb-1">${Productos.description}</p>
                    </div>
                </div>
            </div>
            `;

		document.getElementById("containe").innerHTML = htmlContentToAppend;
		let noseElements = document.getElementsByClassName("nose");
		for (let i = 0; i < noseElements.length; i++) {
			noseElements[i].style.backgroundImage = "url(" + currentProductArray.products[i].image + ")";
		}
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function (resultObj) {
		if (resultObj.status === "ok") {
			currentProductArray = resultObj.data;
			showCategoriesList();
			//sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
		}
	});
});
