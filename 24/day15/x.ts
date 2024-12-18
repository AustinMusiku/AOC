import { readFile } from "fs/promises";

readFile("./input.txt", { encoding: "utf-8" })
	.then(parseData)
	.then(simulateMoves)
	.then(calculateGPS)
	.then(console.log);

function parseData(data: string) {
	let rawMap = data.split("\r\n\r\n")[0];
	let moves = data.split("\r\n\r\n")[1].split("\r\n").join("");
	let map = rawMap.split("\r\n").map((row) => row.split(""));

	return { map, moves };
}

function simulateMoves(data: { map: string[][]; moves: string }) {
	function move(direction: string, position: { x: number; y: number }) {
		let cursor = data.map[position.y][position.x];
		switch (direction) {
			case ">":
				if (data.map[position.y][position.x + 1] === "#") {
					return false;
				} else if (data.map[position.y][position.x + 1] === "O") {
					if (move(">", { x: position.x + 1, y: position.y })) {
						data.map[position.y][position.x + 1] = cursor;
						data.map[position.y][position.x] = ".";
						return true;
					} else {
						return false;
					}
				} else if (data.map[position.y][position.x + 1] === ".") {
					data.map[position.y][position.x + 1] = cursor;
					data.map[position.y][position.x] = ".";
					return true;
				}
			case "v":
				if (data.map[position.y + 1][position.x] === "#") {
					return false;
				} else if (data.map[position.y + 1][position.x] === "O") {
					if (move("v", { x: position.x, y: position.y + 1 })) {
						data.map[position.y + 1][position.x] = cursor;
						data.map[position.y][position.x] = ".";
						return true;
					} else {
						return false;
					}
				} else if (data.map[position.y + 1][position.x] === ".") {
					data.map[position.y + 1][position.x] = cursor;
					data.map[position.y][position.x] = ".";
					return true;
				}

			case "<":
				if (data.map[position.y][position.x - 1] === "#") {
					return false;
				} else if (data.map[position.y][position.x - 1] === "O") {
					if (move("<", { x: position.x - 1, y: position.y })) {
						data.map[position.y][position.x - 1] = cursor;
						data.map[position.y][position.x] = ".";
						return true;
					} else {
						return false;
					}
				} else if (data.map[position.y][position.x - 1] === ".") {
					data.map[position.y][position.x - 1] = cursor;
					data.map[position.y][position.x] = ".";
					return true;
				}

			case "^":
				if (data.map[position.y - 1][position.x] === "#") {
					return false;
				} else if (data.map[position.y - 1][position.x] === "O") {
					if (move("^", { x: position.x, y: position.y - 1 })) {
						data.map[position.y - 1][position.x] = cursor;
						data.map[position.y][position.x] = ".";
						return true;
					} else {
						return false;
					}
				} else if (data.map[position.y - 1][position.x] === ".") {
					data.map[position.y - 1][position.x] = cursor;
					data.map[position.y][position.x] = ".";
					return true;
				}
		}
	}

	data.moves.split("").forEach((direction: string) => {
		move(direction, findPosition(data.map));
	});

	return data.map;
}

function calculateGPS(map: string[][]) {
	let total = 0;
	map.forEach((row, rowIdx) => {
		row.forEach((col, colIdx) => {
			if (col === "O") {
				total += 100 * rowIdx + colIdx;
			}
		});
	});

	return total;
}

function findPosition(map: string[][]) {
	let position = { x: 0, y: 0 };
	map.forEach((row, rowIdx) => {
		row.forEach((col, colIdx) => {
			if (col === "@") {
				position = { x: colIdx, y: rowIdx };
				return;
			}
		});

		return;
	});

	return position;
}
