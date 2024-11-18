import React, { useEffect } from "react";
import { useLazyGetProductsQuery } from "../slices/productSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate=useNavigate()
  
  const [getProducts, { data, isLoading }] = useLazyGetProductsQuery();
  console.log("data", data);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        console.log("response:::", response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
     <header className="bg-dark ">
  <div className=" " >
    <div className="text-center">
      <img style={{maxHeight:"100%",objectFit:"cover"}}
        src="https://res.cloudinary.com/dwqmexglg/image/upload/v1731950010/imageUpload/bknfondt7ejymp5nsum7.jpg"
        alt="Shop Image"
        className="img-fluid"
        
      />
    </div>
  </div>
</header>


      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {/* Map over your products */}
            {data?.map((product, index) => (
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
                       {`$${JSON.parse(product?.price)+50}`|| "$50.00"}
                      </span>{" "}
                     {`$${product?.price}`|| "$25.00"}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent display-flex ">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href={`/cart`}>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};


export default HomeScreen;
