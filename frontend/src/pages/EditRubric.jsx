import Rubric from "../components/Rubric";

const EditRubric = () => {
    return (
        <>
            <div id="rubricContainer" className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
                <h1 className="text-4xl font-semibold">Rúbrica</h1>
                <p className="text-xl text-gray-600" style={{ padding: "20px 0" }}>Esta es la rúbrica visible para todos los integrantes de tu comité</p>

                <Rubric />


                <div id="actionButtons" className="flex flex-wrap justify-end">
                    <button
                        className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                        style={{ padding: '15px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
                    >
                        Cargar nueva rúbrica
                    </button>
                </div>

            </div>
        </>
    )
}

export default EditRubric;