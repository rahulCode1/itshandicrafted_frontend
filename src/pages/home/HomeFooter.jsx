import styles from "./HomeFooter.module.css";
import { Link } from "react-router-dom";


const HomeFooter = () => {
  return (
    <footer className={styles.ft}>
      {/* Brand row */}
      <div className={styles.ftBrand}>
        <div>
          <p className={styles.ftLogo}>It's handicrafted</p>
          <p className={styles.ftTagline}>
            Handcrafted stone products made by master artisans in Rajasthan,
            India. Every piece tells a story of earth, skill, and heritage.
          </p>
        </div>
        <div className={styles.ftTrust}>
          <span className={styles.ftTrustPill}>Est. 2018</span>
          <span className={styles.ftTrustPill}>Made in Rajasthan</span>
          <span className={styles.ftTrustPill}>Secure checkout</span>
        </div>
      </div>

      {/* 4-column grid */}
      <div className={styles.ftGrid}>
        {/* How it works */}
        <div>
          <p className={styles.ftColTitle}>How it works</p>
          <ul className={styles.ftList}>
            <li>
              <strong>Order placed</strong> — confirmed within 2 hours via SMS &
              email
            </li>
            <li>
              <strong>Packed carefully</strong> — bubble-wrapped & boxed within
              24 hrs
            </li>
            <li>
              <strong>Dispatched</strong> — tracking link sent same or next
              business day
            </li>
            <li>
              <strong>Delivered</strong> — 4–7 days pan-India, 10–18 days
              international
            </li>
          </ul>
        </div>

        {/* Customer care */}
        <div>
          <p className={styles.ftColTitle}>Customer care</p>
          <ul className={styles.ftList}>
            <li>WhatsApp & email support — reply within 4 business hours</li>
            <li>Support hours — Mon to Sat, 9 am to 7 pm IST</li>
            <li>Personalised gifting & bulk order enquiries welcome</li>
            <li>Exchange or store credit offered on eligible orders</li>
          </ul>
        </div>

        {/* Payment */}
        <div>
          <p className={styles.ftColTitle}>Payment</p>
          <div className={styles.ftPay}>
            <div>
              <p className={styles.ftPayLabel}>Online</p>
              <div className={styles.ftPayRow}>
                <span className={styles.ftPayChip}>UPI</span>
                <span className={styles.ftPayChip}>Cards</span>
                <span className={styles.ftPayChip}>Net banking</span>
              </div>
            </div>
            <div>
              <p className={styles.ftPayLabel}>Cash on delivery</p>
              <div className={styles.ftPayRow}>
                <span className={styles.ftPayChip}>COD available</span>
              </div>
              <p className={styles.ftPayNote}>
                COD orders above ₹500 only. ₹50 handling fee applies for COD.
              </p>
            </div>
            <p className={styles.ftPayNote}>
              All transactions 256-bit SSL encrypted. We never store card
              details.
            </p>
          </div>
        </div>

        {/* Policies */}
        <div>
          <p className={styles.ftColTitle}>Policies</p>
          <div className={styles.ftPolicy}>
            <details className={styles.ftPolicyItem}>
              <summary>Returns & exchanges</summary>
              <p className={styles.ftPolicyBody}>
                Returns accepted within <strong>7 days</strong> of delivery for
                damaged or defective items — we bear the return shipping cost.
                For change-of-mind returns with no damage, a{" "}
                <strong>₹80–₹150 reverse delivery charge</strong> applies. Item
                must be unused and in original packaging.
              </p>
            </details>
            <details className={styles.ftPolicyItem}>
              <summary>Refund policy</summary>
              <p className={styles.ftPolicyBody}>
                Approved refunds processed within{" "}
                <strong>5–7 business days</strong> to original payment method.
                COD refunds as store credit or bank transfer within 7 days.
                Shipping charges non-refundable unless error is ours.
              </p>
            </details>
            <details className={styles.ftPolicyItem}>
              <summary>Privacy & data</summary>
              <p className={styles.ftPolicyBody}>
                We collect only what's needed to process your order. Your data
                is never sold. We use industry-standard encryption and comply
                with Indian data protection laws.
              </p>
            </details>
            <details className={styles.ftPolicyItem}>
              <summary>Cancellation</summary>
              <p className={styles.ftPolicyBody}>
                Orders cancelled within <strong>12 hours</strong> at no charge.
                After dispatch, cancellation is not possible — returns process
                applies. Custom orders cannot be cancelled once production
                begins.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.ftBottom}>
        <p className={styles.ftCopy}>
          &copy; 2025 <span>It's handicrafted</span>. All rights reserved.
          Handmade in Rajasthan, India.
        </p>

        <div className={styles.ftLinks}>
          <Link to="terms">Terms of service</Link>
          <Link to="privacy">Privacy policy</Link>
          <Link to="shipping">Shipping policy</Link>
          <Link to="contact">Contact us</Link>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
