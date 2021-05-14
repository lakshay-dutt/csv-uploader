import { Fragment } from "react";
import CustomTable from "./components/CustomTable";
function App() {
  return (
    <Fragment>
      <div className="h-screen w-screen bg-gray-200 pt-20">
        <CustomTable />
      </div>
    </Fragment>
  );
}

export default App;
