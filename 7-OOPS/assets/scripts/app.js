class Product {
  title;
  imageUrl;
  price;
  description;

  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute{
    constructor(attrName, attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true){
        this.hookId = renderHookId;
        if(shouldRender){
            this.render();
        }
    }

    render(){ }

    createRootElement(tag, cssClass, attributes){
        const renderEl = document.createElement(tag);
        if(cssClass){
            renderEl.className = cssClass;
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes){
                renderEl.setAttribute(attr.name,attr.value);
            }
        }
        document.getElementById(this.hookId).append(renderEl);
        return renderEl;
    }
}

class ShoppingCart extends Component{
    items = [];

    constructor(renderHookId){
        super(renderHookId);
    }

    set cartItems(value){
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount(){
        const sum = this.items.reduce((prevValue, currItem)=> prevValue + currItem.price,0);
        return sum;
    }

    addProduct(product){
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;

    }

    orderProduct(){
        console.log('Ordering...');
        console.log(this.items);
    }

    render(){
        const cartEl = this.createRootElement('section','cart');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click',() => this.orderProduct());
    }
}

class ProductItem extends Component{
  constructor(product,renderHookId) {
    super(renderHookId,false);
    this.product = product;
    this.render();
  }

  addToCart(){
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li','product-item');
    prodEl.innerHTML = `
        <div>
            <img src = "${this.product.imageUrl} alt = "${this.product.title}">
            <div class = "product-item__content">
                <h2>${this.product.title}</h2>
                <h3>${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
    `;
    const addToCartBtn = prodEl.querySelector('button');
    addToCartBtn.addEventListener('click',this.addToCart.bind(this));
  }
}

class ProductList extends Component{
  products = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts(){
    this.products = [
      new Product(
        "A Pillow",
        "data:image/jpeg;base64,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",
        19.99,
        "A soft pillow"
      ),
      new Product(
        "A Pillow",
        "data:image/jpeg;base64,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",
        49.99,
        "A pile of 4 pillows"
      ),
    ];
    this.renderProducts();
  }

  renderProducts(){
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement('ul','product-list',[new ElementAttribute('id','prod-list')]);
    if(this.products && this.products.length > 0){
        this.renderProducts();
    }
  }
}

class Shop extends Component{

    constructor(){
        super();
    }

    render(){
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class App{
    static init(){
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init();

// const productList = {
//   products: [
//     new Product(
//       "A Pillow",
//       "data:image/jpeg;base64,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",
//       19.99,
//       "A soft pillow"
//     ),
//     new Product(
//       "A Pillow",
//       "data:image/jpeg;base64,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",
//       49.99,
//       "A pile of 4 pillows"
//     ),
//     // {
//     //   title: "A Pillow",
//     //   imageUrl: "data:image/jpeg;base64,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",
//     //   price: 19.99,
//     //   description: "A soft pillow",
//     // },
//     // {
//     //   title: "A Pillow",
//     //   imageUrl:
//     //     "data:image/jpeg;base64,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",
//     //   price: 29.99,
//     //   description: "A pile of 4 pillow",
//     // },
//   ],
//   render() {
//     const renderHook = document.getElementById("app");
//     const prodList = document.createElement("ul");
//     prodList.className = "product-list";
//     for (const prod of this.products) {
//       const prodEl = document.createElement("li");
//       prodEl.className = "product-item";
//       prodEl.innerHTML = `
//                 <div>
//                     <img src = "${prod.imageUrl} alt = "${prod.title}">
//                     <div class = "product-item__content">
//                         <h2>${prod.title}</h2>
//                         <h3>${prod.price}</h3>
//                         <p>${prod.description}</p>
//                         <button>Add to Cart</button>
//                     </div>
//                 </div>
//             `;
//       prodList.append(prodEl);
//     }
//     renderHook.append(prodList);
//   },
// };

// productList.render();
