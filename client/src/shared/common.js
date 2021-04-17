// 정규식 이메일체크, 비밀번호 체크

// 이메일 형식
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  return _reg.test(email);
};
// 비밀번호 형식 4-16자리 영문, 숫자 조합
export const userpasswordCheck = (data) => {
  let _reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,16}/;

  return _reg.test(data);
};
