// query functions들 선언하시고 export 하시면 됩니다!

































// 삭제하기
const deleteWorldCupList = async (userMail) => {
  await axios.delete(`${URL}/worldCupList`, userMail);
};
