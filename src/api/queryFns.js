// query functions들 선언하시고 export 하시면 됩니다!
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from 'firebaseStore/firebaseConfig';

export const fetchWorldCupList = async () => {
  try {
    const q = query(collection(db, 'worldCupList'));
    const querySnapshot = await getDocs(q);
    const worldCupList = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data()
      };
      worldCupList.push(data);
    });
    return worldCupList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addWorldCup = async (newWorldCup) => {
  try {
    console.log('이거는 실행돼?');
    const collectionRef = collection(db, 'worldCupList');
    await addDoc(collectionRef, newWorldCup);
    console.log('firebase에 새로운 월드컵 추가 성공');
  } catch (error) {
    console.error('새로운 월드컵 추가 실패!', error);
  }
};
