import React from "react";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import 'antd/dist/antd.css';
import { Table } from 'antd';

const data1 = [
  {
    key: '1',
    email: 'joebruin@ucla.edu'
  },
  {
    key: '2',
    email: 'tracy@media.ucla.edu'
  },
  {
    key: '3',
    email: 'carbon@media.ucla.edu'
  }
];

export const CreateTable = (
  data,
  columns,
  deleteFunction,
  editFunction,
  sting,
  deleteString = "Delete",
  editString = "Edit",
  stingString = "Sting"
) => (
  <div>
    <Table
      dataSource={data1}
      columns={columns}
      onRow={(record) => (
        {onClick: () => {deleteFunction(record)}})} />
    <div>
      {deleteFunction || editFunction || sting ? (
        <div>
          {deleteFunction ? (
            <span
              className="delete"
              onClick={() =>
                deleteFunction(item["_id"]).then(() => {
                  if (window) {
                    window.location.reload();
                  }
                })
              }
            >
              {deleteString}
            </span>
          ) : null}
          {editFunction ? (
            <span className="edit" onClick={() => editFunction(item)}>
              {editString}
            </span>
          ) : null}
          {sting ? (
            <span className="sting" onClick={() => sting(item["_id"])}>
              {stingString}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  </div>
);

/*
<Table>
  <Thead>
    <Tr>
      {columns.map((x) => (
        <Th key={x}>{x}</Th>
      ))}
      {deleteFunction || editFunction ? <Th key="actions">actions</Th> : null}
    </Tr>
  </Thead>
  <Tbody>
    {data.map((item, index) => {
      return (
        <Tr key={index}>
          {columns.map((property) => {
            return (
              <Td key={`${property}-${item[property]}`}>
                {item[property] ? item[property] : "\u00A0"}
              </Td>
            );
          })}
          {deleteFunction || editFunction || sting ? (
            <Td className="deleteTableData" key={`delete-${index}`}>
              {deleteFunction ? (
                <span
                  className="delete"
                  onClick={() =>
                    deleteFunction(item["_id"]).then(() => {
                      if (window) {
                        window.location.reload();
                      }
                    })
                  }
                >
                  {deleteString}
                </span>
              ) : null}
              {editFunction ? (
                <span className="edit" onClick={() => editFunction(item)}>
                  {editString}
                </span>
              ) : null}
              {sting ? (
                <span className="sting" onClick={() => sting(item["_id"])}>
                  {stingString}
                </span>
              ) : null}
            </Td>
          ) : null}
        </Tr>
      );
    })}
  </Tbody>
</Table>
);
*/
