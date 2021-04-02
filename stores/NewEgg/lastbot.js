const puppeteer = require("puppeteer");
let { CronJob } = require("cron");
async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

module.exports = function(callback, input) {
  setTimeout(async () => {
    await report("Started");
    let status, task;
    const browser = await puppeteer.launch({
      headless: false
      // args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    let popOutChecker = setInterval(async () => {
      try {
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
          await page.click(
            "#Popup_Masks"
            // , { clickCount: 3 }
          );
          await page.click(".modal-content > .modal-header > button.close");
          await page.click(
            ".fa-times"
            // , { clickCount: 2 }
          );
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
      } catch (error) {}
    }, 5000);
    try {
      let loginCount = 5;
      while (loginCount > 0) {
        try {
          await page.goto("https://www.newegg.com", { waitUntil: "load" });

          await page.waitFor(4000);

          // await page.goto("https://www.newegg.com", { waitUntil: "load" });

          // await page.waitFor(10000);

          let myPage = await page.content();
          let isSignedIn = myPage.indexOf(
            `https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
          );

          if (isSignedIn === -1) {
            // await page.goto(input.item_url);
            // await report("Checking for Item");
            // await page
            //   .waitForTimeout(30000)
            //   .then(() => console.log("Still checking"));
            break;
          } else {
            await report("Begin login process");
            await page.waitForSelector(
              ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
              {
                waitUntil: "load"
              }
            );
            // await page.waitForTimeout(10000);
            await page.click(
              ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
            );

            await page.waitForSelector("#labeled-input-signEmail", {
              waitUntil: "load"
            });
            await page.type("#labeled-input-signEmail", input.email);

            await page.waitForTimeout(3000);

            await page.waitForSelector("#signInSubmit");

            setTimeout(async () => {
              await page.click(
                "#signInSubmit"
                // , { timeout: 500 }
              );
            }, 12000);

            await page.click("#signInSubmit", { timeout: 500 });

            await page.waitForTimeout(1500);

            await page.waitForSelector("#labeled-input-password", {
              waitUntil: "load"
            });

            await page.type("#labeled-input-password", input.password);
            await page.click("button.btn.btn-orange");

            await report("Logged in");

            await page.waitForTimeout(2000);

            break;
          }
        } catch (error) {
          await report("Failed to Login");
          if (loginCount === 1) {
            await report("Failed to Login");
            clearInterval(popOutChecker);
            status = "failed";
            break;
          }
        } finally {
          loginCount--;
        }
      }

      // if (status !== "failed")
      //   task = new CronJob(
      //     "17 16 * * *",
      //     async () => {
      try {
        let countdown = input.countdown ? input.countdown : 2000;

        console.log("Countdown started", countdown);

        await page.waitForTimeout(countdown);

        await page.goto(input.item_url);

        await report("Checking for Item");

        await page.waitForTimeout(10000);

        let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
        try {
          await page.waitForSelector(addToCartStep1);
          await page.click(
            addToCartStep1
            //  { clickCount: 3 }
          );
          await report("product available");
        } catch (error) {
          await report("Item not found");
          clearInterval(popOutChecker);
        }

        let addToCartStep2 =
          ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";

        try {
          await page.waitForSelector(addToCartStep2);
          await page.click(
            addToCartStep2
            // , { clickCount: 3 }
          );
          console.log("product added to cart");
        } catch (error) {
          await report({ error1: error });
          clearInterval(popOutChecker);
        }

        // await page.waitForTimeout(3000);

        await page.goto("https://secure.newegg.com/shop/cart");

        // await page.waitForTimeout(20000);

        try {
          // Secure Checkout
          let secureCheckout =
            "div.summary-actions > button.btn.btn-primary.btn-wide";

          // setTimeout(async () => {
          await report("Ready To checkout 1");
          await page.waitForSelector(secureCheckout);
          await page.click(
            secureCheckout
            // , { clickCount: 1, delay: 300 }
          );
          await report("Ready To checkout 2");
        } catch (error) {}

        // await page.reload();

        await page.waitForTimeout(15000);

        console.log({ ui: page.url() });

        try {
          await page.waitForSelector(
            "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(2) > div > div.checkout-step-action > button",
            { timeout: 1000 }
          );
          await page.click(
            "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(2) > div > div.checkout-step-action > button"
          );
          //  await page.waitForSelector(checkoutButton, { timeout: 50000 });

          console.log({ r: r.toString() });
          // await page.click(checkoutButton, { clickCount: 3, delay: 2 });
          await report("Ready To checkout 3");
        } catch (err) {}

        await page.waitForTimeout(1000);

        // Enter Security Code
        let ccvInput = ".retype-security-code > input.form-text.mask-cvv-4";

        try {
          await page.waitForSelector(ccvInput);
          await page.type(ccvInput, input.ccv);
          await report("CCV has been entered");
        } catch (error) {
          await report("Error in CCV");
          status = "failed";
        }

        // Review Order
        try {
          await page.waitForSelector(
            "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-action > button",
            { timeout: 500 }
          );
          await page.click(
            "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-action > button"
          );
        } catch (err) {}

        await page.waitForTimeout(2000);

        // Place Order
        let placeOrder = "div.summary-actions > #btnCreditCard";
        try {
          await page.waitForSelector(placeOrder, { timeout: 500 });
          await page.click(placeOrder);
          await report("Order have been placed");
          if (status === "failed") {
            status = "failed";
          } else {
            status = "success";
          }
        } catch (err) {
          status = "failed";
        }
      } catch (error) {
        await report("Error occured in the checkout process");
        status = "failed";
      }
      // await task.stop();
      // },
      () => {
        setTimeout(() => {
          clearInterval(popOutChecker);
          page.close();
          browser.close();
          callback(null, { ...input, status });
        }, 15000);
      };
      // );
      // task.start();
    } catch (error) {
      status = "failed";
    } finally {
      if (status === "failed")
        setTimeout(() => {
          clearInterval(popOutChecker);
          page.close();
          browser.close();
          callback(null, { ...input, status: "failed" });
        }, 15000);
    }
  });
};
