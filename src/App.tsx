import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MapSelectPage from "@/pages/MapSelectPage";
import PropertyForm from "@/pages/PropertyForm";
import NotFound from "@/pages/NotFound";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import ReportSummary from "./pages/ReportSummary";

function AppLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MapSelectPage />} />
        <Route path="/report-summary" element={<ReportSummary />} />
        <Route path="/property-form" element={<PropertyForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
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
