import PropertyDashboard from "@/components/PropertyDashboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 p-6 font-[family-name:var(--font-geist-sans)]">
      <PropertyDashboard/>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          All right reserved 2024
        </a>
      </footer>
    </div>
  );
}
