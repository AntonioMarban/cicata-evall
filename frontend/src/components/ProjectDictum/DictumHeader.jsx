export default function DictumHeader({ folio, projectId, projectOwner, projectOwnerAcademicDegree, authorizationDate }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }
        

  return (
    <>
        <div
            id="dictum-header-images"
            className="flex flex-row items-center justify-between h-auto w-full gap-10"
        >
            <img
                src="src/assets/dictums/logo-educacion-ipn.png" 
                alt="Logotipo Educación | Instituto Politécnico Nacional"
                className="max-w-[60%] h-auto object-contain"
            />
            <img
                src="src/assets/dictums/imagen-mujer-b&n.png"
                alt="Dictum Header 2"
                className="max-w-[20%] h-auto object-contain"
            />
        </div>
        <div id="dictum-header-text" className="flex flex-col justify-between mt-5!">
            <div className="flex justify-between gap-2 items-end">
                <div className="flex flex-col items-start w-[45%]">
                    <p className="font-bold">Folio</p>
                    <p>{folio} ASDASD</p>
                </div>
                <div className="flex flex-col items-end justify-end font-bold w-[45%] text-right text-sm gap-2">
                    <p>Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada Unidad Morelos</p>
                    <p>Subdirección de Investigación Científica e Innovación Tecnológica</p>
                </div>
            </div>

            <div className="flex justify-between gap-2 items-start mt-5!">
                <div className="flex flex-col items-start w-[45%]">
                    <p className="font-bold">Asunto</p>
                    <p>Dictamen global de proyecto {projectId}</p>
                </div>
                <div className="flex flex-col items-end justify-end font-bold w-[47%] text-right text-[0.56rem]">
                    <p>90 Años de la Creación del Consejo Técnico de la Escuela Politécnica Nacional</p>
                    <p>90 Aniversario del CECyT 9 "Juan de Dios Bátiz"</p>
                    <p>50 Aniversario del CICS Unidad Milpa Alta</p>
                    <p>25 Aniversario del CICS, Unidad Santo Tomás y del CICATA, Unidad Altamira</p>
                    <p>20 Aniversario de la Defensoría de los Derechos Politécnicos</p>
                </div>
            </div>

            <div className="flex justify-between gap-2 items-start mt-5!">
                <div className="flex flex-col items-start font-bold w-[45%]">
                    <p>{projectOwner}, {projectOwnerAcademicDegree}</p>
                    <p>Investigador(a) Titular</p>
                    <p>CICATA Unidad Morelos</p>
                    <p>PRESENTE</p>
                </div>
                <div className="flex flex-col items-end justify-end w-[45%] text-right">
                    <p>Xochitepec, Morelos a, {formatDate(authorizationDate)}</p>
                </div>
            </div>
        </div>
    </>
  );
}