import Sidebar from "../components/SideBar";
import NDAForm from "../components/NDAForm";


export default function NDA() {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <NDAForm />
    </div>
  );
}
