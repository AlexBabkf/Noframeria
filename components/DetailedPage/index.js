import { addToCart } from "../../services/Cart.js";

export async function getProductById(id) {
  if (app.store.menu == null) {
    await loadData();
  }
  for (let category of app.store.menu) {
    for (let product of category.products) {
      if (product.id == id) {
        return product;
      }
    }
  }
}

export default class DetailedPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("detailed-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/DetailedPage/DetailedPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  async render() {
    if (this.dataset.id) {
      this.product = await getProductById(this.dataset.id);
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = this.product.image;
      this.root.querySelector(".description").textContent =
        this.product.description;
      this.root.querySelector(
        ".price"
      ).textContent = `$ ${this.product.price.toFixed(2)}`;
      this.root
        .querySelector("button")
        .addEventListener("click", () => addToCart(this.product.id));
    } else {
      //  need to think
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("detailed-page", DetailedPage);
