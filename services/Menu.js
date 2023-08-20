import { API } from "./API.js";

export default async function loadData() {
  const data = await API.fetchMenu();
  app.store.menu = data;
}
