import { addToCart } from "../../services/Cart.js";

export default class Product extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("h6").textContent = `$${product.price}`;
    this.querySelector("img").src = product.image;
    this.querySelector("a").addEventListener("click", (event) => {
      console.log(event.target.tagName);
      if (event.target.tagName.toLowerCase() == "button") {
        addToCart(product.id);
      } else {
        app.router.go(`/product-${product.id}`);
      }
      event.preventDefault();
    });
  }
}

customElements.define("product-item", Product);
