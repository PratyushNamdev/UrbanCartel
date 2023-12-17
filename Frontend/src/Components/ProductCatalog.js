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
import toast from "react-hot-toast";
// import {host} from "../Helper/host";
import {api} from "../Services/api";
export default function ProductCatalog(props) {
  // Retrieve product data and related information from the Redux store
  const { productData, totalData, length, isLoading } = useSelector(
    (store) => store.products
  );
  const dispatch = useDispatch();

  // State for managing the current page number in pagination
  const [page, setPage] = useState(2);

  // State for managing the sorting dropdown value
  const [dropdownValue, setDropdownValue] = useState("null");

  // Retrieve the host information from environment variables
  // const host = process.env.REACT_APP_HOST;
  // Variables for category and value
  let category, value;

  // Detect whether route state or normal props are used for category and value
  const location = useLocation();
  if (location.state) {
    category = location.state.category;
    value = location.state.value;
  } else {
    category = props.category;
    value = props.value;
  }

  // Fetch products based on category, value, and sort criteria
  useEffect(() => {
    setPage(2);
    dispatch(getProducts({ key: category, value: value, sort: dropdownValue }));
       // eslint-disable-next-line
  }, [dropdownValue]);

  // Handle sorting dropdown change
  const onChange = (e) => {
    setDropdownValue(e.target.value);
  };

  // Fetch more products as the user scrolls
  // const call = async () => {
  //   try {
  //     setPage((prevPage) => prevPage + 1);
  //     const response = await fetch(
  //       `${host}/api/product/products?${category}=${value}&page=${page}&sort=${dropdownValue}`
  //     ,{
  //       headers:{'ngrok-skip-browser-warning': 'true'}
  //     });
  //     const result = await response.json();
  //     dispatch(getMoreProducts(result));
  //   } catch (e) {
  //     toast.error("Cannot fetch any more products!!");
  //   }
  // };
  const call = async()=>{
    try {
          setPage((prevPage) => prevPage + 1);
          const result = await api.get(`/api/product/products?${category}=${value}&page=${page}&sort=${dropdownValue}`)
          dispatch(getMoreProducts(result));
        } catch (e) {
          toast.error("Cannot fetch any more products!!");
        }
  }

  // Render a loading skeleton if data is still loading
  if (isLoading) {
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
      </>
    );
  }

  // Render product listings and sorting dropdown once data is available
  if (productData?.length > 1) {
    return (
      <>
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
          loader={<h4>Loading...</h4>}
        >
          <div className={Style.listing_container}>
            {
                // eslint-disable-next-line
            productData.map((data) => {
              if (data.images.length >= 1) {
                return <ProductCard key={Math.random()} data={data} />;
              }
            })}
          </div>
        </InfiniteScroll>
      </>
    );
  }

  // Render a message if there are no products to show
  if (!length) {
    return (
      <>
        <div>Nothing to Show</div>
      </>
    );
  }

  // Fallback in case none of the above conditions are met
  return <div>This is a fallback message.</div>;
}









































// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../Store/Slices/ProductSlice";
// import ProductCard from "./ProductCard";
// import Style from "../CSS/ProductCatalog.module.css";
// import { getMoreProducts } from "../Store/Slices/ProductSlice";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useLocation } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// import toast from "react-hot-toast";
// export default function ProductCatalog(props) {
//   const { productData, totalData, length, isLoading } = useSelector(
//     (store) => store.products
//   );
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(2);
//   const [dropdownValue, setDropdownValue] = useState("null");
//  const host = process.env.REACT_APP_HOST;
//   let category, value;

//   const location = useLocation();

//   // Check if location.state exists
//   if (location.state) {
//     // Props are coming from route state
//     category = location.state.category;
//     value = location.state.value;
//     // Now you can use category and value as needed
//   } else {
//     // Props are not coming from route state, use the normal props
//     category = props.category;
//     value = props.value;
//     // Now you can use category and value as needed
//   }

//   useEffect(() => {
//     setPage(2);
//    dispatch(getProducts({ key: category, value: value, sort: dropdownValue }));
//    // eslint-disable-next-line
//   }, [dropdownValue]);
//   const onChange = (e) => {
//     setDropdownValue(e.target.value);
//     // dispatch(setSort({data:e.target.value}));
//   };
//   const call = async () => {
//     try {
//       setPage((prevPage) => prevPage + 1);
//       const response = await fetch(
//         `${host}/api/product/products?${category}=${value}&page=${page}&sort=${dropdownValue}`
//       );
//       const result = await response.json();
//       dispatch(getMoreProducts(result));
//     } catch (e) {
//       toast.error("Cannot fetch aanymore !!");
//     }
//   };

//   if (isLoading) {
//     return( <>{ isLoading && (
//      <div
//        style={{
//          width: "100%",
//          maxWidth: "1200px",
//          margin: "2em auto",
//          padding: "3em",
//        }}
//      >
//        <Skeleton count={100} />
//      </div>
//    )}
//    </>)
//  }
//   if (productData?.length > 1) {
//     return (
//       <>
//         {isLoading && (
//           <div
//             style={{
//               width: "100%",
//               maxWidth: "1200px",
//               margin: "2em auto",
//               padding: "3em",
//             }}
//           >
//             <Skeleton count={100} />
//           </div>
//         )}
//         <div className={Style.pricesortdropdown}>
//           <select id="dropdown" value={dropdownValue} onChange={onChange}>
//             <option value="null">Popular</option>
//             <option value="price-asc">Low To High</option>
//             <option value="price-desc">High To Low</option>
//           </select>
//         </div>
//         <InfiniteScroll
//          dataLength={length}
//           next={call}
//           hasMore={totalData !== length}
//           inverse={false}
//         >
//           <div className={Style.listing_container}>
//             {
//               // eslint-disable-next-line
//               productData.map((data) => {
//                 if (data.images.length >= 1) {
//                   return <ProductCard key={Math.random()} data={data} />;
//                 }
//               })
//             }
//           </div>
//         </InfiniteScroll>
//       </>
//     );
//   }
//   if(!length){
//     return (
//       <>
//       <div>Nothing to Show</div>
//       </>
//     )
//   }
//   return <div>this is lol</div>;
// }
