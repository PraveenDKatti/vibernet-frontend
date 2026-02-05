import { Link } from "react-router-dom";
import { Home, User2, Layers } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-16 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 gap-4">
      <Link
        to="/"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Home size={20} />
      </Link>

       <Link
        to="/subscriptions"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Layers size={20} />
      </Link>

      <Link
        to="/profile"
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <User2 size={20} />
      </Link>

    </aside>
  );
}
