import { readFile } from "fs/promises";

type State = {
	registers: Registers;
	opcodes: number[];
};

type Registers = {
	A: number;
	B: number;
	C: number;
	ip: number;
};

readFile("./input.txt", { encoding: "utf-8" })
	.then(parseData)
	.then(runInstructions)
	.then(console.log);

function parseData(data: string) {
	let [rawRegisters, rawOpcodes] = data.split("\r\n\r\n");
	let registerValues = rawRegisters
		.split("\r\n")
		.map((d) => d.substring(12))
		.map((d) => parseInt(d));

	let registers: Registers = {
		A: registerValues[0],
		B: registerValues[1],
		C: registerValues[2],
		ip: 0,
	};

	let opcodes = rawOpcodes
		.substring(9)
		.split(",")
		.map((o) => parseInt(o));

	return { registers, opcodes };
}

function runInstructions({ registers, opcodes }: State) {
	const out: number[] = [];
	while (registers.ip < opcodes.length) {
		const opcode = opcodes[registers.ip];
		const operand = opcodes[registers.ip + 1];

		switch (opcode) {
			case 0:
				registers.A = Math.trunc(
					registers.A / Math.pow(2, combo(operand, registers))
				);
				break;
			case 1:
				registers.B ^= operand;
				break;
			case 2:
				registers.B = combo(operand, registers) % 8;
				break;
			case 3:
				if (registers.A !== 0) {
					registers.ip = operand;
					continue;
				}
				break;
			case 4:
				registers.B ^= registers.C;
				break;
			case 5:
				out.push(combo(operand, registers) % 8);
				break;
			case 6:
				registers.B = Math.trunc(
					registers.A / Math.pow(2, combo(operand, registers))
				);
				break;
			case 7:
				registers.C = Math.trunc(
					registers.A / Math.pow(2, combo(operand, registers))
				);
				break;
		}

		registers.ip += 2;
	}

	return out.join(",");
}

function combo(operand: number, registers: Registers) {
	if (operand === 4) {
		return registers.A;
	} else if (operand === 5) {
		return registers.B;
	} else if (operand === 6) {
		return registers.C;
	} else {
		return operand;
	}
}
