import ToggleButton from "@/components/Button/ToggleButton";
import PropertyDashboard from "@/components/PropertyDashboard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* Header */}
      <header className="card-shadow sticky top-0 bg-white dark:bg-black backdrop-blur-md bg-opacity-5">
        <div className="container mx-auto">
          <div className="mb-6 flex justify-between header-section p-6">
            <div></div>
            <div>
              <nav className='flex gap-3'>
                <Link className="rounded-full bg-white dark:bg-green-900 border border-gray-200 dark:border-green-800 px-4 py-1" href={"#filter"}>
                  Filter
                </Link>
                <Link className="rounded-full bg-white dark:bg-green-900 border border-gray-200 dark:border-green-800 px-4 py-1" href={"#properties"}>
                  Properties
                </Link>
              </nav>
            </div>
            <div className="rounded-full bg-white dark:bg-green-900 border border-gray-200 dark:border-green-800 px-4 py-1">
              {/* Theme toggler */}
              <ToggleButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto">
        <PropertyDashboard />
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center pb-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
        >
          All right reserved 2024
        </a>
      </footer>
    </div>
  );
}
