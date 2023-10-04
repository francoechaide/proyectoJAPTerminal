const COUNT_CART = document.getElementById("CountCart");
let ArrayCart = JSON.parse(localStorage.getItem("Carrito")) || [];

function userHaveCart(arreglo) {
	let i = 0;
	while (i < arreglo.length && arreglo[i].user != localStorage.getItem("username")) {
		i++;
	}

	return i < arreglo.length;
}
function searchUser(arreglo) {
	let i = 0;
	while (1 < arreglo.length && arreglo[i].user != localStorage.getItem("username")) {
		i++;
	}

	return i;
}
document.addEventListener("DOMContentLoaded", function () {
	if (userHaveCart(ArrayCart)) {
		COUNT_CART.innerHTML = ArrayCart[searchUser(ArrayCart)].articles.length;
	} else {
		COUNT_CART.innerHTML = 0;
	}
});
