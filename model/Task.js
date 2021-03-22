// const puppeteer = require("puppeteer");
// async function report(log) {
//   currentTime = new Date();
//   console.log(currentTime.toString().split("G")[0] + ": " + log);
// }

// module.exports = function(callback, input) {
//   setTimeout(async () => {
//     await report("Started");
//     let status;
//     const browser = await puppeteer.launch({
//       headless: false,
//       product: "chrome",
//       defaultViewport: { width: 1150, height: 768 }
//     });
//     const page = await browser.newPage();
//     await page.setCacheEnabled(false);
//     let popOutChecker = setInterval(async () => {
//       try {
//         let homePageContent = await page.content();
//         let popupContent = homePageContent.indexOf("popup-wrapper");
//         let popupContent1 = homePageContent.indexOf("Popup_Masks");
//         let popupContent2 = homePageContent.indexOf(
//           `<i class="fas fa-times"></i>`
//         );
//         let popupContent3 = homePageContent.indexOf(
//           `<div class="modal-title">Before You Continue...</div>`
//         );

//         if (popupContent !== -1) {
//           console.log("we just found a pop up");
//           await page.click("#popup-close");
//           await page.waitForTimeout(1000);
//           console.log("we closed a popup");
//         } else if (popupContent1 !== -1) {
//           console.log("we just found a pop up");
//           await page.click("#Popup_Masks", { clickCount: 3 });
//           await page.click(".modal-content > .modal-header > button.close");
//           await page.click(".fa-times", { clickCount: 2 });
//           await page.waitForTimeout(1000);
//           console.log("we closed a popup");
//         } else if (popupContent2 !== -1) {
//           console.log("we just found a pop up");
//           await page.click(".fas.fa-times");
//           await page.waitForTimeout(1000);
//           console.log("we closed a popup");
//         } else if (popupContent3 !== -1) {
//           console.log("we just found a pop up");
//           await page.click(".modal-footer > button.btn.btn-secondary");
//           await page.waitForTimeout(1000);
//           console.log("we closed a popup");
//         } else {
//           console.log("no pop up");
//         }
//       } catch (error) {}
//     }, 5000);
//     try {
//       let loginCount = 5;
//       while (loginCount > 1) {
//         try {
//           await page.goto("https://www.newegg.com", { waitUntil: "load" });

//           await page.waitFor(4000);

//           let myPage = await page.content();
//           let isSignedIn = myPage.indexOf(
//             `https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
//           );

//           if (isSignedIn === -1) {
//             await page.goto(input.item_url);
//             await report("Checking for Item");
//             await page
//               .waitForTimeout(30000)
//               .then(() => console.log("url am here"));
//             break;
//           } else {
//             await report("Begin login process");
//             await page.waitForSelector(
//               ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
//               {
//                 waitUntil: "load"
//               }
//             );

//             await page.click(
//               ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
//             );
//             await page.waitForSelector("#labeled-input-signEmail", {
//               waitUntil: "load"
//             });
//             await page.type("#labeled-input-signEmail", input.email);

//             await page.waitForTimeout(3000);

//             try {
//               await page.waitForSelector("#signInSubmit");
//             } catch (error) {}

//             setTimeout(async () => {
//               try {
//                 await page.click("#signInSubmit", { timeout: 500 });
//               } catch (error) {}
//             }, 12000);
//             try {
//               await page.click("#signInSubmit", { timeout: 500 });
//             } catch (error) {}

//             await page.waitForTimeout(1500);

//             await page.waitForSelector("#labeled-input-password", {
//               waitUntil: "load"
//             });

//             await page.type("#labeled-input-password", input.password);
//             await page.click("button.btn.btn-orange");

//             await report("Logged in");

//             await page.waitForTimeout(2000);

//             await page.goto(input.item_url);

//             await report("Checking for Item");

//             await page.waitForTimeout(20000);
//             break;
//           }
//         } catch (error) {
//           await report("Failed to Login");
//           if (loginCount < 0) {
//             await report("Failed to Login");
//             clearInterval(popOutChecker);
//             break;
//           }
//         } finally {
//           loginCount--;
//         }
//       }

//       try {
//         let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
//         try {
//           await page.waitForSelector(addToCartStep1);
//           await page.click(addToCartStep1, { clickCount: 3 });
//           await report("product available");
//         } catch (error) {
//           await report("Item not found");
//           clearInterval(popOutChecker);
//         }

//         let addToCartStep2 =
//           ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";

//         try {
//           await page.waitForSelector(addToCartStep2);
//           await page.click(addToCartStep2, { clickCount: 3 });
//           console.log("product added to cart");
//         } catch (error) {
//           await report({ error1: error });
//           clearInterval(popOutChecker);
//         }

//         await page.waitForTimeout(3000);

