import * as React from "react";

const Background = ({ className, children }) => (
  <div className={className} style={{ backgroundColor: "#434b54" }}>
    {children}
  </div>
);

export default Background;