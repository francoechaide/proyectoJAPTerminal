let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function setCatID(id) {
	localStorage.setItem("catID", id);
	window.location = "products.html";
}

function showCategoriesList() {
	let htmlContentToAppend = "";
	for (let i = 0; i < currentCategoriesArray.products.length; i++) {
		let category = currentCategoriesArray.products[i];

		htmlContentToAppend += `
            <div  class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name} - USD ${category.cost} </h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
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
			currentCategoriesArray = resultObj.data;
			showCategoriesList();
			//sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
		}
	});
});
