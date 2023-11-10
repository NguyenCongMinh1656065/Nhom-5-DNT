import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./search.module.css";

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  color: string;
  hexCode: string;
  imgUrl: string;
  view?: string;
}

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const storedSearchKeyword = localStorage.getItem("searchKeyword") || "";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeywordFromURL = searchParams.get("name") || "";
  const [searchKeyword, setSearchKeyword] = useState(searchKeywordFromURL);
  const similarName = searchKeyword?.split(" ") ?? [];
  const searchColor = similarName[similarName.length - 1];

  useEffect(() => {
    setSearchKeyword(searchKeywordFromURL);
  }, [searchKeywordFromURL]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      const limitedProduct = filteredProducts.slice(0, 4);
      setSimilarProducts(limitedProduct);
    };
    fetchSimilarProducts();
  }, [searchKeyword]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = () => {
    setShowSearch(false);
    const searchURL = `/search?name=${encodeURIComponent(searchKeyword)}`;
    console.log(searchURL);
    navigate(searchURL);
    handleScrollToTop();
    window.location.href = searchURL;
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      setShowSearch(false);
      handleSearch();
    }
  };
  function handleSearchToggle() {
    setShowSearch(!showSearch);
    inputRef.current?.focus();
  }

  return (
    <>
      <div className={`d-flex ${styles["form"]}`}>
        <input
          className={`${styles["input-search"]}`}
          type="search"
          placeholder="Search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`btn  ${styles["btn-search"]}`}
          onClick={handleSearch}
        >
          <i
            className={`fa-solid fa-magnifying-glass fa-lg ${styles["fa-magnifying-glass"]}`}
            style={{ color: "#198754" }}
          ></i>
        </button>
      </div>
      <div className={`${styles["same-results"]}`}>
        <br />
        <h4>Có thể bạn đang tìm: </h4>
        {similarProducts.map((product) => (
          <div key={product.id} className={`${styles["similarProducts"]}`}>
            <img
              src={product.imgUrl}
              alt={product.name}
              style={{ width: "40px", height: "40px" }}
            />
            {product.name}
            {product.color}
            {/* product.description*/}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
