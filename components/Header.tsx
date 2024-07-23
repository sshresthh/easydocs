// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 border-b border-gray-800">
      <Link href="/" className="text-2xl font-bold gradient-text">
        EasyDocs
      </Link>
    </header>
  );
}