//         await page.goto("https://secure.newegg.com/shop/cart");

//         // await page.waitForTimeout(20000);

//         try {
//           // Secure Checkout
//           let secureCheckout =
//             "div.summary-actions > button.btn.btn-primary.btn-wide";

//           // setTimeout(async () => {
//           await report("Ready To checkout 1");
//           await page.waitForSelector(secureCheckout);
//           await page.click(secureCheckout, { clickCount: 1, delay: 300 });
//           await report("Ready To checkout 2");
//         } catch (error) {}

//         // await page.reload();

//         await page.waitForTimeout(15000);

//         console.log({ ui: page.url() });

//         try {
//           await page.waitForSelector(
//             "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(2) > div > div.checkout-step-action > button",
//             { timeout: 1000 }
//           );
//           await page.click(
//             "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(2) > div > div.checkout-step-action > button"
//           );
//           //  await page.waitForSelector(checkoutButton, { timeout: 50000 });

//           console.log({ r: r.toString() });
//           // await page.click(checkoutButton, { clickCount: 3, delay: 2 });
//           await report("Ready To checkout 3");
//         } catch (err) {}

//         await page.waitForTimeout(1000);

//         // Enter Security Code
//         let ccvInput = ".retype-security-code > input.form-text.mask-cvv-4";

//         try {
//           await page.waitForSelector(ccvInput);
//           await page.type(ccvInput, input.ccv);
//           await report("CCV has been entered");
//         } catch (error) {
//           await report("Error in CCV");
//         }

//         // Review Order
//         try {
//           await page.waitForSelector(
//             "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-action > button",
//             { timeout: 500 }
//           );
//           await page.click(
//             "#app > div > section > div > div > form > div.row-inner > div.row-body > div > div:nth-child(3) > div > div.checkout-step-action > button"
//           );
//         } catch (err) {}

//         await page.waitForTimeout(2000);

//         // Place Order
//         let placeOrder = "div.summary-actions > #btnCreditCard";
//         try {
//           await page.waitForSelector(placeOrder, { timeout: 500 });
//           await page.click(placeOrder);
//           await report("Order have been placed");
//           status = "success";
//         } catch (err) {
//           status = "failed";
//         }
//       } catch (error) {
//         await report("Error occured in the checkout process");
//         status = "failed";
//       }
//     } catch (error) {
//       status = "failed";
//     } finally {
//       setTimeout(async () => {
//         clearInterval(popOutChecker);
//         await page.close();
//         await browser.close();
//         callback(null, { ...input, status });
//       }, 15000);
//     }
//   });
// };

const puppeteer = require("puppeteer");
async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

