const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

exports.screenshot = functions
    .runWith({
        timeoutSeconds: 120,
        memory: "2GB"
    })
    .https.onRequest((request, response) => {
        response.set('Cache-Control', 'public, max-age=300, s-maxage=600');

        (async () => {
            const browser = await puppeteer.launch({
                'args' : [
                '--no-sandbox'
                ],
            });
            const page = await browser.newPage();
            await page.goto('https://www.daejeon.go.kr/corona19/index.do?menuId=0008', {waitUntil: 'networkidle2'});
            let height = await page.evaluate(
                () => document.documentElement.scrollHeight
            );
            await page.setViewport({ width: 1920, height: height });

            async function screenshotDOMElement(selector, padding = 0) {
                const rect = await page.evaluate(selector => {
                    const element = document.querySelector(selector);
                    const {x, y, width, height} = element.getBoundingClientRect();
                    return {left: x, top: y, width, height, id: element.id};
                }, selector);
            
                return await page.screenshot({
                    clip: {
                        x: rect.left - padding,
                        y: rect.top - padding,
                        width: rect.width + padding * 2,
                        // 10개 정도 캡쳐
                        height: 674
                        // 전체 목록 캡쳐를 원할경우에는 아래의 주석 사용
                        // height: rect.height + padding * 2 
                    }
                });
            }
            
            let buffer = await screenshotDOMElement('.corona-data table', 16);
            
            await browser.close();

            return response.type("image/png").send(buffer);
        })();
    })