import Sidebar from "../components/SideBar";
import Dashboard from "../components/Dashboard";

const cards = [
  { title: "Estudio de Eutrofización Posterior al Desazolve del Parque Champayán, Tamaulipas", description: "Dr. Ismael Arturo Garduño Wilches" },
  { title: "Síntesis de Materiales Semiconductores por el Método SILAR con Fines de Aplicación Fotovoltaica", description: "Dr. Uriel Nogal Luis" },
  { title: "Materiales Basados en Grafeno para la Recuperación de Tierras Raras en Residuos Electrónicos", description: "Dr. Oscar Fernando Odio Chacón" },
  { title: "Maceta Generadora de Electricidad con Plantas", description: "Dr. Próspero Acevedo Peña" },
  { title: "Diseño de un Sistema de Energía Renovable con Predicción de Variables Climatológicas", description: "Dr. Paul Mondragón Terán" }
];



export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Dashboard cards={cards} />
    </div>
  );
}
