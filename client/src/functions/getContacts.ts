import axios from 'axios';
import ContactInt from '../interfaces/contact';
import store from '../redux/store/store';
import serverhost from '../serverhost';

export default async function getContacts(): Promise<{ data: { data: Array<ContactInt> } }> {
  const { account } = store.getState(); // todo account type
  const currentToken: string = account.data.accessToken;
  const uid: number = account.data.user.id;
  const askData = async (token: string) =>
    axios
      .get(`${serverhost}/data/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response);
  const data = await askData(currentToken);
  return {
    data,
  };
}
