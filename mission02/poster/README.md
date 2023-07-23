🦁 [ 멋사 프론트엔드 스쿨 6기 **Vanilla JavaScript** 과제 : Misson 02]

# 이미지 슬라이드 구현하기
썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀌는 코드 로직을 작성합니다.

![complete](https://github.com/kimInDa/js-homework/assets/105577805/1f9a4337-f44f-4153-a84f-210d771e3362)

</br>

# 목차
- [구현사항](#구현사항)
- [코드 리뷰](#코드-리뷰)
  
  1. [이벤트 처리 방식](#1-이벤트-처리-방식-이벤트-위임-반복문)

  2. [배경 색상, 캐릭터 이름, 비주얼 이미지 변경](#2-배경-색상-캐릭터-이름-비주얼-이미지-변경)

  3. [캐릭터별 음성 변경](#3-캐릭터별-음성-변경)

</br>

# 구현사항
- [x] **이벤트 처리 방식**(**이벤트 위임**, **반복문**)을 사용하여 클릭 이벤트를 겁니다.
- [x] 각 `li` 항목들을 클릭하면 **배경 색상**, 상단의 **캐릭터 이름**, 메인 **비주얼 이미지**가 변경되도록 합니다.
- [x] (선택사항) 각 `li` 항목들을 클릭하면 해당 **캐릭터의 음성**이 나오도록 합니다.
- [x] **함수를 분리**시킵니다.(`setBgColor` 함수, `setImage` 함수, `setNameText` 함수)
- [x] 가독성이 좋은 코드로 **리팩토링** 합니다.

</br>

# 코드 리뷰
## 1. 이벤트 처리 방식 (이벤트 위임, 반복문)
```js
const nav = getNode('.nav');
const list = getNodes('li');
const body = getNode('body');
const nickName = getNode('.nickName');
const visualImage = getNode('.visual img');



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

```
- slide 영역인 `'.nav'`를 유틸함수 `getNode()`를 사용하여 가져온 후 `click` 이벤트를 걸어줍니다.
- `event.target` 속성을 사용하여 클릭 대상인 각 `li`에 이벤트를 위임 합니다.
- 썸네일 이미지를 클릭했을 때 클릭한 이미지에만 `is-active` class가 추가되도록 하기 위하여 `forEach()`메서드와 `addClass()` 유틸함수를 사용합니다.

</br>

## 2. 배경 색상, 캐릭터 이름, 비주얼 이미지 변경
```js
function getIndex(node){

  return attr(node,'data-index');

}


function getIndexData(node){

  return data[getIndex(node) - 1];

}
```
- 썸네일 이미지를 클릭할 때마다 각 썸네일의 `data-index` 속성값을 가져오기 위하여, 유틸함수 `attr()` 함수를 활용한 `getIndex()`함수를 구현합니다.
- `getIndex()`함수로 얻은 `index`를 활용하여 `data.js` 파일의 `data` 배열로 부터 각 썸네일 별 객체 정보를 가져오는 `getIndexData()` 함수를 구현합니다.

</br>

```js
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
```
- `getIndexData()` 함수로 반환 받은 값을 변수 `indexData`에 담습니다. 
- 배경 색상, 캐릭터 이름, 비주얼 이미지를 변경하는 각 `setBgColor()`, `setNickName()`, `setImage()` 함수에 `indexData`를 인수로 전달하여 기능을 구현합니다.
- `setBgColor()` 함수는 `css()` 유틸함수를 이용하여 `HTML` 내 `body`요소의 CSS `background` 속성값을 변경합니다.
- `setNickName()` 함수는 `Node.textContent` 프로퍼티를 사용하여 썸네일을 클릭할 때 마다 상단의 캐릭터 이름을 변경합니다.
- `setImage()` 함수는 유틸함수 `attr()`을 사용하여 가운데 위치한 비주얼 이미지의 이미지 경로인 `src`의 속성값과 대체 텍스트인 `alt` 속성값을 변경합니다.

</br>

## 3. 캐릭터별 음성 변경
```js
function setAudio(indexData){
  const source = `./assets/audio/${indexData.name}.m4a`;
  const audio = new AudioPlayer(source);
  return audio;
};

const playAudio = (()=>{

  let voice;

  return (indexData)=>{
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
```
- `setAudio()` 함수는 `audio.js` 파일에서 `export` 된 `class AudioPlayer`를 사용하여 새로운 오디오 객체를 생성합니다.
- `playAudio()` 함수는 이벤트 리스너인 `handleSlider()`에서 호출 됩니다.
- `playAudio()` 함수는 썸네일을 클릭할 때 마다 `setAudio()` 함수를 이용하여 객체를 생성하고, 생성된 객체의 메서드를 사용하여 음성을 재생합니다.
- `playAudio()` 함수는 기존에 재생되던 음성이 있을 때 새로운 썸네일을 클릭하는 경우 기존에 재생되던 음성은 중단 되고 새로운 음성이 재생되는 기능을 구현합니다.
- 위 기능을 전역을 오염 시키지 않고 구현하기 위하여, `playAudio()` 함수를 `Closure`와 `IIFE`를 사용하여 작성합니다. 