import React from "react";
import { FaTrash, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAProductFromCart,
  removeCartItem,
  setCartItem,
} from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const {
    cart: { cartItems },
  } = useSelector((state) => state.cartDetail);
  const handleQuantityChange = (newQuantity, product) => {
    if (newQuantity >= 0) {
      dispatch(setCartItem({ ...product, quantity: newQuantity }));
    }
  };
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(removeCartItem(product._id));
    } else {
      console.log("Cannot decrease further or prompt to remove item");
    }
  };
  const removeProduct = (product) => {
    dispatch(clearAProductFromCart(product._id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handlePay = async () => {
    try {
      const product = [...cartItems];
      const resp = await createOrder(product);
      console.log("resp:::", resp);
      if (resp?.data?.stripeSessionUrl) {
        window.location.href = resp.data.stripeSessionUrl; // Use window.location.href to redirect
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Payment gateway integration is not implemented", cartItems);
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              {cartItems?.length > 0 ? (
                cartItems.map((product, index) => {
                  console.log("product::", product);
                  return (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div className="bg-image hover-overlay hover-zoom ripple rounded">
                            <img
                              src={
                                product?.image ||
                                "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                              }
                              className="w-100"
                              alt="Blue Jeans Jacket"
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p>
                            <strong>{product?.name}</strong>
                          </p>
                          <p>Color: blue</p>
                          <p>Size: M</p>
                          <button
                            className="btn btn-primary btn-sm me-1 mb-2"
                            title="Remove item"
                            onClick={() => removeProduct(product)}
                          >
                            <FaTrash />
                          </button>
                          <button
                            className="btn btn-danger btn-sm mb-2"
                            title="Move to the wish list"
                          >
                            <FaHeart />
                          </button>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              className="btn btn-primary px-3 me-2"
                              disabled={product.quantity <= 1}
                              onClick={(e) => {
                                const input = e.target
                                  .closest("div")
                                  .querySelector("input");
                                const newQuantity =
                                  parseInt(input.value, 10) - 1; // Decrease quantity
                                if (newQuantity >= 0) {
                                  input.stepDown();
                                  handleDecreaseQuantity(product);
                                }
                              }}
                            >
                              <FaMinus />
                            </button>
                            <div className="form-outline">
                              <input
                                id="form1"
                                min="0"
                                defaultValue={product?.quantity || 0}
                                type="number"
                                className="form-control"
                                readOnly // Prevent manual typing
                                style={{
                                  appearance: "none",
                                  MozAppearance: "textfield",
                                }} // Hide spinners
                              />
                              <label className="form-label" htmlFor="form1">
                                Quantity
                              </label>
                            </div>

                            <button
                              className="btn btn-primary px-3 ms-2"
                              onClick={(e) => {
                                const input = e.target
                                  .closest("div")
                                  .querySelector("input");
                                input.stepUp();
                                handleQuantityChange(
                                  parseInt(input.value, 10) || 0,
                                  product
                                );
                              }}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <p className="text-start text-md-center">
                            <strong>$ {product?.price}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>Cart Empty</>
              )}
            </div>

            {/* Other cards */}
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center px-0"
                    >
                      <div>
                        <strong>{item.name}</strong> x {item.quantity}
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                  {/* <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <strong>Shipping</strong>
                    <span>Gratis</span>
                  </li> */}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${getTotalPrice().toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handlePay}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartScreen;
