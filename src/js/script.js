const pasteBtn1 = document.querySelector(".paste1");
const pasteBtn2 = document.querySelector(".paste2");
const pasteArea1 = document.querySelector(".singleProduct-halfGrid-image--1");
const pasteArea2 = document.querySelector(".singleProduct-halfGrid-image--2");
const userInputBtn = document.querySelector(".enter");
const userInputForm = document.getElementById("userInputForm");
const extraSizeBtns = document.querySelectorAll('.extraSizeBtn')

let userInputData;

navigator.clipboard
  .readText()
  .then((clipText) => {
    console.log('clipboard text:', clipText);
  });

async function parseClipboardData(pasteTarget) {
  const items = await navigator.clipboard.read().catch((err) => {
    console.error(err);
  });
  for (let item of items) {
    for (let type of item.types) {
      if (type.startsWith("image/")) {
        item.getType(type).then((imageBlob) => {
          const image = `<img src="${window.URL.createObjectURL(
            imageBlob
          ) }" />`;
          let existingImage = pasteTarget.children;
          if (existingImage) {
            existingImage.remove;
          }
          pasteTarget.innerHTML = image;
        });
        return true;
      }
    }
  }
}



pasteBtn1.addEventListener("click", () => {
  console.log("click me");

  parseClipboardData(pasteArea1);
});

pasteBtn2.addEventListener("click", () => {
  console.log("click me");

  parseClipboardData(pasteArea2);
});

const mapFromDataToSheet = (userInputForm) => {
  let userInputData = new FormData(userInputForm);
  for (const pair of userInputData.entries()) {
    // excludes barcode from being mapped
    if (!pair[1]) { continue; }
    if (pair[0].includes('barcode')) { 
      JsBarcode(`#${pair[0]}`, pair[1]);

     }
    document.getElementById(`${ pair[0] }`).innerText = '';
    document.getElementById(`${ pair[0] }`).innerText = `${ pair[1] }`;
    console.log(`${pair[0]}, ${pair[1]}`);
  }
}

userInputBtn.addEventListener("click", () => {
  mapFromDataToSheet(userInputForm);
  
})

// let formState = {
//   form1: {
//     numOfSizes: 3
//   },
//   form2: {
//     numOfSizes: 3
//   }
// };


const displayExtraSizeInput = (btn) => {
  // formState.form1.numOfSizes = 1++;

  btn.insertAdjacentHTML("beforeBegin", `
  <label for="size4">4th Size Name:</label>
  <input type="text" name="size4">
  <label for="barcode4">4th UPC Barcode</label>
  <input type="text" name="barcode4">
  <label for="sku4">4th SKU Number</label>
  <input type="text" name="sku4">
  <br>
  `);
  
}

extraSizeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    console.log('extra size generate!');
    console.log(e.target);
    console.log(e.target.id);

    displayExtraSizeInput(e.target);
  })
})

