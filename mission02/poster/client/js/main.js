import {
  getNode,
  addClass,
  getNodes,
  removeClass,
  attr,
  css,
} from '../lib/dom/index.js';
import { data } from './index.js';
import { AudioPlayer } from './audio.js';



const nav = getNode('.nav');
const list = getNodes('li');
const body = getNode('body');
const nickName = getNode('.nickName');
const visualImage = getNode('.visual img');



function getIndex(node){

  return attr(node,'data-index');

}

function getIndexData(node){

  return data[getIndex(node) - 1];

}


function setBgColor(node,indexData) {

  const dataColor = indexData.color;
  const value = `linear-gradient(to bottom,${dataColor})`;

  css(node, 'background', value);

}


function setNickName(node,indexData) {


  node.textContent = indexData.name;

}


function setImage(node,indexData) {


  attr(node, 'src', `./assets/${indexData.name.toLowerCase()}.jpeg`);
  attr(node, 'alt', `${indexData.alt}`);

}


function setAudio(indexData){
  const source = `./assets/audio/${indexData.name}.m4a`;
  const audio = new AudioPlayer(source);
  return audio;
};


const playAudio = (()=>{

  let voice;

  return function a(indexData){
    if(!voice){
      voice = setAudio(indexData);
      voice.play();
    } else{
      voice.stop();
      voice = setAudio(indexData);
      voice.play();
    }
  }
})();


function handleSlider(e) {

  let target = e.target.closest('li');
  if (!target) return;

  list.forEach((li) => {
    removeClass(li, 'is-active');
  });

  addClass(target, 'is-active');

  
  let indexData = getIndexData(target);

  setBgColor(body,indexData);
  
  setNickName(nickName,indexData);

  setImage(visualImage,indexData);

  playAudio(indexData);

}


nav.addEventListener('click', handleSlider);
