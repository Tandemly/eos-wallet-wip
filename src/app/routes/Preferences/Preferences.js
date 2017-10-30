import * as React from "react";
import { Helmet } from 'react-helmet';
import Container from 'containers/Preferences';
import Profile from "containers/Profile";

const Preferences = () => (
  <div className="content">
    <Helmet>
      <title>Preferences</title>
    </Helmet>

    <div className="columns is-desktop is-variable">
      <div className="column is-half-desktop">
        <h2>Preferences</h2>
        <Container />
      </div>

      <div className="column is-half-desktop">
        <div className="hidden-md-down col-lg-6">
          <h5>Profile Preview</h5>

          <Profile
            name="Beth"
            currentLocation="Creve Coeur, MO"
            image={{ url: "https://avatarfiles.alphacoders.com/696/69632.jpg" }}
            status="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          />
        </div>
      </div>
    </div>
  </div>
);

export default Preferences;
