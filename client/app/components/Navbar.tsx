import { Link } from "@remix-run/react";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          캠핑장 예약 시스템
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            홈
          </Link>
        </div>
      </div>
    </nav>
  );
}