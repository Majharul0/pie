import "./App.css";
import DemoPie1 from "./donut1";
import DemoPie2 from "./donut2";
function App() {
  return (
    <>
      <div style={{display:'flex', width:'90vw', margin:'0 auto', gap:'100px'}}>
        <DemoPie1 />
        <DemoPie2 />
      </div>
    </>
  );
}

export default App;
