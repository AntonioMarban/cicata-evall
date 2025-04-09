import Botones from './Buttons';
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

import React, { useState } from 'react';
import Anexos from '../forms/Anexos';
import Deliverables from '../forms/Deliverables';
const FormsNavigation = () => {
  const [option, setOption] = useState(0);

  return (
    <>
      <Botones option={option} setOption={setOption}/>
      <div>
        {option === 0  &&  <GeneralData  option={option} setOption={setOption}/>}
        {option === 1  &&  <Projects  option={option} setOption={setOption}/>}
        {option === 2  &&  <Participants  option={option} setOption={setOption}/>}
        {option === 3  &&  <Colaboration  option={option} setOption={setOption}/>}
        {option === 4  &&  <Desglose  option={option} setOption={setOption}/>}
        {option === 5  &&  <EthicalAsp  option={option} setOption={setOption}/>}
        {option === 6  &&  <Considerations  option={option} setOption={setOption}/>}
        {option === 7  &&  <Activities  option={option} setOption={setOption}/>}
        {option === 8  &&  <Deliverables  option={option} setOption={setOption}/>}
        {option === 9  &&  <Contributions  option={option} setOption={setOption}/>}
        {option === 10  &&  <Budget  option={option} setOption={setOption}/>}
        {option === 11  &&  <ConflictInt  option={option} setOption={setOption}/>}
        {option === 12  &&  <Anexos  option={option} setOption={setOption}/>}
      </div>
    </>
  );
};

export default FormsNavigation;
