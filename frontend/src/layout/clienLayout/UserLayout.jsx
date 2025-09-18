import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar stays at top */}

      <main className="flex-grow">
        {children} {/* Main content expands */}
      </main>

      <Footer /> {/* Footer stays at bottom */}
    </div>
  );
}
