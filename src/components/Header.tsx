import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

export default function Header() {
  return (
    <header className="flex items-center gap-3 px-6 py-4 border-b">
      <img
        src={logo}
        alt="HatSynk Logo"
        className="h-8 w-8"
      />
      <Link to="/" className="text-xl font-semibold">
        HatSynk
      </Link>
    </header>
  );
}
