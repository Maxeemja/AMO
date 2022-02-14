export const BubbleSort = (arr) => {
  let swapped;
	do {
		swapped = false;
		for (let j = 0; j < arr.length; j++) {
			if (+arr[j] > +arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped) ;

  return arr.join(', ');
};