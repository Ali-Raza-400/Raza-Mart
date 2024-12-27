import React, { useState } from "react";
import { FaTrash, FaHeart, FaMinus, FaPlus, FaStar, FaPencilAlt, FaRedoAlt } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAProductFromCart,
  removeCartItem,
  setCartItem,
} from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useLazyGetReviewsByProductIdQuery } from "../slices/reviewSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
 const[getReviewsByProductId,{data:ReviewData}]= useLazyGetReviewsByProductIdQuery()
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [review, setReview] = useState({ title: "", id: Math.random() });
  const [reviewList, setReviewList] = useState([]);
  const handleReviewChange = (e) => {
    setReview({ title: e.target.value, id: Math.random() });
  };
  const handleReviewSubmit = (e) => {
    if (review.title === "") {
      alert("Please enter a review"); return;
    }
    e.preventDefault();
    setReviewList([...reviewList, review]);
    setReview({ title: "", id: "" });
    handleClose()
  };
  console.log("reviewList:::", reviewList);

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


  const comments = [
    {
      id: 1,
      name: "Maggie Marsh",
      date: "March 07, 2021",
      status: "Pending",
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      badgeColor: "primary",
    },
    {
      id: 2,
      name: "Lara Stewart",
      date: "March 15, 2021",
      status: "Approved",
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp",
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      badgeColor: "success",
    },
    {
      id: 3,
      name: "Alexa Bennett",
      date: "March 24, 2021",
      status: "Rejected",
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(33).webp",
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      badgeColor: "danger",
    },
    {
      id: 4,
      name: "Betty Walker",
      date: "March 30, 2021",
      status: "Pending",
      avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(24).webp",
      text: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      badgeColor: "primary",
    },
  ];
console.log("ReviewData:::",ReviewData);
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

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 ">
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
                          <button
                            className="btn btn-success btn-sm mb-2 ms-2"
                            onClick={() => getReviewsByProductId(product._id).then((res)=>{
                              console.log("res:::",res);
                            })}
                          >
                            Show Reviews
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
            <Button variant="primary" onClick={handleShow}>
              Click Me
            </Button>

          </div>
          <section style={{ backgroundColor: "#ad655f" }} className="mt-5">
            <div className="container my-5 py-5">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="card text-body">
                    <div className="card-body p-4">
                      <h4 className="mb-0">Recent Reviews</h4>
                      <p className="fw-light mb-4 pb-2">Latest Reviews section by users</p>

                      {ReviewData?.length>0? ReviewData.map((review) => (
                        <div key={review?.id}>
                          <div className="d-flex flex-start">
                            <img
                              className="rounded-circle shadow-1-strong me-3"
                              src={review?.avatar ||"https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"}
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div>
                              <h6 className="fw-bold mb-1">{review?.name}</h6>
                              <div className="d-flex align-items-center mb-3">
                                <p className="mb-0">
                                  {review?.date}
                                  <span className={`badge bg-${review?.badgeColor} ms-2`}>{review?.status}</span>
                                </p>
                                <FaPencilAlt className="ms-3 text-muted" />
                                <FaRedoAlt className={`ms-2 text-${review?.badgeColor}`} />
                                <FaHeart className="ms-2 text-muted" />
                              </div>
                              <p className="mb-0">{review?.comment}</p>
                            </div>
                          </div>
                          <hr className="my-0" />
                        </div>
                      )):"No review"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <Button variant="primary" onClick={handleShow}>
            Click Me
          </Button> */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add a Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-start w-100">
                <img
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                  alt="avatar"
                  width="65"
                  height="65"
                />
                <div className="w-100">
                  <h5>Add a Review</h5>
                  <ul className="rating mb-3" style={{ listStyle: "none", padding: 0, display: "flex", gap: "5px" }}>
                    <li><FaStar className="text-danger" title="Bad" /></li>
                    <li><FaStar className="text-danger" title="Poor" /></li>
                    <li><FaStar className="text-danger" title="OK" /></li>
                    <li><FaStar className="text-danger" title="Good" /></li>
                    <li><FaStar className="text-danger" title="Excellent" /></li>
                  </ul>
                  <Form onSubmit={handleReviewSubmit}>
                    <Form.Group controlId="textAreaExample">
                      <Form.Label>What is your view?</Form.Label>
                      <Form.Control as="textarea" rows={4} value={review.title} onChange={handleReviewChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="success">Clear</Button>
                      <Button variant="danger" type="submit">
                        Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default CartScreen;
