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
          <main className="app">
            <Navbar />
            <div className="flex flex-row justify-center">{children}</div>
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
