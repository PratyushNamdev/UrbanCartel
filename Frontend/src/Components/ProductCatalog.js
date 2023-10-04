import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/Slices/ProductSlice";
import ProductCard from "./ProductCard";
import Style from "../CSS/ProductCatalog.module.css";
import { getMoreProducts } from "../Store/Slices/ProductSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
//import { stayLogin } from "../Store/Slices/AuthenticationSlice";
import toast from "react-hot-toast";
export default function ProductCatalog(props) {
  const { productData, totalData, length, isLoading } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const [dropdownValue, setDropdownValue] = useState("null");

  let category, value;

  const location = useLocation();

  // Check if location.state exists
  if (location.state) {
    // Props are coming from route state
    category = location.state.category;
    value = location.state.value;
    // Now you can use category and value as needed
  } else {
    // Props are not coming from route state, use the normal props
    category = props.category;
    value = props.value;
    // Now you can use category and value as needed
  }

  useEffect(() => {
    setPage(2);
    dispatch(getProducts({ key: category, value: value, sort: dropdownValue }));
    // eslint-disable-next-line
  }, [dropdownValue]);
  const onChange = (e) => {
    setDropdownValue(e.target.value);
    // dispatch(setSort({data:e.target.value}));
  };
  const call = async () => {
    try {
      setPage((prevPage) => prevPage + 1);
      const response = await fetch(
        `http://192.168.204.122:5000/api/product/products?${category}=${value}&page=${page}&sort=${dropdownValue}`
      );
      const result = await response.json();
      dispatch(getMoreProducts(result));
    } catch (e) {
      toast.error("Cannot fetch aanymore !!");
    }
  };
 
  if (productData.length > 1) {
    return (
      <>
        {isLoading && (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "2em auto",
              padding: "3em",
            }}
          >
            <Skeleton count={100} />
          </div>
        )}
        <div className={Style.pricesortdropdown}>
          <select id="dropdown" value={dropdownValue} onChange={onChange}>
            <option value="null">Popular</option>
            <option value="price-asc">Low To High</option>
            <option value="price-desc">High To Low</option>
          </select>
        </div>
        <InfiniteScroll
          dataLength={length}
          next={call}
          hasMore={totalData !== length}
          inverse={false}
        >
          <div className={Style.listing_container}>
            {
              // eslint-disable-next-line
              productData.map((data) => {
                if (data.images.length >= 1) {
                  return <ProductCard key={Math.random()} data={data} />;
                }
              })
            }
          </div>
        </InfiniteScroll>
      </>
    );
  }
  if (isLoading) {
    return( <>{ isLoading && (
     <div
       style={{
         width: "100%",
         maxWidth: "1200px",
         margin: "2em auto",
         padding: "3em",
       }}
     >
       <Skeleton count={100} />
     </div>
   )}
   </>)
 }
  return <div>this is lol</div>;
}
