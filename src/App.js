const App = ({ login = false }) => {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        {login ? <h2>LOGIN</h2> : <h2> N LOGIN</h2>}
      </nav>
    </div>
  );
};

export default App;
