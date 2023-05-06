export class Menu {
  constructor(menu_id, category, description, image_url, price, shop_id, menu) {
      this.menu_id = menu_id; // 카테고리 정보 추가
      this.category = category;
      this.description = description;
      this.image_url= image_url;
      this.price = price;
      this.shop_id = shop_id;
      this.menu = menu;
    }
  }
  export default Menu;