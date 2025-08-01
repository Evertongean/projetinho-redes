import React, { useState, useEffect } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = () => {
    fetch('http://localhost:8000/api/tarefas/')
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error('Erro ao carregar tarefas:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTarefa = { titulo, descricao };

    fetch('http://localhost:8000/api/tarefas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaTarefa),
    })
      .then((res) => res.json())
      .then((data) => {
        setTarefas([data, ...tarefas]);
        setTitulo('');
        setDescricao('');
      })
      .catch((err) => console.error('Erro ao adicionar tarefa:', err));
  };

  const removerTarefa = (id) => {
    fetch(`http://localhost:8000/api/tarefas/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      })
      .catch((err) => console.error('Erro ao excluir tarefa:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 Minha Lista de Tarefas</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div>
          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              height: '80px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Adicionar Tarefa
        </button>
      </form>

      <h2>📋 Tarefas Cadastradas</h2>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                position: 'relative',
                color: 'black',
              }}
            >
              <button
                onClick={() => removerTarefa(tarefa.id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '16px',
                  color: '#dc3545',
                  cursor: 'pointer',
                }}
                title="Remover"
              >
                ❌
              </button>

              <strong>{tarefa.titulo}</strong>
              {tarefa.descricao && (
                <p style={{ color: 'black', margin: '5px 0' }}>
                  <em>{tarefa.descricao}</em>
                </p>
              )}
              <small style={{ color: '#6c757d' }}>
                Criado em: {new Date(tarefa.criado_em).toLocaleString('pt-BR')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
