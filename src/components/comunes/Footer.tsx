import './Footer.css';
import { LuFacebook, LuYoutube, LuInstagram, LuTwitter } from 'react-icons/lu';
import { FaTiktok } from 'react-icons/fa';

export interface FooterProps {
  companyName: string;
  year: number;
}

export const Footer = ({ companyName, year }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>About Klook</h4>
          <a href="#">About us</a>
          <a href="#">Newsroom</a>
          <a href="#">Klook Blog</a>
          <a href="#">Careers</a>
          <a href="#">Sustainability</a>
        </div>

        <div className="footer-column">
          <h4>Partnerships</h4>
          <a href="#">Merchant sign up</a>
          <a href="#">Merchant log in</a>
          <a href="#">Affiliate Partnership</a>
          <a href="#">Influencer Program</a>
          <a href="#">Agent Marketplace</a>
          <a href="#">Klook Partner Hub</a>
          <a href="#">Collaborate with Klook</a>
        </div>

        <div className="footer-column">
          <h4>Terms of use</h4>
          <a href="#">General terms of use</a>
          <a href="#">Privacy policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Bug Bounty Program</a>
          <a href="#">Animal Welfare Policy</a>
        </div>

        <div className="footer-column">
          <h4>Payment channels</h4>
          <div className="payment-channels-grid">
            <div className="payment-icon visa"></div>
            <div className="payment-icon mastercard"></div>
            <div className="payment-icon amex"></div>
            <div className="payment-icon jcb"></div>
            <div className="payment-icon unionpay"></div>
            <div className="payment-icon discover"></div>
            <div className="payment-icon diners"></div>
            <div className="payment-icon apple-pay"></div>
            <div className="payment-icon google-pay"></div>
            <div className="payment-icon paypal"></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} {companyName}. All rights reserved.</p>
        <div className="footer-social-links">
          <a href="#"><LuFacebook size={24} /></a>
          <a href="#"><LuYoutube size={24} /></a>
          <a href="#"><LuInstagram size={24} /></a>
          <a href="#"><LuTwitter size={24} /></a>
          <a href="#"><FaTiktok size={24} /></a>
        </div>
      </div>
    </footer>
  );
};