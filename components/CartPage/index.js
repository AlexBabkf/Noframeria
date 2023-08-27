import CartCard from "../CartCard/index.js";

export default class CartPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    address: "",
    email: "",
  };

  constructor() {
    super();
  }

  connectedCallback() {
    const section = document.createElement("section");
    this.appendChild(section);

    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let section = this.querySelector("section");
    if (app.store.cart.length === 0) {
      section.innerHTML = `<p class='empty'>Your order is empty</p>`;
    } else {
      section.innerHTML = `<h2>Your Order</h2><ul></ul>`;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);
      this.setFormBindings(this.querySelector("ul").appendChild(item));

      let total = 0;

      for (let prod of this.app.store.cart) {
        const item = document.createElement("cart-card");
        item.dataset.item = JSON.stringify(prod);
        this.querySelector("ul").appendChild(item);
        total += prod.quantity * prod.product.price;
      }

      this.querySelector("ul").innerHTML += `  <li>
      <p class='total'>Total</p>
      <p class='price-total'>$${total.toFixed(2)}</p>
  </li>`;
    }
  }

  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        `Thanks for your order ${this.#user.name}. ${
          this.#user.email
            ? "We will be sending you the receipt over email."
            : "Ask at the counter for a receipt."
        }`
      );
      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";

      // TODO: sent user and cart's details to the server
    });

    // Double data binding (Angular)

    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });

    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        element.addEventListener("change", (event) => {
          this.#user[element.name] = element.value;
        });
      }
    });
  }
}

customElements.define("cart-page", CartPage);
