export default function DictumSecondPage({ authorizerName, authorizerPositionWork, authorizerInstitution }) {

  return (
    <>
      <div id="dictum-second-page" className="flex flex-col justify-between mt-5! mb-10!">
        <p className="text-justify">
          Las autoridades del Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada Unidad Morelos están comprometidas
          con impulsar la investigación bajo los más estrictos estándares científicos y éticos contemplados en la legislación
          mexicana vigente y en los tratados internacionales aplicables, por lo que agradecemos el esfuerzo realizado y
          celebramos el cumplimiento de su investigación.
        </p>

        <div className="text-start font-bold mt-5! farewell-text">
          <p className="mb-2!">
            Atentamente
          </p>

          <p>{authorizerName}</p>
          <p>{authorizerPositionWork}</p>
          <p>{authorizerInstitution}</p>
        </div>

        

      </div>
    </>
  );
}