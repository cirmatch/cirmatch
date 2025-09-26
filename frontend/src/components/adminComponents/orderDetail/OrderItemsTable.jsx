// helper for unit conversion
const convertQuantity = (qty, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return qty;
  if (fromUnit === "Kg" && toUnit === "Mt") return qty / 1000;
  if (fromUnit === "Mt" && toUnit === "Kg") return qty * 1000;
  return qty;
};

export default function OrderItemsTable({ items }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Order Items</h2>
      <table className="w-full table-auto border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const product = item.productId;
            const price = product?.price || 0;

            // extract listing unit from product.quantity (e.g. "200 Kg" or "10 Mt")
            const match = product?.quantity?.match(/^(\d+(\.\d+)?)\s*(Kg|Mt)$/i);
            const listingUnit = match ? match[3] : "Kg";

            // convert ordered qty into listing unit for price calculation
            const qtyInListingUnit = convertQuantity(item.quantity, item.unit, listingUnit);

            const subtotal = price * qtyInListingUnit;

            return (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{product?.title || "Unnamed Product"}</td>
                <td className="border px-4 py-2">{item.quantity} {item.unit}</td>
                <td className="border px-4 py-2">৳{price}</td>
                <td className="border px-4 py-2">৳{subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
