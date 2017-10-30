import * as React from "react";
import { connect } from 'react-redux';
import Users from "components/Users";

const Container = connect()(Users);

export default Container;
