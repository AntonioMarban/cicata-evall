import NDAForm from "../components/NDAForm";

export default function NDA() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        <NDAForm />
      </main>
    </div>
  );
}
