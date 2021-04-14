export async function sleep(ms: number): Promise<void> {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, ms);
	});
}

export function encodeQueryData(data: Record<string, any>): string {
	const ret = [];
	for (const d in data) {
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}
	return ret.join("&");
}

export function roundFloat(arg: number, digits = 2) {
	return +arg.toFixed(digits);
}
