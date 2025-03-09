import React from "react";
import ToggleButton from "@/components/Button/ToggleButton";
import Navigation from "@/components/Navigation";
import PropertyDashboard from "@/components/PropertyDashboard";
import InjectedScript from "@/components/InjectedScript";

export default function Home() {
  return (
    <React.Fragment>
      {/* Header */}
      <header className="card-shadow bg-white dark:bg-[#fff3] backdrop-blur-md bg-opacity-5">
        <div className="container mx-auto">
          <div className="mb-6 flex justify-between header-section px-6 py-3">
            <div></div>
            <div>
              {/* section navigations */}
              <Navigation/>
            </div>
            <div className="">
              {/* Theme toggler */}
              <ToggleButton />
            </div>
          </div>
        </div>
        {/* gradient background */}
        <div className="section-background">
          <div className="background-gradient">
            <div className="gradient-line" />
          </div>
        </div>
      </header>
      <main className="container mx-auto">
        {/* property dashboard */}
        <PropertyDashboard />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-4">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
        >
          All right reserved 2024
        </a>
      </footer>
      <InjectedScript/>
    </React.Fragment>
  );
}