module.exports = function(callback, input) {
  setTimeout(async () => {
    await report("Started");
    let status;
    let info;

    const browser = await puppeteer.launch({
      headless: false,
      // executablePath: 'google-chrome-stable',
      args: [
        // '--disable-gpu',
        // '--disable-dev-shm-usage',
        // '--disable-setuid-sandbox',
        // '--no-first-run',
        // '--no-sandbox',
        // '--no-zygote',
        // '--single-process',
        // "--proxy-server='direct://'",
        // '--proxy-bypass-list=*',
        // '--deterministic-fetch',
      ]
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
          await page.click("#Popup_Masks", { clickCount: 3 });
          await page.click(".modal-content > .modal-header > button.close");
          await page.click(".fa-times", { clickCount: 2 });
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
      while (loginCount > 1) {
        try {
          await page.goto("https://www.newegg.com", { waitUntil: "load" });

          await page.waitFor(4000);

          let myPage = await page.content();
          let isSignedIn = myPage.indexOf(
            `https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage`
          );

          if (isSignedIn === -1) {
            // await page.goto(input.item_url);
            // await report("Checking for Item");
            // await page
            //     .waitForTimeout(30000)
            //     .then(() => console.log("Still checking"));
            break;
          } else {
            await report("Begin login process");
            await page.waitForSelector(
              ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a",
              {
                waitUntil: "load"
              }
            );
            await page.waitForTimeout(10000);
            await page.click(
              ".display-flex.justify-content-flex-end .nav-complex:nth-child(1) a"
            );

            await page.waitForSelector("#labeled-input-signEmail", {
              waitUntil: "load"
            });
            await page.type("#labeled-input-signEmail", input.email);

            await page.waitForTimeout(3000);
            try {
              await page.waitForSelector("#signInSubmit");
            } catch (error) {}

            setTimeout(async () => {
              try {
                await page.click("#signInSubmit", { timeout: 500 });
              } catch (error) {}
            }, 12000);

            try {
              await page.click("#signInSubmit", { timeout: 500 });
            } catch (error) {}

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
          if (loginCount < 0) {
            await report("Failed to Login");
            clearInterval(popOutChecker);
            break;
          }
        } finally {
          loginCount--;
        }
      }

      // await page.waitForTimeout(120000);
      try {
        await page.goto(input.item_url);

        await report("Checking for Item");

        await page.waitForTimeout(20000);

        let addToCartStep1 = "#ProductBuy > div.nav-row > div.nav-col > button";
        try {
          await page.waitForSelector(addToCartStep1);
          await page.click(addToCartStep1, { clickCount: 3 });
          await report("product available");
        } catch (error) {
          await report("Item not found");
          clearInterval(popOutChecker);
        }

        let addToCartStep2 =
          ".modal-dialog.modal-lg > div.modal-content > div.modal-body.auto-height > div.modal-footer > button.btn.btn-primary";

        try {
          await page.waitForSelector(addToCartStep2);
          await page.click(addToCartStep2, { clickCount: 3 });
          console.log("product added to cart");
        } catch (error) {
          await report({ error1: error });
          clearInterval(popOutChecker);
        }

        await page.waitForTimeout(3000);

        await page.goto("https://secure.newegg.com/shop/cart");

        // await page.waitForTimeout(20000);

        try {
          // Secure Checkout
          let secureCheckout =
            "div.summary-actions > button.btn.btn-primary.btn-wide";

          // setTimeout(async () => {
          await report("Ready To checkout 1");
          await page.waitForSelector(secureCheckout);
          await page.click(secureCheckout, { clickCount: 1, delay: 300 });
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
          await page.waitForTimeout(40000);
        } catch (err) {}

        // await page.waitForTimeout(2000);
        // Enter Security Code
        // let CardNoInput = "#app > .modal-content >  input";
        // let CardNoInput =
        //   "div.modal-content > .modal-body > .form-cells > input.form-text";
        // // "#app > .modal-content > .modal-body > .form-cells > .form-cell.layout-wide > input.form-text";
        // let CardNoButton =
        //   "#app > .modal-content >  .modal-footer > button.btn.btn-primary";

        // try {
        //   let d = await page.content();
        //   console.log({ d });

        //   let r = d.indexOf(
        //     `<input type="text" class="form-text is-wide mask-cardnumber" aria-label="Card Number" value="">`
        //   );

        //   console.log({ r });

        //   console.log("Started with it");
        //   await page.waitForSelector(CardNoInput).then(asyndata => {
        //     console.log("CLICKED");
        //   });

        //   // await page.click(CardNoInput);
        //   await page.type(CardNoInput, input.no);
        //   await report("Card Number Vetted");
        // } catch (error) {
        //   console.log({ error });
        //   await report("Error in vetting Card No");

        //   try {
        //     console.log("Started with it AGIAN");
        //     // await page.waitForSelector(CardNoInput).then(data => {
        //     //   console.log("CLICKED AGAIN");
        //     // });
        //     // await page.click(CardNoInput);
        //     await page.type(CardNoInput, input.no);
        //     await report("Card Number Vetted");
        //   } catch (error) {
        //     console.log();
        //   }
        // }

        // Review Order
        // try {
        //   await page.waitForSelector(
        // CardNoButton,
        //     { timeout: 500 }
        //   );
        //   await page.click(
        // CardNoButton;
        //   );
        // } catch (err) {}

        await page.waitForTimeout(2000);

        // Place Order
        let placeOrder = "div.summary-actions > #btnCreditCard";
        try {
          await page.waitForSelector(placeOrder, { timeout: 500 });
          await page.click(placeOrder);
          await report("Order have been placed");
          status = "success";
        } catch (err) {
          status = "failed";
        }
      } catch (error) {
        await report("Error occured in the checkout process");
        status = "failed";
      }
    } catch (error) {
      status = "failed";
    } finally {
      await page.waitForTimeout(30000);
      let r = page.content();
      console.log(r);
      await page.waitForSelector(order_date);
      let order_date =
        ".item-cell.no-padding-vertical.no-margin-bottom > .message.message-success.is-vertical > .message-wrapper > .message-information >  p > .form-cell-name:(1)nth-child > strong.form-current-value";
      order_date = await page.$(order_date);
      order_date = order_date.toString();
      let order_no =
        ".item-cell.no-padding-vertical.no-margin-bottom > .message.message-success.is-vertical > .message-wrapper > .message-information >  p > .form-cell-name:(2)nth-child > strong.form-current-value";
      order_no = await page.$(order_no);
      order_no = order_no.toString();
      info = { order_date, order_no };
      setTimeout(async () => {
        clearInterval(popOutChecker);
        // await page.close();
        // await browser.close();
        if (status !== "failed") {
          callback(null, { ...input, status, info });
        }
        await report("Ended");
      }, 25000);
    }
  });
};
