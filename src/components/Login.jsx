import React, { useState } from 'react';
import { Lock, Mail, Store, Info, X } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@loja.com.br');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulação de autenticação profissional
    if (email === 'admin@loja.com.br' && password === 'admin123') {
      onLogin({ email, name: 'Admin User' });
    } else {
      setError('E-mail ou senha incorretos. Tente admin@loja.com.br / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <Store className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Loja Admin</h1>
          <p className="text-slate-500 mt-2">Acesse seu painel de controle corporativo</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="exemplo@loja.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-slate-600">Lembrar acesso</span>
              </label>
              <button 
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-sm text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              Entrar no Sistema
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-sm">
          &copy; 2026 Loja Admin - Soluções Corporativas.
        </p>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4">
                <Info size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">Recuperação de Acesso</h3>
              <p className="text-slate-600 text-sm mb-6">
                Este é um <strong>projeto de portfólio</strong> desenvolvido para demonstrar habilidades técnicas. Por questões de praticidade, as credenciais administrativas são:
              </p>
              
              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-left">
                <div className="mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">E-mail</span>
                  <p className="text-slate-700 font-mono">admin@loja.com.br</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Senha</span>
                  <p className="text-slate-700 font-mono">admin123</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all"
              >
                Voltar para o Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
