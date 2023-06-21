export interface RestaurantType {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface MenuType {
  id: number;
  name: string;
  category: string;
  price: number;
  photo: string;
}

export interface CartItem {
  menuItem: MenuType;
  quantity: number;
}
