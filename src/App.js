import { Fragment } from "react";
import CustomTable from "./components/CustomTable";
import DragNDrop from "./components/DragNDrop";
function App() {
  return (
    <Fragment>
      <div className="h-screen w-screen bg-gray-200 pt-20">
        <DragNDrop />
        <CustomTable />
      </div>
    </Fragment>
  );
}

export default App;
