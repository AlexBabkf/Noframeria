import { removeFromCart } from "../../services/Cart.js";

export default class CartCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const item = JSON.parse(this.dataset.item);
    this.innerHTML = "";

    const template = document.getElementById("cart-card-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    this.querySelector(".qty").textContent = `${item.quantity}x`;
    this.querySelector(".name").textContent = item.product.name;
    this.querySelector(".price").textContent = `$${(
      item.product.price * item.quantity
    ).toFixed(2)}`;
    this.querySelector("a.delete-button").addEventListener("click", (event) => {
      removeFromCart(item.product.id);
    });
  }
}

customElements.define("cart-card", CartCard);
