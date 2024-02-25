// query functions들 선언하시고 export 하시면 됩니다!
import axios from 'axios';

const getWorldCups = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/worldCupList`);
  return response.data;
};

export { getWorldCups };
