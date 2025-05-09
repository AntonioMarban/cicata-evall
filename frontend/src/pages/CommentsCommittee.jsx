import "../styles/commentscommittee.css"
const  CommentsCommittee = () => {
    const handleOnClick = () => {
        alert("Esperando backend")
    }
    return (
    <div className="background-comments">
        <div className="project-header">
            <div className="project-info">
            <h1 className="project-title"></h1>
            <div className="info-grid">
                <div className="info-item">
                <p className="label">Fecha inicio</p>
                <p></p>
                </div>
                <div className="info-item">
                <p className="label">Fecha fin</p>
                <p></p>
                </div>
                <div className="info-item">
                <p className="label">Folio</p>
                <p></p>
                </div>
                <div className="info-item">
                <p className="label">Status</p>
                <p></p>
                </div>
            </div>
            </div>
            <button className="info-button">Información</button>
        </div>
        <div>
            <p>Comentarios</p>
            <div>

            </div>
        </div>
        <div className="footer-comments">
            <button onClick={handleOnClick} className="info-button">Realizar correciones</button>
        </div>
    </div>
    )
}

export default CommentsCommittee;