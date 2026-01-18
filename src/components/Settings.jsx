import React, { useState } from 'react';
import { User, Sun, Moon, Save, Trash2, Monitor } from 'lucide-react';

const Settings = ({ user, onUserUpdate, theme, onThemeChange }) => {
  const [formData, setFormData] = useState({
    userName: user?.name || 'Admin User',
    userEmail: user?.email || 'admin@loja.com.br'
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUserUpdate({ name: formData.userName, email: formData.userEmail });
    alert('Configurações salvas!');
  };

  const handleReset = () => {
    if (window.confirm('Isso apagará todos os dados. Continuar?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 transition-colors">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Seção Perfil */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              <User size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Perfil do Administrador</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Nome de Exibição</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({...formData, userName: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">E-mail</label>
                <input
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Seção Aparência */}
          <section>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Sun size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Aparência do Sistema</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                type="button"
                onClick={() => onThemeChange('light')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}
              >
                <Sun size={18} />
                <span className="font-medium">Claro</span>
              </button>
              
              <button 
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}
              >
                <Moon size={18} />
                <span className="font-medium">Escuro</span>
              </button>
              
              <button 
                type="button"
                className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                disabled
              >
                <Monitor size={18} />
                <span className="font-medium">Auto</span>
              </button>
            </div>
          </section>

          {/* Botões de Ação */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button 
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              <Trash2 size={16} />
              Redefinir Dados
            </button>
            
            <button 
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100 dark:shadow-none"
            >
              <Save size={20} />
              Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Settings;
