import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Results from './pages/Results';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import UpdatePassword from './pages/admin/UpdatePassword';
import { AdminProvider } from './context/AdminContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

function App() {
  return (
    <AdminProvider>
      <SiteSettingsProvider>
        <Router>
          <div className="min-h-screen bg-ui-background text-ui-text-primary">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/news" element={<News />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/results" element={<Results />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/update-password" element={<UpdatePassword />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SiteSettingsProvider>
    </AdminProvider>
  );
}

export default App;
