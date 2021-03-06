import { ThemeProvider } from "next-themes";
import Script from "next/script";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NFTProvider } from "../context/NFTContext";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      {/* to access font awsm  */}
      <Script
        src="https://kit.fontawesome.com/804575f986.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  </NFTProvider>
);

export default MyApp;
