import React from "react";
import ReactModal from "react-modal";
import ReactDataGrid from "react-data-grid";

import { useStateValue, useMetaColumn } from "../contexts/app_context";
import DebouncedTextField from "../utils/DebouncedTextField";

export default function ProjectModal({ match, history }) {
  const onClose = () => history.goBack();
  const { columnID } = match.params;

  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [delimiter, setDelimiter] = React.useState("");

  const { entries, metaColumn, dispatch } = useMetaColumn(columnID);

  React.useEffect(() => {
    if (metaColumn && metaColumn.columns && metaColumn.columns.length) {
      setColumns(["1"]);
      if (entries && entries.length) {
        setRows(entries.map((e) => ({ 1: e.name })));
      }
    }
  }, [metaColumn]);

  React.useEffect(() => {
    if (delimiter) {
      let newRows = [];
      let maxCols = 1;
      for (let i = 0; i < entries.length; i++) {
        let splitStr = entries[i].name.split(delimiter);
        maxCols = Math.max(maxCols, splitStr.length)
        newRows.push(splitStr)
      }
      setColumns([...Array(maxCols).keys()].map(i => i))
      setRows(newRows)
    } else {
        setColumns(["1"]);
      if (entries && entries.length) {
        setRows(entries.map((e) => ({ 1: e.name })));
      }
    }
  }, [delimiter]);

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="load-project-modal">
        Hello Warld
        <DebouncedTextField
          parentValue={delimiter}
          setParentValue={setDelimiter}
          inputParams={{
            placeholder: "Enter delimiter here...",
          }}
        />
        {entries && entries.length ? (
          <ReactDataGrid
            columns={columns.map((col) => ({ key: col, name: col }))}
            rowGetter={(i) => rows[i]}
            rowsCount={entries.length}
          />
        ) : null}
      </div>
    </ReactModal>
  );
}
