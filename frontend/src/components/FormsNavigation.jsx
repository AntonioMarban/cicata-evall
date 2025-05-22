import Buttons from './Buttons';
import GeneralData from '../forms/GeneralData';
import Projects from '../forms/Projects';
import Participants from '../forms/Participants';
import Colaboration from '../forms/Collaboration';
import Activities from '../forms/Activities'
import Budget from '../forms/Budget'
import Desglose from '../forms/Desglose'
import EthicalAsp from '../forms/EthicalAsp'
import Considerations from '../forms/Considerations';
import Contributions from '../forms/Contributions';
import ConflictInt from '../forms/ConflictInt';
import Goals from '../forms/Goals';
import React, { useState } from 'react';
import Anexos from '../forms/Anexos';
import Deliverables from '../forms/DeliverablesView';
import "../styles/formsnavigation.css"
const FormsNavigation = () => {
  const [option, setOption] = useState(0);
  const mystyle = {
    backgroundColor: "#5CB7E6",
    padding: "10px",
    borderRadius:"20px",
    width:`${(option*100)/13}%`,
    marginBottom: "20px"
  };
  return (
    <>
      <div style={mystyle}>
        <p className='text-right text-white font-semibold'>{option === 0 ? '\u00A0' : `${Math.round((option * 100) / 13)} %`}</p>
      </div>
      <div style={{marginBottom:"50px"}}>
        {option === 0  &&  <GeneralData  option={option} setOption={setOption}/>}
        {option === 1  &&  <Projects  option={option} setOption={setOption}/>}
        {option === 2  &&  <Participants  option={option} setOption={setOption}/>}
        {option === 3  &&  <Colaboration  option={option} setOption={setOption}/>}
        {option === 4  &&  <Desglose  option={option} setOption={setOption}/>}
        {option === 5  &&  <Goals  option={option} setOption={setOption}/>}
        {option === 6  &&  <EthicalAsp  option={option} setOption={setOption}/>}
        {option === 7  &&  <Considerations  option={option} setOption={setOption}/>}
        {option === 8  &&  <Activities  option={option} setOption={setOption}/>}
        {option === 9  &&  <Deliverables  option={option} setOption={setOption}/>}
        {option === 10  &&  <Contributions  option={option} setOption={setOption}/>}
        {option === 11  &&  <Budget  option={option} setOption={setOption}/>}
        {option === 12  &&  <ConflictInt  option={option} setOption={setOption}/>}
        {option === 13  &&  <Anexos  option={option} setOption={setOption}/>}
      </div>
    </>
  );
};

export default FormsNavigation;
