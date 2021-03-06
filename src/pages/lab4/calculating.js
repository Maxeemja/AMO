function count_f0(x) {
	let f0 = x ** 3 + 8 * x - 6;
	return +f0.toFixed(4);
}

function count_diff(x) {
	let diff = 3 * x ** 2 + 8;
	return +diff.toFixed(4);
}

export function getResult(a, b, e) {
	let x01, x02, xn, xn1, counter, x0;
	x01 = parseInt(a);
	x02 = parseInt(b);
	e = parseFloat(e);

	counter = 0;
	x0 = (x01 + x02) / 2;
	xn = count_f0(x0);
	xn1 = xn - count_f0(xn) / count_diff(xn);
	while (Math.abs(xn1 - xn) > e) {
		xn = xn1;
		xn1 = xn - count_f0(xn) / count_diff(xn);
		counter += 1;
	}
	return [counter, xn1];
}

export function draw_graph() {
	let x1, xi, y1, yi;

	x1 = [];

	y1 = [];
	xi = -2;
	while (xi < 2) {
		xi += 0.01;
		yi = count_f0(xi);
		x1.push(xi);
		y1.push(yi);
	}
	return [x1.map((x, i) => ({ x: x, y: y1[i] })), [{ x: 0.706, y: 0 }]];
}
