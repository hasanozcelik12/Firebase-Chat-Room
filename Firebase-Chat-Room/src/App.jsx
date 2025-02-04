import { useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Chat from './pages/Chat';

function App() {
  const [isAuth, setIsAuth] = useState();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // onAuthStateChanged > auth objesinin değişimini izler
    // fonkisyonu > kullanıcını giriş ve çekış işleminde tetiklenir
    // çalıştırdığı fonksiyona aktif kullanıcı varsa gönderir
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setRoom(e.target[0].value);
  };

  // kullanıcının oturumu kapalıysa login sayfasını ekrana bas
  if (isAuth === false) {
    return (
      <div className="container">
        <AuthPage />
      </div>
    );
  }

  // kullanıcnın oturumu açıksa >
  return (
    <div className="container">
      {room ? (
        // odayı belirlediyse >
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // odayı henüz belirlemdiyse >
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Odası</h1>
          <p>Hangi Odaya Giriceksiniz</p>
          <input required placeholder="örn:haftasonu" type="text" />

          <button className="submit">Odaya Gir</button>
          <button className="button">Çıkış Yap</button>
        </form>
      )}
    </div>
  );
}

export default App;
