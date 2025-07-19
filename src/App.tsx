import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MapSelectPage from "@/pages/MapSelectPage";
import PropertyForm from "@/pages/PropertyForm";
import NotFound from "@/pages/NotFound";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import ReportSummary from "./pages/ReportSummary";
import About from "./components/About";
import Header from "./components/Header";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MapSelectPage />} />
          <Route path="/report-summary" element={<ReportSummary />} />
          <Route path="/property-form" element={<PropertyForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
