import * as React from "react";

const User = ({ icon, key, name = "", status, url }) => (
  <li className="level box user is-mobile" key={key}>
    <div className="level-left">
      <div className="level-item">
        <img
          className="user-thumb"
          src="/images/male_2.jpg"
          alt="Placeholder avatar thumbnail"
        />
      </div>
      <div className="level-item">
        <div>
          <p className="username">
            <a>{name}</a>
          </p>
          <p className="memo">Memo</p>
        </div>
      </div>
    </div>
  </li>
);

export default User;
