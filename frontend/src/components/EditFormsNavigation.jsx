import Buttons from './Buttons';
import GeneralData from '../EditForms/GeneralData';
import Projects from '../EditForms/Projects';
import Participants from '../EditForms/Participants';
import Colaboration from '../EditForms/Collaboration';
import Activities from '../EditForms/Activities'
import Budget from '../EditForms/Budget'
import Desglose from '../EditForms/Desglose'
import EthicalAsp from '../EditForms/EthicalAsp'
import Considerations from '../EditForms/Considerations';
import Contributions from '../EditForms/Contributions';
import ConflictInt from '../EditForms/ConflictInt';
import Goals from '../EditForms/Goals';
import React, { useState } from 'react';
import Anexos from '../EditForms/Anexos';
import Deliverables from '../EditForms/DeliverablesView';
import "../styles/formsnavigation.css"

const FormsNavigation = () => {
  const [option, setOption] = useState(20);
  const mystyle = {
    backgroundColor: "#5CB7E6",
    padding: "10px",
    borderRadius:"20px",
    width:`${((option-20)*100)/13}%`,
    marginBottom: "20px",
    minWidth: "60px"
  };
  return (
    <>
      <div style={mystyle}>
        <p className='text-right text-white font-semibold'>{`${Math.round(((option-20) * 100) / 13)} %`}</p>
      </div>
    
      <div style={{marginBottom:"50px"}}>
        {option === 20  &&  <GeneralData  option={option} setOption={setOption}/>}
        {option === 21  &&  <Projects  option={option} setOption={setOption}/>}
        {option === 22  &&  <Participants  option={option} setOption={setOption}/>}
        {option === 23  &&  <Colaboration  option={option} setOption={setOption}/>}
        {option === 24  &&  <Desglose  option={option} setOption={setOption}/>}
        {option === 25  &&  <Goals  option={option} setOption={setOption}/>}
        {option === 26  &&  <EthicalAsp  option={option} setOption={setOption}/>}
        {option === 27  &&  <Considerations  option={option} setOption={setOption}/>}
        {option === 28  &&  <Activities  option={option} setOption={setOption}/>}
        {option === 29  &&  <Deliverables  option={option} setOption={setOption}/>}
        {option === 30  &&  <Contributions  option={option} setOption={setOption}/>}
        {option === 31  &&  <Budget  option={option} setOption={setOption}/>}
        {option === 32  &&  <ConflictInt  option={option} setOption={setOption}/>}
        {option === 33  &&  <Anexos  option={option} setOption={setOption}/>}
      </div>
    </>
  );
};

export default FormsNavigation;
