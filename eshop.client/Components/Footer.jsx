function Footer() {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-grid">

                    {/* column 1 - about us*/}
                    <div className="footer-column">
                        <h3 className="footer-title">About Us</h3>
                        <p className="footer-text">
                            We offer the best fashion for men and women. Quality clothing at great prices.
                        </p>
                    </div>

                    {/* column 2 - shopping */}
                    <div className="footer-column">
                        <h3 className="footer-title">Shopping</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="link">Men's fashion</a></li>
                            <li><a href="#" className="link">Women's fashion</a></li>
                            <li><a href="#" className="link">New arrivals</a></li>
                            <li><a href="#" className="link">On sale</a></li>
                        </ul>
                    </div>

                    {/* column 3 - help */}
                    <div className="footer-column">
                        <h3 className="footer-title">Help</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="link">FAQ</a></li>
                            <li><a href="#" className="link">Returns</a></li>
                            <li><a href="#" className="link">Shipping</a></li>
                            <li><a href="#" className="link">Size guide</a></li>
                        </ul>
                    </div>

                    {/* column 4 - contacts*/}
                    <div className="footer-column">
                        <h3 className="footer-title">Contact</h3>
                        <ul className="footer-links">
                            <li>info@shop.co</li>
                            <li>+420 123 456 789</li>
                            <li>Fashion Street 123, Prague</li>
                        </ul>
                    </div>
                </div>

                {/* copyright */}
                <div className="footer-bottom">
                    <p>2024 SHOP.CO. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="#" className="link">Facebook</a>
                        <a href="#" className="link">Instagram</a>
                        <a href="#" className="link">Twitter</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;