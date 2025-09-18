export default function CustomerInfo({ user, address }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone:</strong> {user?.number}</p>
      <p><strong>Address:</strong> {address}</p>
    </section>
  );
}
