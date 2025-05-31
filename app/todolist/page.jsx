import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Save, X, Plus, Search, Filter } from 'lucide-react';

const TodoApp = () => {
  // 1. 基础状态 - 输入框和过滤器
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. 复杂对象数组状态 - todos
  const [todos, setTodos] = useState([]);
  
  // 3. 编辑状态管理
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // 4. 统计信息 - 惰性计算优化
  const [stats, setStats] = useState(() => ({
    total: 0,
    completed: 0,
    active: 0
  }));
  
  // 5. 自动保存到本地存储状态（模拟localStorage）
  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved');
  
  // 6. 无依赖useEffect - 组件挂载时初始化
  useEffect(() => {
    console.log('Todo应用已加载');
    // 模拟从存储加载数据
    const savedTodos = [
      { id: 1, text: '学习React Hooks', completed: true, createdAt: new Date().toISOString() },
      { id: 2, text: '完成项目文档', completed: false, createdAt: new Date().toISOString() }
    ];
    setTodos(savedTodos);
    
    return () => {
      console.log('Todo应用卸载清理');
    };
  }, []);
  
  // 7. 单一依赖useEffect - todos变化时更新统计
  useEffect(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    setStats({ total, completed, active });
    
    // 更新页面标题
    document.title = `Todo (${active} 待办)`;
  }, [todos]);
  
  // 8. 多依赖useEffect - 自动保存功能
  useEffect(() => {
    if (!autoSave || todos.length === 0) return;
    
    setSaveStatus('saving...');
    
    // 模拟保存延迟
    const saveTimer = setTimeout(() => {
      console.log('自动保存todos:', todos);
      setSaveStatus('saved');
    }, 1000);
    
    return () => clearTimeout(saveTimer);
  }, [todos, autoSave]);
  
  // 9. 搜索防抖useEffect
  useEffect(() => {
    if (!searchTerm) return;
    
    const debounceTimer = setTimeout(() => {
      console.log('搜索:', searchTerm);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  
  // 10. 定时器useEffect - 显示创建时间的相对时间
  useEffect(() => {
    const interval = setInterval(() => {
      // 强制重新渲染以更新相对时间显示
      setTodos(prev => [...prev]);
    }, 60000); // 每分钟更新
    
    return () => clearInterval(interval);
  }, []);
  
  // 添加todo - 展示函数式状态更新
  const addTodo = () => {
    if (!inputValue.trim()) return;
    
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
    
    setInputValue(''); // 重置输入
  };
  
  // 切换完成状态 - 不可变更新对象数组
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // 删除todo - 数组过滤
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  // 开始编辑
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };
  
  // 保存编辑 - 复杂状态更新
  const saveEdit = () => {
    if (!editValue.trim()) return;
    
    setTodos(prev => prev.map(todo =>
      todo.id === editingId 
        ? { ...todo, text: editValue.trim() }
        : todo
    ));
    
    setEditingId(null);
    setEditValue('');
  };
  
  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };
  
  // 清空已完成
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };
  
  // 过滤todos
  const filteredTodos = todos.filter(todo => {
    // 根据完成状态过滤
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // 根据搜索词过滤
    if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // 获取相对时间
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}小时前`;
    return `${Math.floor(diffMins / 1440)}天前`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">智能Todo管理器</h1>
        <p className="opacity-90">演示 useState & useEffect 核心用法</p>
      </div>
      
      {/* 统计面板 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">总任务</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
          <div className="text-sm text-gray-600">待完成</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">已完成</div>
        </div>
      </div>
      
      {/* 添加任务 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新任务..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          添加
        </button>
      </div>
      
      {/* 控制面板 */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* 搜索 */}
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索任务..."
            className="px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* 过滤器 */}
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">全部</option>
            <option value="active">待完成</option>
            <option value="completed">已完成</option>
          </select>
        </div>
        
        {/* 自动保存开关 */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">自动保存</span>
          <span className="text-xs text-gray-500">({saveStatus})</span>
        </label>
        
        {/* 清理按钮 */}
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            清空已完成
          </button>
        )}
      </div>
      
      {/* 任务列表 */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? '没有找到匹配的任务' : '暂无任务，添加一个开始吧！'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded"
              />
              
              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {getRelativeTime(todo.createdAt)}
                    </div>
                  </div>
                  <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;