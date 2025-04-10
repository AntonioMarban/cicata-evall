import { Home, Folder } from "lucide-react";
import CICATA from "../assets/cicatam.png";

function Button({ children, className, ...props }) {
  return (
    <button className={`w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded ${className}`} {...props}>
      {children}
    </button>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col items-center border-r border-gray-300 h-full justify-between">
      <div> 
        <img src={CICATA} alt="Logo" className="w-auto h-auto max-h-32" />
      </div>
      <nav className="flex flex-col gap-4 w-full items-center">
        <Button className="flex gap-2 justify-center">
          <Home /> Home
        </Button>
        <Button className="flex gap-2 justify-center">
          <Folder /> Projects
        </Button>
      </nav>
      <div />
    </aside>
  );
}

export default Sidebar;
