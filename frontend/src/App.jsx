import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import MainContent from "./components/MainContent";
import ExplorePage from "./components/pages/explorePage";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/RightSidebar";
import { AuthProvider } from "./services/authContext";

function App() {
  const Layout = ({ children }) => {
    return (
      <div className="flex">
        <LeftSidebar />
        <div className="ml-64 flex-1">
          {children}
        </div>
        <RightSidebar />
      </div>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/explore" element={<Layout><ExplorePage /></Layout>} />
          {/* Add routes for other menu items */}
          <Route path="/search" element={<Layout><ExplorePage /></Layout>} />
          <Route path="/store" element={<Layout><MainContent /></Layout>} />
          <Route path="/notifications" element={<Layout><MainContent /></Layout>} />
          <Route path="/create" element={<Layout><MainContent /></Layout>} />
          <Route path="/profile" element={<Layout><MainContent /></Layout>} />
          <Route path="/more" element={<Layout><MainContent /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;