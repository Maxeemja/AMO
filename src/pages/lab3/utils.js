const linspace = require('linspace');
function divided_difference(arr_x, arr_y, n) {
	let div_dif = 0;
	for (let i = 1; i < n; i++) {
		let key = 1;
		for (let j = 1; j < n; j++) {
			if (i === j) {
				continue;
			}
			key *= arr_x[i] - arr_x[j];
		}
		div_dif += Math.pow(key, -1) * arr_y[i];
	}
	return div_dif;
}

function newton_polinome(arr_x, arr_y, interp_arr_x) {
	const interp_arr_y = [];
	for (let x of interp_arr_x) {
		let monomial = 0;
		for (let i = 1; i < arr_x.length; i++) {
			let key = divided_difference(arr_x, arr_y, i + 1);
			if (i !== 0) {
				for (let j = 1; j < i; j++) {
					key *= (x - arr_x[j]);
				}
				monomial += key;
			}
		}
		interp_arr_y.push(monomial);
	}
	return interp_arr_y;
}

export function variant(a, b, n, formula) {
	let arr_x, arr_y, interp_arr_y, varArr, nodes_x, nodes_y;
	arr_x = linspace(a, b, 500);
	nodes_x = linspace(a, b, n);
	console.log(arr_x, nodes_x);
	if (formula === 'sin') {
		arr_y = arr_x.map((el) => Math.sin(el));
		nodes_y = nodes_x.map((el) => Math.sin(el));
		varArr = arr_x.map((el, i) => ({ x: el, y: arr_y[i] }));
	} else {
		arr_y = arr_x.map((x) => Math.cos(x + Math.exp(Math.cos(x))));
		nodes_y = nodes_x.map((x) => Math.cos(x + Math.exp(Math.cos(x))));
		varArr = arr_x.map((el, i) => ({ x: el, y: arr_y[i] }));
	}

	interp_arr_y = newton_polinome(nodes_x, nodes_y, arr_x);

	const err = interp_arr_y.map((inY, i) => Math.abs(arr_y[i] - inY));
	const errArr = arr_x.map((x, i) => ({ x: x, y: err[i] }));

	return [varArr, arr_x.map((el, i) => ({ x: el, y: interp_arr_y[i] })), errArr];
}
