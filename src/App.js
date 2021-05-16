import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getAll } from "./api";
import CustomTable from "./components/CustomTable";
import Upload from "./components/Upload";
import { fetchTable } from "./redux/helpers";
import { fetchLabels } from "./util";
function App({ table }) {
  useEffect(() => {
    getAll().then(({ data }) => {
      const labels = fetchLabels(data.items);
      fetchTable({ labels, items: data.items });
    });
  }, []);
  return (
    <Fragment>
      {table && table.labels && table.labels.length > 0 ? (
        <Fragment>
          <div className="h-screen w-screen bg-gray-200 pt-20">
            <CustomTable />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Upload />
        </Fragment>
      )}
    </Fragment>
  );
}

function mapStateToProps(state) {
  const { table = {} } = state;
  return { table };
}

export default connect(mapStateToProps, {})(App);
