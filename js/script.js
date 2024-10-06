function getElem(elem) {
  const element = document.querySelector(elem);
  const elements = document.querySelectorAll(elem);
  return {
    element,
    elements,
  };
}
const display = getElem(".display").element;
const btn = getElem(".product-nav").element;

window.onload = init;

async function init() {
  try {
    const menu = await fetchData();
    display.innerHTML = displayProductItems(menu).join("");
    await filterData();
  } catch (e) {
    console.log(e);
  }
}

function displayProductItems(menu) {
  return menu.map((product) => {
    const result = `
            <div class="card">
                <div class="image">
                  <img src="${product.img}" alt="" />
                </div>
                <div class="card-text">
                    <div class="title">${product.title}</div>
                    <div class="price">${product.price}</div>
                </div>
            </div>
          `;
    return result;
  });
}

async function fetchData() {
  const response = await fetch("products.json");
  const data = await response.json();
  return data;
}

async function filterData() {
  try {
    const menu = await fetchData();
    btn.addEventListener("change", async function (e) {
      const category = e.target.value;
      const filtered = menu.filter((item) => item.category === category);
      if (category === "all") {
        display.innerHTML = displayProductItems(menu).join("");
      } else {
        display.innerHTML = displayProductItems(filtered).join("");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
