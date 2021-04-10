// 정규식 이메일체크, 아이디 체크

export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  return _reg.test(email);
};
export const idCheck = (id) => {
  let _reg = /^[0-9a-z]+$/;
  return _reg.test(id);
};
