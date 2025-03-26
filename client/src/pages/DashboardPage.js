import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { todoService } from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await todoService.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to load statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <p style={{ color: '#DC2626' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Dashboard
      </h1>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem' }}>
          Welcome, {user?.name}!
        </h2>
        
        {stats && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>
              Your Todo Overview
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: '#EFF6FF', padding: '1rem', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#1E40AF', fontWeight: '500' }}>Total Todos</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1E40AF' }}>{stats.overall.total}</p>
              </div>
              
              <div style={{ backgroundColor: '#ECFDF5', padding: '1rem', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#065F46', fontWeight: '500' }}>Completed</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065F46' }}>{stats.overall.completed}</p>
              </div>
              
              <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#991B1B', fontWeight: '500' }}>Overdue</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#991B1B' }}>{stats.overall.overdue}</p>
              </div>
              
              <div style={{ backgroundColor: '#F3F4F6', padding: '1rem', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#1F2937', fontWeight: '500' }}>Completion Rate</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1F2937' }}>{stats.overall.completionRate}%</p>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>
              Todos by Priority
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              {stats.priorities.map(priority => (
                <div key={priority.priority} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '500', textTransform: 'capitalize' }}>{priority.priority}</span>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      {priority.completed} of {priority.count} completed ({priority.completionRate}%)
                    </span>
                  </div>
                  <div style={{ height: '0.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${priority.completionRate}%`,
                        backgroundColor: priority.priority === 'high' ? '#DC2626' : 
                                        priority.priority === 'medium' ? '#F59E0B' : '#10B981'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>
              Todos by Category
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {stats.categories.map(category => (
                <div key={category.category} style={{ border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '1rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{category.category}</p>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                    {category.count} todos ({category.completed} completed)
                  </p>
                  <div style={{ height: '0.5rem', backgroundColor: '#E5E7EB', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${category.completionRate}%`,
                        backgroundColor: '#3B82F6'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;