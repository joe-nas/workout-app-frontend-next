import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/context/Provider";
import SignInModalComponent from "@/components/SignInModalComponent";
import { getSession } from "next-auth/react";
import "@/styles/globals.css";

export const metadata = {
  title: "Iron Delirium",
  description: "Iron Delirium, the Workout Tracker for the Heavy Iron Addict",
};

const RootLayout = ({ children }) => {
  return (
    // <html className="h-72 bg-gradient-radial bg-gradient-to-r from-black via-slate-95000 to-gray-800" lang="en">
    <html className="h-72" lang="en">

      <body style={{ backgroundImage: `url('bg7.webp')`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center", minHeight: "100vh" }}>
        <Provider>
          <main className="app">
            <Navbar />
            <div className="flex flex-row justify-center min-h-screen">
              {children}
            </div>
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;