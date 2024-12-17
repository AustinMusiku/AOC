import { readFile } from "fs/promises";

const time = parseInt(process.argv[2]);
const width = parseInt(process.argv[3]);
const height = parseInt(process.argv[4]);

readFile("./input.txt", { encoding: "utf-8" })
	.then(readRobots)
	.then(simulateMoves)
	.then(calculateRobotsPerQuadrant)
	.then(console.log);

function readRobots(data: string) {
	let robots = data.split("\r\n").map((row) =>
		row.split(" ").map((row) =>
			row
				.substring(2)
				.split(",")
				.map((d) => parseInt(d))
		)
	);

	return robots;
}

function simulateMoves(robots: number[][][]) {
	for (let i = 0; i < time; i++) {
		for (let r = 0; r < robots.length; r++) {
			let robot = robots[r];
			let [x, y] = robot[0];
			let [dx, dy] = robot[1];

			robot[0][0] = x + dx;
			robot[0][1] = y + dy;

			if (robot[0][0] > width - 1) {
				robot[0][0] -= width;
			}

			if (robot[0][0] < 0) {
				robot[0][0] = width - Math.abs(robot[0][0]);
			}

			if (robot[0][1] > height - 1) {
				robot[0][1] -= height;
			}

			if (robot[0][1] < 0) {
				robot[0][1] = height - Math.abs(robot[0][1]);
			}
		}
	}

	return robots;
}

function calculateRobotsPerQuadrant(robots: number[][][]) {
	let tl = 0,
		tr = 0,
		dl = 0,
		dr = 0;

	let midX = Math.floor(width / 2);
	let midY = Math.floor(height / 2);

	robots.forEach((robot) => {
		if (robot[0][0] < midX && robot[0][1] < midY) {
			tl += 1;
			return;
		}

		if (robot[0][0] > midX && robot[0][1] < midY) {
			tr += 1;
			return;
		}

		if (robot[0][0] < midX && robot[0][1] > midY) {
			dl += 1;
			return;
		}

		if (robot[0][0] > midX && robot[0][1] > midY) {
			dr += 1;
			return;
		}
	});

	return tl * tr * dl * dr;
}
