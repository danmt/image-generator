
const puppeteer = require('puppeteer')

function generateHtml(userName, score, imageUrl)  {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body style="margin: 0; padding: 0">
                <div style="background-color: blue; height: 100vh; width: 100vw; display: flex; flex-direction: column">
                    <img src="${imageUrl}" style="width: 50%; margin: 1rem auto;">
                    <p style="color: yellow; margin: 0; padding: 1rem; text-transform: uppercase; font-size: 2rem; text-align: center">
                        ${userName} (score: ${score})
                    </p>
                </div>
            </body>
        </html>  
    `;
}

async function main() {
    const [,, userName, score, imageUrl] = process.argv;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1,
    });            
    await page.setContent(generateHtml(userName, score, imageUrl));
    await page.screenshot({path: `./output/${userName}.png`});
    await browser.close();
}

main();