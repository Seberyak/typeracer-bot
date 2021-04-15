import { launch } from "puppeteer";
import { sleep } from "./utils";
const browserOptions = {
	headless: false,
	timeout: 60e3,
	defaultViewport: {
		width: 1366,
		height: 768,
	},
	args: [
		"--no-sandbox",
		"--disable-setuid-sandbox" /*'--proxy-server=socks4://176.32.177.30:51870'*/,
	],
};

const url = "https://play.typeracer.com";

async function main(): Promise<void> {
	const browser = await launch(browserOptions);
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "load" });
	await sleep(5e3);
	await page.evaluate(() => {
		// @ts-ignore
		document.querySelector(".gwt-Anchor.prompt-button.bkgnd-green").click();
	});
	console.log("loaded");
	await sleep(5e3);
	const txt = await page.evaluate(() => {
		const l = document.querySelectorAll("[unselectable=on]");
		let text = "";
		l.forEach((el: HTMLElement) => {
			if (!!el.innerText) {
				text += el.innerText;
			}
		});
		return text;
	});
	console.log(txt);
	await sleep(10e3);
	for (const el of txt) {
		await page.type("body", el);
		await sleep(95);
	}
	await sleep(15e3);
	const pages = await browser.pages();
	const promises = pages.map((pg) => {
		return pg.close();
	});

	await Promise.all(promises);

	await browser.close();
}

main().then(() => {
	process.exit(0);
});
