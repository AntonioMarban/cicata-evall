import Sidebar from "../components/SideBar";
import Dashboard from "../components/Dashboard";

const cards = [
  { title: "Project A", description: "Description of Project A." },
  { title: "Project B", description: "Description of Project B." },
  { title: "Project C", description: "Description of Project C." },
];


export default function HomePage() {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <Dashboard cards={cards} />
    </div>
  );
}
