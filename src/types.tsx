export interface RestaurantType {
  id: number;
  name: string;
  description: string;
  photo: string;
  items?: MenuType;
}

export interface MenuType {
  restaurantId?: number;
  id: number;
  name: string;
  category?: string;
  price?: number;
  photo?: string;
}

export interface CartItem {
  restaurantId?: number;
  menuItem: MenuType;
  quantity: number;
}
