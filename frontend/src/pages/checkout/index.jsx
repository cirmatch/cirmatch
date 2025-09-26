import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCart, clearCart } from "@/config/redux/action/cartAction";
import { createOrder } from "@/config/redux/action/orderAction"; 
import CartSummary from "@/components/Cart/CartSummary";
import UserLayout from "@/layout/clienLayout/UserLayout";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

// Helper to convert quantity between units
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

function InputField({ name, value, onChange, placeholder }) {
  return (      
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full px-5 py-3 rounded-lg bg-gray-50 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-600 transition duration-300 ease-in-out text-gray-900 font-medium hover:shadow-md"
    />
  );
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cart, isLoading: cartLoading, isError: cartError, message: cartMessage } = useSelector((state) => state.cart);
  const { isLoading: orderLoading, isError: orderError, message: orderMessage } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    address: "",
    note: "",
  });

  const [checkoutSummary, setCheckoutSummary] = useState({
    subtotal: 0,
    shippingCost: 0,
    total: 0,
  });

  useEffect(() => {
    dispatch(userCart());
  }, [dispatch]);

  // Calculate summary when cart updates
  useEffect(() => {
    if (cart?.items?.length) {
      const subtotal = cart.items.reduce((sum, item) => {
        const qty = item.quantity || 0;
        const price = item.productId?.price || 0;

        // Parse listing unit from product quantity
        const match = item.productId?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
        const listingUnit = match ? match[3] : "Kg";

        // Convert user quantity to listing unit for price calculation
        const qtyInListingUnit = convertQuantity(qty, item.unit, listingUnit);

        return sum + price * qtyInListingUnit;
      }, 0);

      const shipping = 0;
      const total = subtotal + shipping;

      setCheckoutSummary({ subtotal, shippingCost: shipping, total });
    } else {
      setCheckoutSummary({ subtotal: 0, shippingCost: 0, total: 0 });
    }
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty. Add some products before placing an order.");
      return;
    }

    // Prepare orderItems for backend (keep quantity & unit from frontend)
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      unit: item.unit,
    }));

    const orderData = {
      orderItems,
      name: formData.name,
      address: formData.address,
      total: checkoutSummary.total,
      paymentMethod: "cash_on_delivery",
      note: formData.note,
      identifier: formData.identifier,
    };

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        toast.success("Order placed successfully!");
        router.push("/product");
        setFormData({ name: "", identifier: "", address: "", note: "" });
        dispatch(clearCart());
      })
      .catch((error) => {
        alert("Failed to place order: " + error);
      });
  };

  const fields = [
    { id: "name", placeholder: "Name" },
    { id: "identifier", placeholder: "Number" },
    { id: "address", placeholder: "Address" },
    { id: "note", placeholder: "Note" },
  ];

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto p-10 bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Order Summary */}
          <div className="order-1 md:order-1">
            <h2 className="text-3xl font-extrabold mb-6 text-teal-700 tracking-wide">
              Order Summary
            </h2>

            <div className="space-y-6">
              {cartLoading ? (
                <p>Loading cart...</p>
              ) : cartError ? (
                <p className="text-red-600">{cartMessage || "Failed to load cart."}</p>
              ) : cart?.items?.length ? (
                cart.items.map((item) => {
                  const product = item.productId;
                  // Price calculation in listing unit
                  const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
                  const listingUnit = match ? match[3] : "Kg";
                  const qtyInListingUnit = convertQuantity(item.quantity, item.unit, listingUnit);
                  const total = (product?.price || 0) * qtyInListingUnit;

                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={product?.images[0]?.path}
                        alt={product?.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <span className="flex-1 mx-6 text-gray-700 font-semibold text-lg">
                        {product?.title} x{item.quantity} {item.unit}
                      </span>
                      <span className="font-semibold text-teal-700 text-lg">
                        ৳{total.toFixed(2)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No products in your cart.</p>
              )}
            </div>

            <div className="mt-10">
              <CartSummary
                subtotal={checkoutSummary.subtotal}
                shippingCost={checkoutSummary.shippingCost}
                showCheckoutBtn={false}
              />
            </div>
          </div>

          {/* Billing Form */}
          <form
            className="space-y-6 order-2 md:order-2 bg-gray-50 p-8 rounded-xl shadow-md"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-3xl font-extrabold mb-6 text-teal-700 tracking-wide">
              Billing Details
            </h2>

            {fields.map((field) => (
              <InputField
                key={field.id}
                name={field.id}
                value={formData[field.id]}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            ))}

            <button
              type="submit"
              disabled={orderLoading}
              className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-teal-700 shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-400 ${orderLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {orderLoading ? "Placing Order..." : "Place Order"}
            </button>

            {orderError && (
              <p className="text-red-600 mt-2 font-medium">{orderMessage}</p>
            )}
          </form>

        </div>
      </div>
    </UserLayout>
  );
}
