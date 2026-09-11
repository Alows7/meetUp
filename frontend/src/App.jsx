import Nav from "./components/Navbar";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 md:gap-4 md:p-4">
      <Nav />
      <div className="flex-1">
        <Header />
        <main className="p-4 pb-20 ">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}