import "../styles/projectheader.css"

const userType = localStorage.getItem("userType");

export default function ProjectHeader({ title, startDate, endDate, folio, status }) {
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-MX");
    };

    return (
        <div className="project-header">
            <div className="project-info">
                <h1 className="project-title">{title || "Sin título"}</h1>
                <div className="info-grid">
                <div className="info-item">
                    <p className="label">Fecha inicio</p>
                    <p>{formatDate(startDate)}</p>
                </div>
                <div className="info-item">
                    <p className="label">Fecha fin</p>
                    <p>{formatDate(endDate)}</p>
                </div>
                <div className="info-item">
                    <p className="label">Folio</p>
                    <p>{folio || "-"}</p>
                </div>
                <div className="info-item">
                    <p className="label">Status</p>
                    <p>{status || "-"}</p>
                </div>
                </div>
            </div>
            <div id="project-buttons" className ="flex md:flex-row gap-3">
                <button className="info-button">Información</button>
                {userType === "4" && (
                    <button className="info-button">Evaluar</button>
                )}
            </div>
            
        </div>
    )
}