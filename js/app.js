//show result after searching category name
const loadProducts = () => {
  // const searchField = document.getElementById('search-field');
  // const searchText = searchField.value;
  // searchField.value="";
  // const url = `https://fakestoreapi.com/products/category/${searchText}`;
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
 loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src="${image}"></img>
      </div>
      <h3>${product.title}</h3>
      <h5>Category: ${product.category}</h5>
      <h2>Price: $ ${product.price}</h2>
      <span style="color:grey"><i class="fas fa-star"></i></span>
      <span style="color:grey"><i class="fas fa-star"></i></span>
      <span style="color:grey"><i class="fas fa-star"></i></span>
      <span style="color:grey"><i class="fas fa-star"></i></span>
      <span style="color:grey"><i class="fas fa-star-half-alt"></i></span>
      <h3 style="color:grey">Average rating: ${product.rating.rate}</h3>
      <h4 style="color:grey">No of person rated this product: ${product.rating.count} </h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="addDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//click add deatails button to get details of product
const addDetails =id =>{
  const url=`https://fakestoreapi.com/products/${id}`;
  fetch(url)
          .then(res=>res.json())
          .then(data=>showDetails(data))
}
const showDetails = productDetails =>{
  const detailProduct =document.getElementById("product-detail");
  const div = document.createElement("div");
  detailProduct.textContent="";
  div.innerHTML=`
  <div class="product-detail-image">
  <img style='width: 300px; height: 300px;' src="${productDetails.image}" alt="">
  </div>
  <div class="product-detail text-arap">
  <h3>${productDetails.title}</h3>
  <p>Category: <span style="color:grey"> ${productDetails.category}</span></p>
  <h6>Description: <span style="color:grey"> ${productDetails.description.slice(0,150)}</span></h6>
  <h2>Price: <span style="color:grey"> $ ${productDetails.price}</span></h2>
  <span><i class="fas fa-star"></i></span>
  <span><i class="fas fa-star"></i></span>
  <span><i class="fas fa-star"></i></span>
  <span><i class="fas fa-star"></i></span>
  <span><i class="fas fa-star-half-alt"></i></span>
  <h3>Rate: <span style="color:grey"> ${productDetails.rating.rate}</span></h3>
  <h4>Count: <span style="color:grey"> ${productDetails.rating.count}</span></h4>
  <button onclick="addToCart(${productDetails.id},${productDetails.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
  </div> 
  `
  detailProduct.appendChild(div);
}
// addtion of product no, price, delivery-charge,tax & total price 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =parseFloat(grandTotal).toFixed(2);
};
