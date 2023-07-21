import { getNode } from './index.js';


function getAttr(node,prop){
  
  if(typeof node === 'string') node = getNode(node);

  return node.getAttribute(prop);
}

function setAttr(node,prop,value){

  if(typeof node === 'string') node = getNode(node);

  if(typeof prop !== 'string'){
    throw new TypeError('setAttr 함수의 두 번째 인수는 문자 타입이어야 합니다.');
  }

  if(!node[prop] && prop !== 'class' && prop !== 'title'){
    node.dataset[prop] = value;
    return;
  }

  node.setAttribute(prop, value);
}

function attr(node,prop,value){

  return !value ? getAttr(node,prop) : setAttr(node,prop,value);

}

export {getAttr, setAttr, attr};