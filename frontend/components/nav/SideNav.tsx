import Link from "next/link";
import { SideNavProps } from "@/types/nav";

// Component for sidebar navigation
const SideNav: React.FC<SideNavProps> = ({ links, className }) => (
  <nav
    className={`fixed left-0 top-0 h-screen w-64 bg-white/5 border-r flex flex-col space-y-4 p-6 ${className}`}
  >
    {links.map((link) => (
      <Link href={link.href} passHref key={link.label}>
        <button
          type="button"
          className="w-full text-left hover:bg-gray-200 rounded py-2 px-4 transition-colors bg-gray-500 text-gray-800"
          aria-label={link.label}
        >
          {link.label}
        </button>
      </Link>
    ))}
  </nav>
);

export default SideNav;
