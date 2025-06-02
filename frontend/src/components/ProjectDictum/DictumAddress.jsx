export default function DictumAddress({ projectOwner, projectOwnerAcademicDegree, authorizationDate }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }
        

  return (
    <>
        <div id="dictum-address-text" className="flex flex-col justify-between mt-3!">
            <div className="flex justify-between gap-2 items-start mt-3!">
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