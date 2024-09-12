import "./App.css";

function App() {

  return (
    <div className="page">
      <div className="page">
          <h1>GraphName</h1>
          <div className="tab-group">
            <button type="tab" >File</button>
            <button type="tab" >Edit</button>
            <button type="tab" >Analysis</button>
          </div>
      </div>
      <div className="row">
          <div className="button-group">
            <button type="button">Host</button>
            <button type="button">Router</button>
            <button type="button">Firewall</button>
            <button type="button">Edge</button>
          </div>
          <div className="workspace">
            <h3>Workspace</h3>
          </div>
          <div className="node-info">
            <h3>Node</h3>
          </div>
      </div>
    </div>
  );
}

export default App;
