import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';

const AuthPage = () => {
  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="auth">
      <h1>Chat Odası</h1>
      <p>Devam etmek için Giriş Yapın</p>

      <button onClick={handleClick}>
        <img src="/google-l.png" />
        <span>Google ile gir</span>
      </button>
    </div>
  );
};

export default AuthPage;
