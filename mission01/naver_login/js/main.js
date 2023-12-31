
const user = {
  id:'asd@naver.com',
  pw:'spdlqj123!@'
}

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase())
}

function pwReg(text){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}


const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const loginButton = document.querySelector('.btn-login');

function userInputCheck(){
  if(!emailReg(this.value) && !pwReg(this.value)){
    this.classList.add('is--invalid')
  } else{
    this.classList.remove('is--invalid');
  } 
}

function loginApprove(){

  let isUserTrue = userEmail.value === user.id && userPassword.value === user.pw;  

  if(isUserTrue){
    window.location.href = 'welcome.html';
  } else {
    alert('아이디(이메일) 또는 비밀번호를 잘못 입력했습니다.')
  }
}

userEmail.addEventListener('input', userInputCheck);
userPassword.addEventListener('input', userInputCheck);
loginButton.addEventListener('click', loginApprove);
