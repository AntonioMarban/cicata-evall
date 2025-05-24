import FormsNavigation from "../components/EditFormsNavigation";
const  CreateProject = () => {
    return (
    <main className="!p-5 flex flex-wrap">
        <div className="w-full h-[90%] mt-8 flex flex-col justify-between">
            <div className="h-[15%] w-full flex flex-col">
                <div>
                    <p className="text-[25px]">Editar de proyecto</p>
                </div>
            </div>
            <div className="w-full">
                    <FormsNavigation/>
            </div>
        </div>
    </main>
    )
}

export default CreateProject;