import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import RecentOrders from './components/RecentOrders';
import NewOrderModal from './components/NewOrderModal';
import Customers from './components/Customers';
import NewCustomerModal from './components/NewCustomerModal';
import Reports from './components/Reports';
import Login from './components/Login';
import Settings from './components/Settings';
import { DollarSign, ShoppingBag, Users, TrendingUp, Search, Plus } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('painel-vendas-theme') || 'light');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Painel Geral');
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    customers: 0,
    averageTicket: 0,
    conversionRate: 3.2 // Valor base simulado
  });

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('painel-vendas-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check for user session
    const storedUser = localStorage.getItem('painel-vendas-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load Orders
    const storedOrders = localStorage.getItem('painel-vendas-orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setOrders(parsedOrders);
      calculateStats(parsedOrders);
    } else {
      const initialOrders = [
        { id: '1001', customer: 'João Silva', amount: 350.50, status: 'Concluído' },
        { id: '1002', customer: 'Maria Oliveira', amount: 120.00, status: 'Pendente' },
        { id: '1003', customer: 'Carlos Pereira', amount: 890.90, status: 'Concluído' },
        { id: '1004', customer: 'Ana Souza', amount: 45.00, status: 'Cancelado' },
        { id: '1005', customer: 'Roberto Santos', amount: 210.25, status: 'Pendente' },
        { id: '1006', customer: 'Fernanda Lima', amount: 1250.00, status: 'Concluído' },
        { id: '1007', customer: 'Paulo Costa', amount: 75.50, status: 'Pendente' },
      ];
      localStorage.setItem('painel-vendas-orders', JSON.stringify(initialOrders));
      setOrders(initialOrders);
      calculateStats(initialOrders);
    }

    // Load Customers
    const storedCustomers = localStorage.getItem('painel-vendas-customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      const initialCustomers = [
        { id: '1', name: 'João Silva', email: 'joao.silva@email.com', phone: '(11) 99999-9999', status: 'Ativo' },
        { id: '2', name: 'Maria Oliveira', email: 'maria.o@empresa.com', phone: '(21) 98888-8888', status: 'Ativo' },
        { id: '3', name: 'Carlos Pereira', email: 'carlos.pereira@web.com.br', phone: '(31) 97777-7777', status: 'Ativo' },
        { id: '4', name: 'Ana Souza', email: 'ana.souza@loja.com', phone: '(41) 96666-6666', status: 'Inativo' },
        { id: '5', name: 'Roberto Santos', email: 'roberto@santos.adv.br', phone: '(51) 95555-5555', status: 'Ativo' },
        { id: '6', name: 'Fernanda Lima', email: 'fernanda.lima@design.com', phone: '(61) 94444-4444', status: 'Ativo' },
        { id: '7', name: 'Paulo Costa', email: 'paulo.costa@tech.com', phone: '(71) 93333-3333', status: 'Ativo' },
      ];
      localStorage.setItem('painel-vendas-customers', JSON.stringify(initialCustomers));
      setCustomers(initialCustomers);
    }
  }, []);

  const calculateStats = (currentOrders) => {
    const totalRevenue = currentOrders.reduce((acc, order) => {
      return order.status !== 'Cancelado' ? acc + order.amount : acc;
    }, 0);
    
    const activeOrders = currentOrders.filter(o => o.status !== 'Cancelado').length;
    const avgTicket = activeOrders > 0 ? totalRevenue / activeOrders : 0;
    
    // Simulação: Taxa de conversão baseada em acessos fixos (Ex: 500 acessos)
    const simulatedVisits = 500;
    const conversion = (currentOrders.length / simulatedVisits) * 100;
    
    const uniqueCustomers = new Set(currentOrders.map(o => o.customer)).size;
    
    setStats({
      revenue: totalRevenue,
      ordersCount: currentOrders.length,
      customers: uniqueCustomers,
      averageTicket: avgTicket
    });
  };

  const toggleStatus = (id) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        let newStatus = 'Pendente';
        if (order.status === 'Pendente') newStatus = 'Concluído';
        else if (order.status === 'Concluído') newStatus = 'Cancelado';
        
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    updateOrders(updatedOrders);
  };

  const handleAddOrder = (newOrderData) => {
    const nextId = orders.length > 0 
      ? Math.max(...orders.map(o => parseInt(o.id))) + 1 
      : 1001;
      
    const newOrder = {
      id: nextId.toString(),
      ...newOrderData
    };
    
    const updatedOrders = [newOrder, ...orders];
    updateOrders(updatedOrders);
    alert('Pedido criado com sucesso!');
  };

  const handleAddCustomer = (newCustomerData) => {
    const nextId = customers.length > 0 
      ? Math.max(...customers.map(c => parseInt(c.id))) + 1 
      : 1;

    const newCustomer = {
      id: nextId.toString(),
      ...newCustomerData
    };
    
    const updatedCustomers = [newCustomer, ...customers];
    updateCustomers(updatedCustomers);
    alert('Cliente cadastrado com sucesso!');
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      const updatedOrders = orders.filter(order => order.id !== id);
      updateOrders(updatedOrders);
    }
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      updateCustomers(updatedCustomers);
    }
  };

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    calculateStats(newOrders);
    localStorage.setItem('painel-vendas-orders', JSON.stringify(newOrders));
  };

  const updateCustomers = (newCustomers) => {
    setCustomers(newCustomers);
    localStorage.setItem('painel-vendas-customers', JSON.stringify(newCustomers));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('painel-vendas-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      setUser(null);
      localStorage.removeItem('painel-vendas-user');
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm)
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm)
  );

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">{activeTab}</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {activeTab === 'Painel Geral' ? 'Visão geral do seu negócio.' : 
               activeTab === 'Pedidos' ? 'Gerencie todas as vendas da loja.' :
               activeTab === 'Clientes' ? 'Gerencie sua base de clientes.' :
               activeTab === 'Relatórios' ? 'Acompanhe o desempenho da sua loja.' :
               `Gerenciamento de ${activeTab.toLowerCase()}.`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {activeTab === 'Painel Geral' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard 
                title="Receita Total" 
                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.revenue)} 
                icon={DollarSign} 
                color="bg-blue-600" 
              />
              <StatsCard 
                title="Total de Pedidos" 
                value={stats.ordersCount} 
                icon={ShoppingBag} 
                color="bg-purple-600" 
              />
              <StatsCard 
                title="Clientes Ativos" 
                value={stats.customers} 
                icon={Users} 
                color="bg-orange-500" 
              />
              <StatsCard 
                title="Ticket Médio" 
                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.averageTicket)} 
                icon={TrendingUp} 
                color="bg-green-500" 
              />
            </div>
            
            <div className="mb-4 flex items-center justify-between">
               <h2 className="text-lg font-bold text-slate-800">Últimas Vendas</h2>
               <button onClick={() => setActiveTab('Pedidos')} className="text-blue-600 text-sm hover:underline">Ver tudo</button>
            </div>
            <RecentOrders 
              orders={orders.slice(0, 5)} 
              onStatusChange={toggleStatus} 
              onDelete={handleDeleteOrder} 
            />
          </>
        )}

        {activeTab === 'Pedidos' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar cliente ou ID..."
                  className="pl-10 pr-4 py-2.5 w-full border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-200 w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                <span>Novo Pedido</span>
              </button>
            </div>

            <RecentOrders 
              orders={filteredOrders} 
              onStatusChange={toggleStatus} 
              onDelete={handleDeleteOrder} 
            />
          </>
        )}

        {activeTab === 'Clientes' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar cliente por nome ou email..."
                  className="pl-10 pr-4 py-2.5 w-full border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setIsCustomerModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm shadow-blue-200 w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                <span>Novo Cliente</span>
              </button>
            </div>

            <Customers 
              customers={filteredCustomers} 
              orders={orders}
              onDelete={handleDeleteCustomer}
            />
          </>
        )}

        {activeTab === 'Relatórios' && (
          <Reports orders={orders} />
        )}

        {activeTab === 'Configurações' && (
          <Settings 
            user={user} 
            onUserUpdate={handleLogin} 
            theme={theme} 
            onThemeChange={setTheme} 
          />
        )}
      </main>

      <NewOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddOrder}
        customers={customers}
      />

      <NewCustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSave={handleAddCustomer}
      />
    </div>
  );
}

export default App;
