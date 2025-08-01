import React from "react";

const AddProducts = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setComapny] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:` bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="product">
      <h1 className="h3">Add Products</h1>

      <input
        type="text"
        placeholder="Enter product name"
        className="inputbox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && !name && (
        <span className="invalid-input">*enter valid name*</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {error && !price && (
        <span className="invalid-input">*enter valid price*</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputbox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {error && !category && (
        <span className="invalid-input">*enter valid category*</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox"
        value={company}
        onChange={(e) => setComapny(e.target.value)}
      />

      {error && !company && (
        <span className="invalid-input">*enter valid company*</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProducts;
