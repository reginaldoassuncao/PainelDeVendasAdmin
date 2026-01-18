import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, BarChart3 } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Painel Geral' },
    { icon: ShoppingBag, label: 'Pedidos' },
    { icon: Users, label: 'Clientes' },
    { icon: BarChart3, label: 'Relatórios' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">L</div>
        <h1 className="text-xl font-bold">Loja Admin</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button 
                onClick={() => onTabChange(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === item.label 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
