import ProjectStatus from "../components/ProjectStatus";

export default function Project() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        <ProjectStatus />
      </main>
    </div>
  );
}
