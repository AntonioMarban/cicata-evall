import "../../styles/viewcompleteforms.css"
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
const Desglose = ({desglose, goals, methodologies, references}) => {  
    const editor = new Editor({
    editable: false,
    extensions: [
      StarterKit,
    ],
    content: references,
    
  })

    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Introducción</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.introduction}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Antecedentes</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.background}</td>
                </tr>
            </tbody>
        </table>


        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Planteamiento del problema</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.statementOfProblem}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Justificación</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.justification}</td>
                </tr>
            </tbody>
        </table>


        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Hipótesis</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.hypothesis}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Objetivo general</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.generalObjective}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Objetivos Específicos</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Nombre del objetivo</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {Array.isArray(desglose.specificObjectives) && desglose.specificObjectives.map((sObjective, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{sObjective.objectiveName}</td>
                    </tr>
                    ))}
                </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Metas</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Metas del proyecto</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {Array.isArray(goals) && goals.map((goal, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{goal.goal}</td>
                        </tr>
                    ))}
                </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Metodologías</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Metodología </th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {Array.isArray(methodologies) && methodologies.map((methodology, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{methodology.methodology}</td>
                        </tr>
                    ))}
                </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Referencias</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>
                        <EditorContent editor={editor}/>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default Desglose;
