import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { MenuButton } from "../../controls/MenuButton/MenuButton.jsx";
import styles from "./PropertyTable.module.css";

const onPageRows = 4;
const photoHeight = 130;
const rowHeight = 135;
const widthInTable = 95;

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return (
        <Avatar
          alt="first image"
          src={params.value}
          sx={{ width: 150, height: photoHeight }}
          variant="square"
        />
      );
    },
  },
  { field: "id", headerName: "ID", width: widthInTable },
  { field: "location", headerName: "Location", width: 150 },
  { field: "type", headerName: "Type", width: widthInTable },
  { field: "mode", headerName: "Mode", width: widthInTable },
  { field: "price", headerName: "Price", type: "number", width: widthInTable },
  { field: "area", headerName: "Area", type: "number", width: widthInTable },
  {
    field: "bedrooms",
    headerName: "Bedrooms",
    type: "number",
    width: widthInTable,
  },
  {
    field: "bathrooms",
    headerName: "Bathrooms",
    type: "number",
    width: widthInTable,
  },
];

class PropertyTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <MenuButton text="Create property" href="/admin/properties/new" />
        <DataGrid
          rowHeight={rowHeight}
          autoHeight
          rows={this.props.adminProperties}
          columns={columns}
          pageSize={onPageRows}
          rowsPerPageOptions={[onPageRows]}
          onRowClick={(e) => (window.location = `/admin/properties/${e.id}`)}
        />
      </div>
    );
  }
}

export { PropertyTable };
