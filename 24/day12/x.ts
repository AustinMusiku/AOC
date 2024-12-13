import { readFile } from "fs/promises";

readFile("./input.txt", { encoding: "utf-8" })
	.then(readMap)
	.then(groupRegions)
	.then(calculatePrice)
	.then(console.log);

let width = 140,
	height = 140;

type Regions = { [key: number]: number[] };

function readMap(data: string) {
	let map = data.split("\r\n").map((row) => row.split(""));
	width = map[0].length;
	height = map.length;
	return map;
}

function groupRegions(map: string[][]) {
	let regions: Regions = {};
	let visited = new Set<number>();

	for (let id = 0; id < height * width; id++) {
		const { y, x } = idToPosition(id);
		if (visited.has(id)) {
			continue;
		}
		if (!isInARegion(id, regions)) {
			regions[id] = makeRegion(map, id);
		}

		visited.add(id);
	}

	return regions;
}

function calculatePrice(regions: Regions) {
	let price = 0;
	Object.entries(regions).forEach(([start, plots]) => {
		let area = plots.length;
		let perimeter = plots
			.map((plot) => countPerimeter(start, plot, regions))
			.reduce((perimeter, wall) => perimeter + wall);
		price += area * perimeter;
	});

	return price;
}

function isInARegion(id: number, regions: Regions) {
	return Object.values(regions)
		.flatMap((region) => region)
		.indexOf(id) === -1
		? false
		: true;
}

function countPerimeter(start: string, plot: number, regions: Regions) {
	const { y, x } = idToPosition(+plot);
	let walls = 4;

	// check right: id+1
	if (x < width - 1) {
		if (regions[start].indexOf(plot + 1) !== -1) {
			walls -= 1;
		}
	}

	// check down: id+width
	if (y < height - 1) {
		if (regions[start].indexOf(plot + width) !== -1) {
			walls -= 1;
		}
	}

	// check up: id-width
	if (y > 0) {
		if (regions[start].indexOf(plot - width) !== -1) {
			walls -= 1;
		}
	}

	// check left: curr-1
	if (x > 0) {
		if (regions[start].indexOf(plot - 1) !== -1) {
			walls -= 1;
		}
	}

	return walls;
}

function makeRegion(map: string[][], start: number) {
	let q = [start];
	let head = 0,
		tail = 1; // initial length of q

	while (head < tail) {
		let curr = q[head];
		let { y, x } = idToPosition(curr);

		// check right: id+1
		if (x < width - 1) {
			if (map[y][x + 1] === map[y][x]) {
				if (q.indexOf(curr + 1) === -1) {
					tail = q.push(curr + 1);
				}
			}
		}

		// check down: id+width
		if (y < height - 1) {
			if (map[y + 1][x] === map[y][x]) {
				if (q.indexOf(curr + width) === -1) {
					tail = q.push(curr + width);
				}
			}
		}

		// check left: curr-1
		if (x > 0) {
			if (map[y][x - 1] === map[y][x]) {
				if (q.indexOf(curr - 1) === -1) {
					tail = q.push(curr - 1);
				}
			}
		}

		// check up: id-width
		if (y > 0) {
			if (map[y - 1][x] === map[y][x]) {
				if (q.indexOf(curr - width) === -1) {
					tail = q.push(curr - width);
				}
			}
		}

		head += 1;
	}

	return q;
}

function idToPosition(id: number) {
	return { y: Math.floor(id / width), x: id % width };
}
