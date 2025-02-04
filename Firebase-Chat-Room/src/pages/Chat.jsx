import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import Message from '../components/Message';

const Chat = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  // kolleksiyonun refernasını alma
  const messagesCol = collection(db, 'messages');

  // formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    // koleksiyona yeni document(mesaj) ekleme
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    // filtreleme ayarları tanımlama
    const queryOptions = query(
      messagesCol,
      where('room', '==', room),
      orderBy('createdAt', 'asc')
    );

    // kolleksiyondaki değişimi izleyip
    // kolleksen her değiştiğinde fonksiyon çalıştıtır
    // ve fonksiyona kolleksiyonun güncel verilerini aktarır
    const unsubscribe = onSnapshot(queryOptions, (snapshot) => {
      const comingMessages = [];

      // dökümanları dönüp doc içerisndeki
      // verilere erişip, bir diziye aktarma
      snapshot.docs.forEach((doc) =>
        comingMessages.push({ ...doc.data(), id: doc.id })
      );

      setMessages(comingMessages);
    });

    return () => {
      // kollekisiyonu izlemeyi durdurur
      unsubscribe();
    };
  }, []);

  return (
    <div className="chat">
      <header>
        <p className="user">Kullanıcı Adı</p>
        <p>{room}</p>
        <a onClick={() => setRoom(null)}>Farkı Oda</a>
      </header>
      <main>
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="mesajınzı yazınız..."
          type="text"
        />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
