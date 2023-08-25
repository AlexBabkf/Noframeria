const savedCart = localStorage.getItem("cart");
const initialCart = savedCart ? JSON.parse(savedCart) : [];

const Store = {
  menu: null,
  cart: initialCart,
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property === "cart") {
      window.dispatchEvent(new Event("appcartchange"));
      localStorage.setItem("cart", JSON.stringify(value));
    }
    return true;
  },
});

export default proxyStore;
