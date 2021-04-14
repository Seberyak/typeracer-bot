import { launch } from "puppeteer";
import { sleep } from "./utils";
const browserOptions = {
	headless: false,
	defaultViewport: {
		width: 1366,
		height: 768,
	},
	timeout: 60e3,
	args: [
		"--no-sandbox",
		"--disable-setuid-sandbox" /*'--proxy-server=socks4://176.32.177.30:51870'*/,
	],
};

const url = "https://play.typeracer.com";

async function main() {
	const browser = await launch(browserOptions);
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "load" });
	await sleep(3e3);
	await page.evaluate(() => {
		// @ts-ignore
		document.querySelector(".gwt-Anchor.prompt-button.bkgnd-green").click();
	});
	await sleep(5e3);
	// await page.waitForNavigation({ waitUntil: "load" });
	console.log("loaded");
	const text = await page.evaluate(() => {
		const element0 = document.querySelectorAll(
			"[unselectable=on]"
		)[0] as HTMLElement;
		const element1 = document.querySelectorAll(
			"[unselectable=on]"
		)[1] as HTMLElement;
		const text = (element0.innerText + element1.innerText) as string;
		console.log(text);
		return text;
	});
	console.log("HERE");
	console.log(text);
	await sleep(15e3);
	// page.keyboard.type("e");
}

main().then();
