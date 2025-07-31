import React, { useEffect,useState} from "react";
import { useParams,useNavigate} from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

 useEffect(() => {
  const getProductsDetails = async () => {
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`,{
        headers: {
       authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
    });
    result = await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  getProductsDetails();
}, [id]);


  const updateProduct = async () => {
    console.warn(name,price,category,company);
      let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({name,price,category,company}),
      headers: {
        "Content-Type": "application/json",
        authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
    }


  return (
    <div className="product">
      <h1 className="h3">Update Products</h1>

      <input
        type="text"
        placeholder="Enter product name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={updateProduct} className="appButton">
        Updare Product
      </button>
    </div>
  );
};

export default UpdateProduct;
