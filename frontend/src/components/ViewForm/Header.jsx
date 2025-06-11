import "../../styles/viewcompleteforms.css"
import logoCICATA from "../../assets/logoCICATA.png"
import LOGOIPN from "../../assets/LogoIPN.png"
import formatValue from '../../hooks/formatValue'
const Header = ({generalData}) => {  
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
                    <p>Solicitud para el registro y Evaluación de proyectos de investigación</p>
                </div>
                <div className="folio-version">
                    <p className="folio-version-first">Folio: {generalData.formVersion}</p>
                    <p className="folio-version-second">Versión: {generalData.formVersion}</p>
                </div>
                <div>
                    <p>Próxima revisión: {generalData.nextReview}</p>
                </div>
            </div>
            
            <div className="row-header">
                <div>
                    <p>Elaboró: {generalData.preparedBy}</p>
                </div>
                <div>
                    <p>Revisó: {generalData.reviewedBy}</p>
                </div>
                <div>
                    <p>Aprobó: {generalData.approvedBy}</p>
                </div>
            </div>
            
            <div className="row-header">
                <div>
                    <p>Fecha de elaboración: {formatValue(generalData.preparedDate)}</p>
                </div>
                <div>
                    <p>Fecha de revisión: {formatValue(generalData.reviewedDate)}</p>
                </div>
                <div>
                    <p>Fecha de aprobación: {formatValue(generalData.approvedDate)}</p>
                </div>           
            </div>
        </div>
        <p className="text-soli">
            SOLICITUD PARA EL REGISTRO Y EVALUACIÓN DE PROYECTOS DE INVESTIGACIÓN
            CENTRO DE INVESTIGACIÓN EN CIENCIA APLICADA Y TECNOLOGÍA AVANZADA
            (CICATA) UNIDAD MORELOS DEL INSTITUTO POLITÉCNICO NACIONAL (IPN)
        </p>
    </main>
    </>
  );
};

export default Header;
