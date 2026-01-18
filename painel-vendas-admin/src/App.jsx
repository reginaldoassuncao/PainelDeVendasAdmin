import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import RecentOrders from './components/RecentOrders';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

function App() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    customers: 0
  });

  useEffect(() => {
    const storedOrders = localStorage.getItem('painel-vendas-orders');
    
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setOrders(parsedOrders);
      calculateStats(parsedOrders);
    } else {
      // Seed Data
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
  }, []);

  const calculateStats = (currentOrders) => {
    const totalRevenue = currentOrders.reduce((acc, order) => {
      // Don't count cancelled orders
      return order.status !== 'Cancelado' ? acc + order.amount : acc;
    }, 0);
    
    const uniqueCustomers = new Set(currentOrders.map(o => o.customer)).size;
    
    setStats({
      revenue: totalRevenue,
      ordersCount: currentOrders.length,
      customers: uniqueCustomers
    });
  };

  const toggleStatus = (id) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        // Toggle between Pendente and Concluído
        const newStatus = order.status === 'Pendente' ? 'Concluído' : 
                          order.status === 'Concluído' ? 'Pendente' : order.status;
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    calculateStats(updatedOrders);
    localStorage.setItem('painel-vendas-orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500">Bem-vindo ao seu painel de controle.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">admin@loja.com.br</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              A
            </div>
          </div>
        </header>

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
            title="Taxa de Conversão" 
            value="3.2%" 
            icon={TrendingUp} 
            color="bg-green-500" 
          />
        </div>

        <RecentOrders orders={orders} onStatusChange={toggleStatus} />
      </main>
    </div>
  );
}

export default App;
