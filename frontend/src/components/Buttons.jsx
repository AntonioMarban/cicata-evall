import React from 'react';
const Buttons =({option,setOption}) => { 
  
  const options = [
    "Datos Generales", "Proyectos", "Participantes", "Colaboracion", 
    "Desglose",'Metas' ,"Aspectos éticos", "Consideraciones", "Cronograma", 
    "Entregables", "Aportaciones", "Presupuesto", "Conflicto de Interes", "Anexos"
  ];
  
  return (
    <div className="hidden md:flex p-0 flex p-0 !mb-2"> 
      <div  className="w-full bg-white rounded-[10px] mb-5 p-2 flex justify-between items-center text-[14px]">
      {options.map((label, index) => (
      <button 
        key={index}
        className={`border-none cursor-pointer rounded-[10px] h-[30px] flex justify-center items-center no-underline px-4
          ${option === index 
            ? "bg-[rgba(82,190,218,0.3)] text-[#0053B1]" 
            : "bg-white text-black hover:bg-[rgba(82,190,218,0.1)] hover:text-[#0053B1]"
          }`
        }
        onClick={() => setOption(index+20)} //cambiar aqui
      >
        {label}
      </button>
    ))}
      </div>
    </div>   
  )
}

export default Buttons;
