let currentProductosArray = [];
let currentSortCriteria = undefined;

function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "product-info.html";
}

function showProductosList() {
	let htmlContentToAppend = "";
	document.getElementById("titulo").innerHTML = `<h2>Productos</h2>
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
                    </div>
                </div>
            </div>
            `;

		document.getElementById("containe").innerHTML = htmlContentToAppend;
	}
}

document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(PRODUCTS_URL + localStorage.catID + ".json").then(function (resultObj) {
		if (resultObj.status === "ok") {
			currentProductosArray = resultObj.data;
			showProductosList();
			//sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
		}
	});
});
