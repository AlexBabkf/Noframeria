export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
              <h1>${category.name}</h1>
              <ul class='category'>
              </ul>`;
        this.root.querySelector("#menu").appendChild(liCategory);
        category.products.map((product) => {
          const item = document.createElement("product-item");

          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
