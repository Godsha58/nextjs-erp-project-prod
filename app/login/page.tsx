"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirigir si ya hay cookie (revisión simple, idealmente con verificación del token en el server)
    if (document.cookie.includes('token=')) {
      router.push('/');
    }
  }, [router]);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      console.log('JWT recibido:', token); // 👉 Aquí lo verás en la consola
      router.push('/');
    } else {
      const { error } = await res.json();
      alert(error || 'Credenciales incorrectas');
    }
  } catch (err) {
    alert('Error al conectar con el servidor');
  }
};

  // Animación de texto
  useEffect(() => {
    const texts = ['Welcome', 'Bienvenido', 'Bienvenue', 'Bem-vindo', '欢迎'];
    const typingElement = document.querySelector('.typewriter-text');
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[index];
      if (!typingElement) return;

      if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);
      } else {
        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);
      }

      let delay = isDeleting ? 50 : 120;

      if (!isDeleting && charIndex === currentText.length) {
        delay = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        delay = 500;
      }

      setTimeout(type, delay);
    };

    type();
  }, []);

  return (
    <div className="login-container">
      <img src="/logo.png" alt="NitroDrive Logo" className="login-logo" />
      <div className="login-content">
        <form className="login-form" onSubmit={handleLogin}>
          <h2><span className="typewriter-text"></span></h2>
          <input
            type="text"
            placeholder="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
