import React, { useState } from 'react';
import { Store, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    
    try {
      await login();
    } catch (err) {
      console.error(err);
      setError('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200 dark:shadow-blue-900/40">
            <Store className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Loja Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Gestão profissional para sua loja</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 transition-colors">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium border border-red-100 dark:border-red-800 mb-6 text-center">
                {error}
              </div>
            )}
            
            <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Bem-vindo(a)</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Entre com sua conta Google para gerenciar sua loja de forma individual e segura.
                </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-semibold py-3.5 rounded-xl transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 shadow-sm"
            >
              {loading ? (
                <Loader2 className="animate-spin text-blue-600" size={20} />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                    <path fill="#1976D2" d="M43.611 20.083A19.56 19.56 0 0 0 44 14c0-3.664-.98-7.098-2.691-10.057l-6.309 5.33A11.95 11.95 0 0 1 24 12c-5.202 0-9.619 3.317-11.283 7.946l-6.522 5.025C5.922 25.101 6 24.556 6 24c0 10.151 7.554 18.55 17.388 19.825L30.909 38.64A19.86 19.86 0 0 0 43.611 20.083z" />
                  </svg>
                  <span>Entrar com Google</span>
                </>
              )}
            </button>
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm">
          &copy; 2026 Loja Admin - Painel Individualizado.
        </p>
      </div>
    </div>
  );
};

export default Login;
