import * as React from "react";
import { Helmet } from 'react-helmet';

const NoMatch = () => (
  <div>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <div className="container-full">
      <div>
        <div>
          <h2>Page not found!</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          The page you are looking for is not found
        </div>
      </div>
    </div>
  </div>
);

export default NoMatch;
