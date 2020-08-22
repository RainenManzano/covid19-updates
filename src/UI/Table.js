import React from "react";

const Table = (props) => {
  return (
    <table id={props.id} className={props.tableClass}>
      <thead>
        <tr>
          {props.headings.map((heading, i) => {
            return <th key={i}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((td, i) => {
                return (
                  <td className={td.tdClass} key={i}>
                    {td.data}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
