import "../styles/viewcompleteforms.css"
import logoCICATA from "../assets/logoCICATA.png"
import LOGOIPN from "../assets/logoIPN.png"
import formatValue from '../hooks/formatValue'
const NDAHeader = ({generalData}) => {  
    return (
    <>
    <main className="background-header">
        <div className="background-images">
            <img src={LOGOIPN}></img>
            <img src={logoCICATA}></img>
        </div>
        <div className="background-table-header">
            <div className="row-header">
                <div>
                    <p>ANEXO Carta de confidencialidad</p>
                </div>
                <div className="folio-version">
                    <p className="folio-version-first">Folio: {/*generalData.formVersion ?? */"CuM-SICIT-F-003"}</p>
                    <p className="folio-version-second">Versión: {/*generalData.formVersion || */"02"}</p>
                </div>
                <div>
                    <p>Próxima revisión: {/*generalData.nextReview || */"enero 2026"}</p>
                </div>
            </div>
            
            <div className="row-header">
                <div>
                    <p>Elaboró: {/*generalData.preparedBy || */"Leslie Olmedo Nieva"}</p>
                </div>
                <div>
                    <p>Revisó: {/*generalData.reviewedBy || */"Leslie Olmedo Nieva"}</p>
                </div>
                <div>
                    <p>Aprobó: {/*generalData.approvedBy || */"Paul Mondragón Terán"}</p>
                </div>
            </div>
            
            <div className="row-header">
                <div>
                    <p>Fecha de elaboración: {/*formatValue(generalData.preparedDate) ||*/ "20/01/2025"}</p>
                </div>
                <div>
                    <p>Fecha de revisión: {/*formatValue(generalData.reviewedDate) || */"20/01/2025"}</p>
                </div>
                <div>
                    <p>Fecha de aprobación: {/*formatValue(generalData.approvedDate) || */"22/01/2025"}</p>
                </div>           
            </div>
        </div>
    </main>
    </>
  );
};

export default NDAHeader;
