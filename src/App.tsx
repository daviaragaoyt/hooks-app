import { useState, useEffect, useReducer, useRef, useMemo, useCallback, createContext } from 'react';



function App() {

  // Criando Contexto
const TemaContext = createContext();

// Função Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Ação desconhecida');
  }
};
  const [tema, setTema] = useState('light');
  const [contador, setContador] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [dados, setDados] = useState([]);
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // useEffect para buscar dados simulados de uma API
  useEffect(() => {
    setTimeout(() => {
      setDados(['React', 'Hooks', 'useContext', 'useReducer']);
    }, 2000);
  }, []);

  // useMemo para calcular o dobro do contador
  const dobroContador = useMemo(() => {
    console.log('Calculando dobro...');
    return contador * 2;
  }, [contador]);

  // useCallback para evitar recriação de funções
  const incrementarContador = useCallback(() => {
    setContador((prev) => prev + 1);
  }, []);

  const alternarTema = () => {
    setTema((prevTema) => (prevTema === 'light' ? 'dark' : 'light'));
  };

  return (
    <TemaContext.Provider value={tema}>
      <div style={{ background: tema === 'light' ? '#fff' : '#333', color: tema === 'light' ? '#000' : '#fff', padding: '20px' }}>
        <h1>Explorando Hooks no React</h1>

        {/* useState */}
        <section>
          <h2>useState</h2>
          <p>Contador: {contador}</p>
          <button onClick={incrementarContador}>Incrementar</button>
        </section>

        {/* useReducer */}
        <section>
          <h2>useReducer</h2>
          <p>Contador Reducer: {state.count}</p>
          <button onClick={() => dispatch({ type: 'increment' })}>Incrementar</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>Decrementar</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Resetar</button>
        </section>

        {/* useContext */}
        <section>
          <h2>useContext</h2>
          <p>Tema atual: {tema}</p>
          <button onClick={alternarTema}>Alternar Tema</button>
        </section>

        {/* useEffect */}
        <section>
          <h2>useEffect</h2>
          <p>Dados da API Simulada:</p>
          {dados.length > 0 ? (
            <ul>
              {dados.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Carregando...</p>
          )}
        </section>

        {/* useRef */}
        <section>
          <h2>useRef</h2>
          <input ref={inputRef} type="text" placeholder="Digite algo..." />
          <button onClick={() => inputRef.current.focus()}>Focar no Input</button>
        </section>

        {/* useMemo */}
        <section>
          <h2>useMemo</h2>
          <p>Dobro do Contador: {dobroContador}</p>
        </section>

        {/* useCallback */}
        <section>
          <h2>useCallback</h2>
          <button onClick={incrementarContador}>Incrementar (Callback)</button>
        </section>
      </div>
    </TemaContext.Provider>
  );
}

export default App;
