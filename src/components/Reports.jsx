import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const Reports = ({ orders }) => {
  // Cálculos de Relatório
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelado')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOrders = orders.length;
  
  const statusCounts = orders.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const averageTicket = totalOrders > 0 ? totalRevenue / orders.filter(o => o.status !== 'Cancelado').length : 0;

  // Simulação de dados mensais para o gráfico (Mock)
  const monthlyData = [
    { month: 'Jan', value: 4500, height: 'h-16' },
    { month: 'Fev', value: 3200, height: 'h-12' },
    { month: 'Mar', value: 6800, height: 'h-24' },
    { month: 'Abr', value: 5100, height: 'h-20' },
    { month: 'Mai', value: 8900, height: 'h-32' },
    { month: 'Jun', value: totalRevenue, height: 'h-[140px]', active: true },
  ];

  const getPercentage = (count) => {
    return totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket Médio Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Ticket Médio</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(averageTicket)}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
            <TrendingUp size={16} />
            <span>+12.5% vs mês anterior</span>
          </div>
        </div>

        {/* Taxa de Sucesso Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Taxa de Conclusão</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {getPercentage(statusCounts['Concluído'] || 0)}%
              </h3>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full" 
              style={{ width: `${getPercentage(statusCounts['Concluído'] || 0)}%` }}
            />
          </div>
        </div>

        {/* Pedidos Cancelados Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Taxa de Cancelamento</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {getPercentage(statusCounts['Cancelado'] || 0)}%
              </h3>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              <XCircle size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-medium">
            <TrendingDown size={16} />
            <span>+2% vs mês anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receita (Simulado com CSS) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Receita Semestral</h3>
            <select className="text-sm border-none bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-1 text-slate-600 dark:text-slate-300 outline-none">
              <option>Últimos 6 meses</option>
            </select>
          </div>
          
          <div className="flex items-end justify-between h-64 gap-2 pt-4 px-2">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  R${(data.value / 1000).toFixed(1)}k
                </div>
                <div 
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 hover:bg-blue-500 ${data.active ? 'bg-blue-600 dark:bg-blue-500' : 'bg-blue-100 dark:bg-blue-900/40'}`}
                  style={{ height: idx === monthlyData.length - 1 ? '100%' : data.height }} // Usando 100% para o mês atual para demo
                />
                <span className={`text-xs font-medium ${data.active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribuição de Status */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Status dos Pedidos</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle size={16} className="text-green-500" /> Concluídos
                </span>
                <span className="font-bold text-slate-800 dark:text-white">{statusCounts['Concluído'] || 0}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${getPercentage(statusCounts['Concluído'] || 0)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Clock size={16} className="text-yellow-500" /> Pendentes
                </span>
                <span className="font-bold text-slate-800 dark:text-white">{statusCounts['Pendente'] || 0}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full" 
                  style={{ width: `${getPercentage(statusCounts['Pendente'] || 0)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <XCircle size={16} className="text-red-500" /> Cancelados
                </span>
                <span className="font-bold text-slate-800 dark:text-white">{statusCounts['Cancelado'] || 0}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full" 
                  style={{ width: `${getPercentage(statusCounts['Cancelado'] || 0)}%` }}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Previsão de Receita</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Baseado nos pedidos pendentes</p>
                </div>
                <div className="text-right">
                   <p className="text-xl font-bold text-slate-800">
                     {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                       orders.filter(o => o.status === 'Pendente').reduce((acc, curr) => acc + curr.amount, 0)
                     )}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
