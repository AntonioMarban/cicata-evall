export default function DictumNotApprovedBody({ projectTitle, projectFolio }) {

  return (
    <>
      <div id="dictum-body" className="flex flex-col justify-between mt-7!">
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
            NO APROBADA
        </p>

        <p className="text-justify mt-5!">
          <span className="font-bold">
            Lo anterior con base en los requerimientos y estándares de evaluación establecidos por todos los Comités citados previamente. </span>
          No omito mencionar que, a partir de este momento,
          <span className="font-bold"> será responsabilidad del investigador principal </span>
          atender las observaciones, comentarios y sugerencias emanadas por cada uno de los Comités previamente citados a fin de someter nuevamente,
          y por única ocasión, su propuesta de proyecto de investigación en caso de que lo considere pertinente, misma que deberá estar en estricto apego
          <span className="font-bold"> a lo estipulado en la normativa aplicable.</span>
        </p>

      </div>
    </>
  );
}