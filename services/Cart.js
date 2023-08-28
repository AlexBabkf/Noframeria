import { getProductById } from "../components/DetailedPage/index.js";

export async function addToCart(id) {
  const product = await getProductById(id);

  const results = app.store.cart.filter((prod) => prod.product.id == id);

  console.log("adding");
  if (results.length === 1) {
    app.store.cart = app.store.cart.map((prod) =>
      prod.product.id == id ? { ...prod, quantity: prod.quantity + 1 } : prod
    );
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
    console.log("else" + app.store.cart);
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id != id);
}
