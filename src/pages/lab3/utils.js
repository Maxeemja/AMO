const linspace = require('linspace');
function divided_difference(arr_x, arr_y, n) {
	let div_dif = 0;
	for (let i = 1; i < n; i++) {
		let key = 1;
		for (let j = 1; j < n; j++) {
			if (i === j) {
				continue;
			}
			key = key * (arr_x[i] - arr_x[j]);
		}
		div_dif = div_dif + (Math.pow(key, -1) * arr_y[i]);
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
					key = key * (x - arr_x[j]);
				}
				monomial = monomial + key;
			}
		}
		interp_arr_y.push(monomial);
	}
	return interp_arr_y;
}

export function sinX(a, b, n) {
	let arr_x, arr_y, interp_arr_x, interp_arr_y;
	arr_x = linspace(a, b, 200);
	arr_y = arr_x.map((el) => Math.sin(el));
	const sinArr = arr_x.map((el, i) => ({ x: el, y: arr_y[i] }));

	arr_x = linspace(a, b, n);
	arr_y = arr_x.map((el) => Math.sin(el));
	interp_arr_x = linspace(a, b, 200);
	interp_arr_y = newton_polinome(arr_x, arr_y, interp_arr_x);

	return [sinArr, interp_arr_x.map((el, i) => ({ x: el, y: interp_arr_y[i] }))];
}
export function variant (a,b,n) {
  let arr_x, arr_y, interp_arr_x, interp_arr_y;
	arr_x = linspace(a, b, 200);
	arr_y = arr_x.map((x) => Math.cos(x + Math.exp(Math.cos(x))));
	const varArr = arr_x.map((el, i) => ({ x: el, y: arr_y[i] }));

	arr_x = linspace(a, b, n);
	arr_y = arr_x.map((x) => Math.cos(x + Math.exp(Math.cos(x))));
	interp_arr_x = linspace(a, b, 200);
	interp_arr_y = newton_polinome(arr_x, arr_y, interp_arr_x);

	return [varArr, interp_arr_x.map((el, i) => ({ x: el, y: interp_arr_y[i] }))];

}