import { Link } from "react-router-dom";
import { Home, User2, Layers } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-18 flex flex-col items-center py-4 gap-2">
      <Link
        to="/"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Home size={22} />
      </Link>

       <Link
        to="/subscription"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Layers size={22} />
      </Link>

      <Link
        to="/profile"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <User2 size={22} />
      </Link>

    </aside>
  );
}
