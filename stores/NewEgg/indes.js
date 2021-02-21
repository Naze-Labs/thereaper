const puppeteer = require("puppeteer");
const { start } = require("repl");
const config = require("./../../utils/config/newEgg");

module.exports = () => {
  console.log({ config });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function run() {
  try {
    await report("Started");

    const browser = await puppeteer.launch({
      headless: false,
      product: "chrome",
      defaultViewport: { width: 1150, height: 768 }
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    var verificationPage = false;

    // while (true) {
    //   await page.waitForTimeout(2000);
    //   try {
    //     await page.goto(
    //       "https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage=https%3a%2f%2fwww.newegg.com%2f",
    //       { waitUntil: "load" }
    //     );
    //     if (page.url().includes("signin")) {
    //       await page.waitForSelector("button.btn.btn-orange");
    //       await page.type("#labeled-input-signEmail", config.email);
    //       await page.waitForSelector("#signInSubmit", { waitUntil: "load" });
    //       await page.click("#signInSubmit", { timeout: 500 });

    //       await page.waitForTimeout(1000);

    //       let findAuthenticator = await page.content();
    //       findAuthenticator = findAuthenticator.indexOf(
    //         `<div class="alert-body"><p>To better protect your account security, we've sent you a code to verify your account.</p></div>`
    //       );
    //         let findAuthenticato = await page.content();
    //       if (findAuthenticator !== -1) {

    //         report("Manual authorization code required by Newegg. 1");
    //         console.log({ findAuthenticator, findAuthenticato }, "yes");
    //       } else {
    //         try {
    //           console.log(findAuthenticato, "no");
    //           await page.waitForSelector("#labeled-input-password", {
    //             waitUntil: "200"
    //           });
    //           await page.waitForSelector("button.btn.btn-orange", {waitUntil: });
    //           await page.type("#labeled-input-password", config.password);
    //           await page.click("button.btn.btn-orange");
    //           await page.waitForTimeout(500);
    //           try {
    //             await page.waitForSelector("#labeled-input-password", {
    //               timeout: 500
    //             });
    //           } catch (err) {
    //             break;
    //           }
    //         } catch (err) {
    //           report("Manual authorization code required by Newegg.");
    //         }
    //       }
    //     } else if (page.url().includes("areyouahuman")) {
    //       await page.waitForTimeout(1000);
    //     }
    //   } catch (error) {
    //     report("Faied to Resolve Url.");
    //   }
    // }

    let popOutChecker = setInterval(async () => {
      let homePageContent = await page.content();
      let popupContent = homePageContent.indexOf("popup-wrapper");
      let popupContent1 = homePageContent.indexOf("Popup_Masks");
      let popupContent2 = homePageContent.indexOf(
        `<i class="fas fa-times"></i>`
      );
      let popupContent3 = homePageContent.indexOf(
        `<div class="modal-title">Before You Continue...</div>`
      );

      if (popupContent !== -1) {
        console.log("we just found a pop up");
        await page.click("#popup-close");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent1 !== -1) {
        console.log("we just found a pop up");
        await page.click(".modal-content > .modal-header > button.close");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent2 !== -1) {
        console.log("we just found a pop up");
        await page.click(".fas.fa-times");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent3 !== -1) {
        console.log("we just found a pop up");
        await page.click(".modal-footer > button.btn.btn-secondary");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else {
        console.log("no pop up");
      }
    }, 5000);

    while (true) {
      await page.goto("https://www.newegg.com", { waitUntil: "load" });

      try {
        await page.waitFor(10000);

        let myPage = await page.content();
        let isSignedIn = myPage.indexOf(
          `<div class="header2020-right"><div class="display-flex justify-content-flex-end"><div class="nav-complex"><a href="https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
        );

        if (isSignedIn === -1) {
          await page.goto(config.item_url);
          await report("Checking for Item");
          await page
            .waitForTimeout(30000)
            .then(() => console.log("url am here"));
          break;
        } else {
          await page.waitForSelector(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
            {
              waitUntil: "load"
            }
          );

          await page.click(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
          );
          await page.waitForSelector("#labeled-input-signEmail", {
            waitUntil: "load"
          });
          await page.type("#labeled-input-signEmail", config.email);

          await page.waitForTimeout(3000);

          await page.waitForSelector("#signInSubmit");

          setTimeout(async () => {
            await page.click("#signInSubmit", { timeout: 500 });
          }, 12000);

          await page.click("#signInSubmit", { timeout: 500 });

          await page.waitForTimeout(1500);

          await page.waitForSelector("#labeled-input-password", {
            waitUntil: "load"
          });

          await page.type("#labeled-input-password", config.password);
          await page.click("button.btn.btn-orange");

          await report("Logged in");
          await page.waitForTimeout(2000);

          await page.goto(config.item_url);

          await report("Checking for Item");

          await page
            .waitForTimeout(30000)
            .then(() => console.log("url am here"));

          break;
        }
      } catch (error) {
        console.log({ error });
        report("Faied to Resolve Url.");
      }
    }

    const startTime = new Date();
    var nowTime = new Date();
    var timeDiffMinutes = Math.round((nowTime - startTime) / 1000) / 60;

    try {
      let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
      await page.waitForSelector(addToCartStep1);
      await page
        .click(addToCartStep1, { clickCount: 3 })
        .then(() => report("oti click"));
      await report("product available");

      await page.waitForTimeout(3000);
      let addToCartStep2 =
        ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";
      await page.waitForSelector(addToCartStep2);
      await page.click(addToCartStep2, { clickCount: 3 });
      console.log("product added to cart");

      await page.waitForTimeout(3000);

      await page.goto("https://secure.newegg.com/shop/cart", {
        waitUntil: "load"
      });

      await page.waitForTimeout(3000);

      try {
        let checkoutButton =
          "div.summary-actions > button.btn.btn-primary.btn-wide";
        await page.waitForSelector(checkoutButton);
        await page.click(checkoutButton, { clickCount: 3 });

        // await page.waitForNavigation({ waitUntil: "networkidle0" });
        // await page.waitFor(10000);
        // try {
        //   let continueToPay =
        //     "div.checkout-step > div.checkout-step-action > button.btn.btn-primary.checkout-step-action-done";
        //   await page.waitForSelector(continueToPay);
        //   await page.click(continueToPay, { clickCount: 3 });
        // } catch (error) {
        //   console.log("done");
        // }        console.log("done");
      } catch (error) {
        console.log({ error });
      }

      console.log("gone to cart");
    } catch (error) {
      console.log({ error });
    }
    await report("Completed purchase");
  } catch (error) {
    console.log({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

run();

const puppeteer = require("puppeteer");
const { start } = require("repl");
const config = require("./../../utils/config/newEgg");

module.exports = () => {
  console.log({ config });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function run() {
  try {
    await report("Started");

    const browser = await puppeteer.launch({
      headless: false,
      product: "chrome",
      defaultViewport: { width: 1150, height: 768 }
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    let popOutChecker = setInterval(async () => {
      let homePageContent = await page.content();
      let popupContent = homePageContent.indexOf("popup-wrapper");
      let popupContent1 = homePageContent.indexOf("Popup_Masks");
      let popupContent2 = homePageContent.indexOf(
        `<i class="fas fa-times"></i>`
      );
      let popupContent3 = homePageContent.indexOf(
        `<div class="modal-title">Before You Continue...</div>`
      );

      if (popupContent !== -1) {
        console.log("we just found a pop up");
        await page.click("#popup-close");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent1 !== -1) {
        console.log("we just found a pop up");
        await page.click(".modal-content > .modal-header > button.close");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent2 !== -1) {
        console.log("we just found a pop up");
        await page.click(".fas.fa-times");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else if (popupContent3 !== -1) {
        console.log("we just found a pop up");
        await page.click(".modal-footer > button.btn.btn-secondary");
        await page.waitForTimeout(1000);
        console.log("we closed a popup");
      } else {
        console.log("no pop up");
      }
    }, 5000);

    while (true) {
      try {
        await page.goto("https://www.newegg.com", { waitUntil: "load" });

        // await page.waitFor(10000);

        let myPage = await page.content();
        let isSignedIn = myPage.indexOf(
          `<div class="header2020-right"><div class="display-flex justify-content-flex-end"><div class="nav-complex"><a href="https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
        );

        if (isSignedIn === -1) {
          await page.goto(config.item_url);
          await report("Checking for Item");
          await page
            .waitForTimeout(30000)
            .then(() => console.log("url am here"));

          break;
        } else {
          console.log("Need to Login");

          await page.waitForSelector(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
            {
              waitUntil: "load"
            }
          );

          await page.click(
            ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
          );
          await page.waitForSelector("#labeled-input-signEmail", {
            waitUntil: "load"
          });
          await page.type("#labeled-input-signEmail", config.email);

          await page.waitForTimeout(3000);

          await page.waitForSelector("#signInSubmit");

          setTimeout(async () => {
            await page.click("#signInSubmit", { timeout: 500 });
          }, 12000);

          await page.click("#signInSubmit", { timeout: 500 });

          await page.waitForTimeout(1500);

          await page.waitForSelector("#labeled-input-password", {
            waitUntil: "load"
          });

          await page.type("#labeled-input-password", config.password);
          await page.click("button.btn.btn-orange");

          await report("Logged in");
          await page.waitForTimeout(2000);

          await page.goto(config.item_url);

          await report("Checking for Item");

          await page
            .waitForTimeout(30000)
            .then(() => console.log("url am here"));
          break;
        }
      } catch (error) {
        console.log({ error });
        report("Faied to Resolve Url.");
      }
    }

    const startTime = new Date();
    var nowTime = new Date();
    var timeDiffMinutes = Math.round((nowTime - startTime) / 1000) / 60;

    try {
      let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
      await page.waitForSelector(addToCartStep1);
      await page
        .click(addToCartStep1, { clickCount: 3 })
        .then(() => report("oti click"));
      await report("product available");

      await page.waitForTimeout(3000);
      let addToCartStep2 =
        ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";
      await page.waitForSelector(addToCartStep2);
      await page.click(addToCartStep2, { clickCount: 3 });
      console.log("product added to cart");

      await page.waitForTimeout(3000);

      await page.goto("https://secure.newegg.com/shop/cart", {
        waitUntil: "load"
      });

      await page.waitForTimeout(3000);

      try {
        let checkoutButton =
          "div.summary-actions > button.btn.btn-primary.btn-wide";
        await page.waitForSelector(checkoutButton);
        await page.click(checkoutButton, { clickCount: 3 });
      } catch (error) {
        console.log({ error });
      }

      await page.waitForTimeout(10000);

      console.log("gone to cart");
    } catch (error) {
      console.log({ error });
    }

    try {
      let continueToPay =
        ".btn.btn-primary.checkout-step-action-done.layout-quarter";
      await page.waitForSelector(continueToPay);
      await page.click(continueToPay, { clickCount: 3 });
    } catch (error) {
      console.log({ error });
    }

    await report("Completed purchase");
  } catch (error) {
    console.log({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

run();
