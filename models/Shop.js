export class Menu {
    constructor(shop_id, category, image_url, latitude, longitude, shop_name, seller_id) {
        this.menu_id = menu_id; // 카테고리 정보 추가
        this.category = category;
        this.image_url= image_url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.shop_id = shop_id;
        this.shop_name = shop_name;
        this.seller_id = seller_id;
      }
    }
    export default Menu;