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
    <html lang="en">

      <body>
        <Provider>
          <div className="main"></div>
          <main className="app">
            <Navbar />
            {children}
            <SignInModalComponent />
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
