import UserLayout from "@/layout/clienLayout/UserLayout"

export function NotFound({ message }) {
  return (
    <UserLayout>
    <div className="text-center mt-24 h-100">
      <h1 className="text-6xl font-bold">404</h1>
      <h1 className="text-2xl mt-4">{message}</h1>
    </div></UserLayout>
  );
}