import React, { useEffect } from "react";
import { useLazyGetProductsQuery } from "../slices/productSlice";
import { setCartItem } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const { keyword,pageNumber } = useParams();

  const dispatch = useDispatch()
  const [getProducts, { data, isLoading }] = useLazyGetProductsQuery();
  console.log("data", data);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts({ keyword ,pageNumber});
        console.log("response:::", response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [keyword,pageNumber]);

  const addToCart = (product) => {
    console.log("product:::", product);
    dispatch(setCartItem(product))
  }
  return (
    <>
      {/* <header className="bg-dark ">
  <div className=" " >
    <div className="text-center">
      <img style={{maxHeight:"100%",objectFit:"cover"}}
        src="https://res.cloudinary.com/dwqmexglg/image/upload/v1731950010/imageUpload/bknfondt7ejymp5nsum7.jpg"
        alt="Shop Image"
        className="img-fluid"
        
      />
    </div>
  </div>
</header> */}

<>{isLoading&& "isLoading..."}</>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {/* Map over your products */}
            {data?.products?.length > 0 ? data?.products?.map((product, index) => (
              <div className="col mb-5" key={index}>
                <div className="card h-100">
                  {/* Example: Sale Badge */}
                  {index % 2 === 0 && (
                    <div
                      className="badge bg-dark text-white position-absolute"
                      style={{ top: "0.5rem", right: "0.5rem" }}
                    >
                      Sale
                    </div>
                  )}
                  <img
                    className="card-img-top"
                    src={
                      product?.image ||
                      "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                    }
                    height={'100%'}
                    width={'100%'}
                    alt="..."
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">
                        {product?.name}
                      </h5>
                      <p className="font-bold">{product?.description}</p>
                      <span className="text-muted text-decoration-line-through">
                        {`$${JSON.parse(product?.price) + 50}` || "$50.00"}
                      </span>{" "}
                      {`$${product?.price}` || "$25.00"}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent display-flex ">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" onClick={() => addToCart(product)}>
                        Add to cart
                      </a>
                    </div>
                    <div className="text-center mt-3">
                      <a className="btn btn-outline-dark mt-auto" href={`/product/${product?._id}`}>
                        View Product
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )) : <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "50vh" }}>No Product Found</div>}
          </div>
          <Paginate
            pages={data?.pages}
            page={data?.page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      </section>
    </>
  );
};


export default HomeScreen;
