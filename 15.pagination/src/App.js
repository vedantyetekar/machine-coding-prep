import { useEffect, useState } from "react";
import "./App.css";

const GET_PRODUCTS_API = "https://api.escuelajs.co/api/v1/products";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const getProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    );
    const { products } = await response.json();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div className="container">
      <div className="products">
        {products &&
          products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <img alt={product.title} src={product?.images[0]} />
                <span>{product.title} </span>
              </div>
            );
          })}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export const Pagination = ({ page, setPage }) => {
  return (
    <div className="pagination">
      <span
        style={{
          opacity: `${page === 1 ? "0.7" : ""}`,
          cursor: `${page === 1 ? "not-allowed" : ""}`,
        }}
        onClick={() => setPage((prev) => (prev !== 1 ? prev - 1 : prev))}
      >
        {"<-"}
      </span>
      {[...Array(10)].map((val, id) => {
        return (
          <span onClick={() => setPage(id + 1)} key={id}>
            {id + 1}
          </span>
        );
      })}
      <span
        style={{
          opacity: `${page === 10 ? "0.7" : ""}`,
          cursor: `${page === 10 ? "not-allowed" : ""}`,
        }}
        onClick={() => setPage((prev) => (prev !== 10 ? prev + 1 : prev))}
      >
        {"->"}
      </span>
    </div>
  );
};

export default App;
