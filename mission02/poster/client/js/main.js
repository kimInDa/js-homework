
import { getNode, addClass, getNodes, removeClass, attr, css } from '../lib/dom/index.js'
import { data } from './index.js'



const nav = getNode('.nav');
const list = getNodes('li');
const nickName = getNode('.nickName');
const visualImage = getNode('.visual img');
const body = getNode('body');



function setNameText(dataIndex){
  
  nickName.textContent = dataIndex.name;
  
}


function setBgColor(dataIndex){
  const dataColor= dataIndex.color;
  const value = `linear-gradient(to bottom,${dataColor})`
  css(body,'background',value);
}


function setImage(dataIndex){

  attr(visualImage,'src',`./assets/${dataIndex.name.toLowerCase()}.jpeg`);
  attr(visualImage,'alt',`${dataIndex.alt}`);

}


function handleSlider(e){

  const target = e.target.closest('li');
  if (!target) return;
  
  list.forEach((li)=>{
    removeClass(li,'is-active');
  })
  
  addClass(target,'is-active');


  const index = attr(target,'data-index');
  const dataIndex = data[index - 1];

  setBgColor(dataIndex);
  setNameText(dataIndex);
  setImage(dataIndex);

}


nav.addEventListener('click', handleSlider);







