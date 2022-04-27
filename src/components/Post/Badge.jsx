import React from 'react';

function Badge (props) {
  return (
    <div className="badge" style={{
      display: "inline-block",
      padding: "0.25em 0.4em",
      fontSize: "75%",
      fontWeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whitespace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: "0.25rem",
      backgroundColor: "#f8a81f",
      color: "#fff",
    }}>
      <p>{props.text}</p>
    </div>
  )
}
export default React.memo(Badge);