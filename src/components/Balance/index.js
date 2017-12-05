import Balance from "./Balance";
import {withCurrentEOSBalance } from '../../containers/balance';

export const CurrentEOSBalance = withCurrentEOSBalance(Balance);

export default Balance;
