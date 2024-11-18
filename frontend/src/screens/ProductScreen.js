import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetProductByCategoryQuery, useLazyGetSingleProductsQuery } from "../slices/productSlice";

const ProductScreen = () => {
  const params = useParams();
  console.log("params:::", params);
  const [getSingleProducts, { isLoading, data }] =
    useLazyGetSingleProductsQuery();
    const [getProductByCategory,{data:relatedProduct,isLoading:relProLoading}]=useLazyGetProductByCategoryQuery()
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        await getSingleProducts(params);
        await getProductByCategory(params)
      } catch (error) {
        console.log(error);
      }
    }
    params &&  fetchProductDetail();
  }, [params]);
  console.log("relatedProduct:::",relatedProduct);

  const ProductSection = () => (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={data?.image||"https://dummyimage.com/600x700/dee2e6/6c757d.jpg"}
              alt="Product"
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">SKU: BST-498</div>
            <h1 className="display-5 fw-bolder">{data?.name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">$45.00</span>
              <span> ${data?.price}</span>
            </div>
            <p className="lead">
              {data?.description}
            </p>
            <div className="d-flex">
              <input
                className="form-control text-center me-3"
                id="inputQuantity"
                type="num"
                defaultValue="1"
                style={{ maxWidth: "3rem" }}
              />
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
              >
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  const RelatedProducts = () => {

    return (
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {relatedProduct && relatedProduct?.map((product) => (
              <div key={product.id} className="col mb-5">
                <div className="card h-100">
                  {product.sale && (
                    <div
                      className="badge bg-dark text-white position-absolute"
                      style={{ top: "0.5rem", right: "0.5rem" }}
                    >
                      Sale
                    </div>
                  )}
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.name}</h5>
                      <div>${product.price}</div>
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <ProductSection />
      <RelatedProducts />
    </>
  );
};

export default ProductScreen;
