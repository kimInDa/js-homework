import { getNode, isString } from './index.js';


function getAttr(node,prop){
  
  if(isString(node)) node = getNode(node);

  return node.getAttribute(prop);
}

function setAttr(node,prop,value){

  if(isString(node)) node = getNode(node);

  if(!isString(prop)){
    throw new TypeError('setAttr 함수의 두 번째 인수는 문자 타입이어야 합니다.');
  }
  if(!value){
    throw new Error('setAttr 함수의 세 번째 인수는 필수 값이어야 합니다.')
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