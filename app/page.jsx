import WelcomeComponent from "@/components/WelcomeComponent";
import React from "react";


const metadata = {
  title: "Iron Delirium",
  description: "Iron Delirium, the Workout Tracker for the Heavy Iron Addict",
};

const Home = () => {
  return (
    <div className="adjust-center">
      <WelcomeComponent />
    </div >
  );
};

export default Home;
