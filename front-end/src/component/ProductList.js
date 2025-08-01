import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
 const getProducts = async () => {
   let result = await fetch("http://localhost:5000/products", {
     headers: {
       authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
   });
  result = await result.json();
  setProducts(result);
};

  const deleteProduct=async(id)=>{
    let result=await fetch(`http://localhost:5000/product/${id}`,{
      method:"Delete",
        headers: {
       authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
    })
    result=await result.json()
    if (result) {
       getProducts();
      alert("recordnis delete")
    }
  }

   const searchHandel = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
          headers: {
       authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h1 className="h5">Product List</h1>
      <input type="text" placeholder="Search Products" className="search-box"
        onChange={searchHandel}
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        products.length>0?
        products.map((item,index)=>
      <ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
       <li>
       <div className="action-buttons">
        <button className="delete-btn" onClick={() => deleteProduct(item._id)}>Delete</button>
        <Link className="update-btn" to={"/update/" + item._id}>Update</Link>
       </div>
      </li>

      </ul>

        ): (
        <h2 className="search-data">*No results found*</h2>
      )
      }
    </div>
  );
};
export default ProductList;
