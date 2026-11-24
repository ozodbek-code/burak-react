import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";



/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrderspageState;
}

/** Home Page**/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** Products Page**/
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** Orders Page**/
export interface OrderspageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}