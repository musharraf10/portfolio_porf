import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { DesktopDisclaimer } from "./components/layout/DesktopDisclaimer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Navbar />
        <DesktopDisclaimer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
