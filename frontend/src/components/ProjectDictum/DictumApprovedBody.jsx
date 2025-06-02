export default function DictumApprovedBody({ projectTitle, projectFolio }) {

  return (
    <>
      <div id="dictum-body" className="flex flex-col justify-between mt-10!">
        <p className="text-justify">
          Por este medio le informo que su propuesta de proyecto de investigación titulado:
          <span className="font-bold"> "{projectTitle}”</span>,
          con folio de registro
          <span className="font-bold"> {projectFolio}</span>,
          de la Subdirección de Investigación Científica e Innovación Tecnológica (SICIT) del Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA) Unidad Morelos,
          ha sido evaluada por el Comité Interno de Proyectos (CIP), el Comité de Ética en Investigación (CEI), el Comité de Investigación (CI) y el Comité de Bioseguridad (CB),
          todos ellos pertenecientes a este Centro de Investigación y, como resultado de dichas revisiones, le comunicamos que la propuesta en comento ha obtenido el carácter de:
        </p>

        <p className="text-center font-bold mt-5!">
            Aprobado
        </p>

        <p className="text-justify mt-5! font-bold">
          Lo anterior con base en los requerimientos y estándares de evaluación establecidos por todos los Comités citados previamente.
        </p>

        <p className="text-justify mt-5!">
          No omito mencionar que, a partir de este momento,
          <span className="font-bold"> será responsabilidad del investigador principal </span>
          llevar a cabo la investigación de acuerdo con lo aprobado para el desarrollo de este, así como el
          <span className="font-bold"> dar cumplimiento a lo estipulado la normativa aplicable.</span>
        </p>

        <p className="text-justify mt-5!">
          Asimismo, deberá demostrar los avances del presente proyecto, como de los entregables relacionados con éste,
          <span className="font-bold"> a través de los instrumentos designados en el CICATA Unidad Morelos </span>
          para el seguimiento de avances y deberá 
          <span className="font-bold"> renovar de forma anual </span>
          la autorización del presente proyecto según corresponda,
          así como notificar oportunamente cualquier cambio a las metodologías, participantes, etc.
          que comprometa considerablemente su desarrollo. En el caso de los proyectos donde se utilicen cartas
          de consentimiento informado, deberá entregar copia
          <span className="font-bold"> de todas las cartas firmadas por los pacientes </span>
          que participen, en donde se pueda observar el folio de registro de este proyecto.
          <span className="font-bold"> Es responsabilidad del investigador principal notificar formalmente sobre cualquier efecto adverso </span>
          ocurrido en pacientes o en modelos animales, así como el avisar
          <span className="font-bold"> a la Secretaría de Salud y a Comisión Federal para la Protección contra Riesgos Sanitarios (COFEPRIS), 
            así como a las autoridades pertinentes. </span>
        </p>
      </div>
    </>
  );
}