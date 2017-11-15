//@flow
/* global describe, it, expect */
import randomize from "randomatic";
import reducer, {
  initialState as reducerInitialState
} from "./balance-reducer";
import type { BalanceState, AccountBalance } from "./types";
import {
  tryGetBalance,
  succeedGetBalance,
  failGetBalance
} from "./balance-actions";

describe("EOS Balance Reducer", () => {
  it("should return the initial state if no state is provided", () => {
    const actualState = reducer(undefined, { type: "JUNK_ACTION" }); //$FlowFixMe

    expect(actualState).toEqual(reducerInitialState);
  });

  it("should set loading to true when the try get balance action is received", () => {
    const initialState: BalanceState = {
      loading: false,
      total: 0
    };

    const expectedState: BalanceState = {
      ...initialState,
      loading: true
    };

    const actualState: BalanceState = reducer(initialState, tryGetBalance());

    expect(actualState).toEqual(expectedState);
  });

  it("should set loading to false when the fail get balance action is received", () => {
    const initialState: BalanceState = {
      loading: true,
      total: 0
    };

    const expectedState: BalanceState = {
      ...initialState,
      loading: false
    };

    const actualState: BalanceState = reducer(initialState, failGetBalance());

    expect(actualState).toEqual(expectedState);
  });

  it("should update state appropriately when new balances are received", () => {
    const initialState: BalanceState = {
      loading: true,
      total: Math.random() * 100
    };

    const balances = {
      total: Math.random() * 100,
      staked: Math.random() * 100,
      unstaked: Math.random() * 100
    };

    const difference = balances.total - initialState.total;

    const expectedState: BalanceState = {
      ...initialState,
      ...balances,
      loading: false,
      difference,
      symbol: difference === 0 ? "" : difference >= 0 ? "+" : "-"
    };

    const actualState: BalanceState = reducer(
      initialState,
      succeedGetBalance(balances)
    );

    expect(actualState).toEqual(expectedState);
  });
});
