import { Router } from "./services/Router.js";
import proxyStore from "./services/Store.js";
import loadData from "./services/Menu.js";

import MenuPage from "./components/MenuPage/index.js";
import Product from "./components/Product/index.js";
import DetailedPage from "./components/DetailedPage/index.js";
import CartPage from "./components/CartPage/index.js";

window.app = {};

app.router = Router;
app.store = proxyStore;
console.log(window.app);
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const cartCounter = document.getElementById("cartCounter");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCounter.textContent = qty;
  console.log(cartCounter.qty);
  cartCounter.hidden = qty == 0;
});
