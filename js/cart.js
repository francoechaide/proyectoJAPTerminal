const contenedor = document.getElementById("teibleseishon");

let CarritoUser = JSON.parse(localStorage.getItem("Carrito")) || [];

function setcount() {
	const SUBTOTAL = document.getElementById("subTotal");
	const input = document.getElementById("input").value;
	//let currentSubtotal = parseFloat(SUBTOTAL.textContent);
	if (input != 0) {
		// Realiza la multiplicación
		let currentSubtotal = ProductCarrito.articles[0].unitCost * input;

		// Actualiza el contenido del elemento <td id="subTotal">
		SUBTOTAL.innerHTML = `${ProductCarrito.articles[0].currency} ${currentSubtotal}`;
	}
}

function setcount2(num) {
	const SUBTOTAL2 = document.getElementsByClassName("subTotal2");
	const input2 = document.getElementsByClassName("input2");
	let userDeNuevo = buscoUser(CarritoUser);
	//let currentSubtotal = parseFloat(SUBTOTAL.textContent);
	if (input2[num].value != 0) {
		// Realiza la multiplicación
		let currentSubtotal = CarritoUser[userDeNuevo].articles[num].unitCost * input2[num].value;

		// Actualiza el contenido del elemento <td id="subTotal">
		SUBTOTAL2[num].innerHTML = `${CarritoUser[userDeNuevo].articles[num].currency} ${currentSubtotal}`;

		CarritoUser[userDeNuevo].articles[num].count = input2[num].value;
		localStorage.setItem("Carrito", JSON.stringify(CarritoUser));
	}
}
function userTieneCarrito(arreglo) {
	let i = 0;
	while (i < arreglo.length && arreglo[i].user != localStorage.getItem("username")) {
		i++;
	}

	return i < arreglo.length;
}
function buscoUser(arreglo) {
	let i = 0;
	while (1 < arreglo.length && arreglo[i].user != localStorage.getItem("username")) {
		i++;
	}

	return i;
}
let ProductCarrito = [];
function showCarrito() {
	let appendtabla = "";

	appendtabla += `   
    <tr class="trclass">
        <td><img src="${ProductCarrito.articles[0].image}" class="imgTabla "></td>
        <td>${ProductCarrito.articles[0].name}</td>
        <td>${ProductCarrito.articles[0].unitCost}</td>
        <td><input type="text" class="input" id="input" value="${ProductCarrito.articles[0].count}"></td>
        <td id="subTotal">${ProductCarrito.articles[0].currency} ${
		ProductCarrito.articles[0].unitCost * ProductCarrito.articles[0].count
	}</td>
    </tr>
    
    `;

	if (userTieneCarrito(CarritoUser)) {
		let user = buscoUser(CarritoUser);
		for (let i = 0; i < CarritoUser[user].articles.length; i++) {
			appendtabla += `   
		<tr class="trclass">
			<td><img src="${CarritoUser[user].articles[i].image}" class="imgTabla "></td>
			<td>${CarritoUser[user].articles[i].name}</td>
			<td>${CarritoUser[user].articles[i].unitCost}</td>
			<td><input type="text" class="input input2" id="${i}" value="${CarritoUser[user].articles[i].count}"></td>
			<td class="subTotal2">${CarritoUser[user].articles[i].currency} ${
				CarritoUser[user].articles[i].unitCost * CarritoUser[user].articles[i].count
			}</td>
		</tr>
		
		`;
		}
	}
	contenedor.innerHTML = appendtabla;
}
document.addEventListener("keyup", function (e) {
	//detecta el teclado y procede a hacer una accion
	if (e.target.matches("#input")) {
		setcount();
	} else {
		const input2 = document.getElementsByClassName("input2");
		for (let i = 0; i < input2.length; i++) {
			if (e.target === input2[i]) {
				setcount2(i);
			}
		}
	}
});
document.addEventListener("DOMContentLoaded", () => {
	getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
		if (resultObj.status == "ok") {
			ProductCarrito = resultObj.data;

			showCarrito();
		}
	});
});
