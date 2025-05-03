import React from 'react';
import './App.css';
import './AppResponsive.css';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import Instagram from './pages/Instagram';
import Tiktok from './pages/Tiktok';
import Youtube from './pages/Youtube';
import Pinterest from './pages/Pinterest';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/contact/ContactUs';
import FAQ from './components/FAQ';
import PageInfo from './components/PageInfo';

function App() {
  const location = useLocation();

  const hideComponents = ['/terms', '/privacy-policy', '/contact-us'].includes(location.pathname);

  return (
      <div className="container">
        <div className="header">
            <Link to="/" className="logo" translate='no'>AudioLand</Link>
        </div>
        
        <nav translate='no'>
          <Link to="/" style={{ backgroundColor: '#c50000', color: 'white'}}>Youtube<p>MP3</p></Link>
          <Link to="/instagram" style={{background: 'linear-gradient(45deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)', color: 'white'}}>Instagram<p>MP3</p></Link>
          <Link to="/tiktok" style={{background: 'linear-gradient(45deg, #25f4ee, #010057, #fe2c55)', color: 'white'}}>TikTok<p>MP3</p></Link>
          <Link to="/pinterest" style={{ backgroundColor: '#d50000', color: 'white'}}>Pinterest<p>MP3</p></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Youtube />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/tiktok" element={<Tiktok />} />
          <Route path="/pinterest" element={<Pinterest />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>

        {!hideComponents && (
          <>
            <PageInfo />
            <FAQ />
          </>
        )}

        <footer>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/contact-us">Contact Us</Link>
          <p>&copy; 2025 Audioland. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default App;
