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
import { useAuth } from './context/AuthContext';
import { db } from './firebase/config';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';

function App() {
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('painel-vendas-theme') || 'light');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Painel Geral');

// ...
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    customers: 0,
    averageTicket: 0,
    conversionRate: 3.2
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
    if (!currentUser) return;

    // Sincronização em tempo real de Pedidos do usuário logado
    const qOrders = query(
      collection(db, 'orders'), 
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      calculateStats(ordersData);
    });

    // Sincronização em tempo real de Clientes do usuário logado
    const qCustomers = query(
      collection(db, 'customers'), 
      where('userId', '==', currentUser.uid),
      orderBy('name', 'asc')
    );
    const unsubscribeCustomers = onSnapshot(qCustomers, (snapshot) => {
      const customersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCustomers(customersData);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeCustomers();
    };
  }, [currentUser]);

  const calculateStats = (currentOrders) => {
    const totalRevenue = currentOrders.reduce((acc, order) => {
      return order.status !== 'Cancelado' ? acc + order.amount : acc;
    }, 0);
    
    const activeOrders = currentOrders.filter(o => o.status !== 'Cancelado').length;
    const avgTicket = activeOrders > 0 ? totalRevenue / activeOrders : 0;
    
    // Cálculo de conversão baseada em volume de tráfego
    const conversion = (currentOrders.length / 500) * 100;
    
    const uniqueCustomers = new Set(currentOrders.map(o => o.customer)).size;
    
    setStats({
      revenue: totalRevenue,
      ordersCount: currentOrders.length,
      customers: uniqueCustomers,
      averageTicket: avgTicket
    });
  };

  const toggleStatus = async (id, currentStatus) => {
    let newStatus = 'Pendente';
    if (currentStatus === 'Pendente') newStatus = 'Concluído';
    else if (currentStatus === 'Concluído') newStatus = 'Cancelado';
    
    try {
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const handleAddOrder = async (newOrderData) => {
    try {
      await addDoc(collection(db, 'orders'), {
        ...newOrderData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      alert('Pedido criado com sucesso!');
    } catch (err) {
      console.error("Erro ao adicionar pedido:", err);
      alert('Erro ao criar pedido.');
    }
  };

  const handleAddCustomer = async (newCustomerData) => {
    try {
      await addDoc(collection(db, 'customers'), {
        ...newCustomerData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      alert('Cliente cadastrado com sucesso!');
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err);
      alert('Erro ao cadastrar cliente.');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await deleteDoc(doc(db, 'orders', id));
      } catch (err) {
        console.error("Erro ao excluir pedido:", err);
      }
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteDoc(doc(db, 'customers', id));
      } catch (err) {
        console.error("Erro ao excluir cliente:", err);
      }
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Deseja realmente sair?')) {
      try {
        await logout();
      } catch (err) {
        console.error("Erro ao sair:", err);
      }
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

  if (!currentUser) {
    return <Login />;
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
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{currentUser.displayName || 'Administrador'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 uppercase">
              {(currentUser.displayName || currentUser.email).charAt(0)}
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
            user={{ 
              name: currentUser.displayName || 'Admin User', 
              email: currentUser.email 
            }} 
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
