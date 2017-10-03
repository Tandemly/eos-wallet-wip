// @flow
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.scss";

const App = () => (
  <main className="app container-fluid p-0 row no-gutters d-flex closed">
    <Helmet titleTemplate="%s | EOS Wallet" defaultTitle="EOS Wallet" />
    <header className="header no-gutters p-0 p-md-3">
      <div className="d-flex justify-content-start items-center">
        <div
          className="mobile-nav mr-2 hidden-md-up"
          role="button"
          tabindex="0"
        >
          <span className="icon-eos_icons_menu" />
        </div>
        <a href="/">
          <img alt="" className="logo" src="/images/logo.svg" />
        </a>
        <div className="account-info">
          <div className="thumbnail">
            <a href="/preferences">
              <div className="settings icon-eos_icons_settings" />
            </a>
            <img
              alt=""
              className="user-thumbnail"
              src="https://avatarfiles.alphacoders.com/696/69632.jpg"
            />
          </div>
          <div className="meta hidden-sm-down">
            <p className="display-name">Bruce Wayne</p>
            <div>
              <a className="url" href="/preferences">
                Customize your profile
              </a>
              <span>
                <span className="divider px-2">|</span>
                <a className="logout" href="/logout">
                  <span className="icon icon-eos_icons_logout" />
                </a>
              </span>
            </div>
            <div>
              <i
                aria-label="Image"
                className="-icon-class"
                style={{ backgroundImage: "url(&quot;&quot;)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="flex-fill">
      <nav className="left-nav">
        <div className="-is-logged-in hidden-sm-down">
          <div className="account-info logged-in p-4">
            <div className="balance">1.00 m</div>
            <div
              className="full_balance"
              style={{ color: "rgb(67, 75, 84)", margin: "-0.2rem 0px 0.5rem" }}
            >
              1,000,000.0080
            </div>
            <div className="change" />
          </div>
          <ul className="-links">
            <li>
              <a
                className="col-link px-4 py-3 active"
                aria-current="true"
                href="/"
              >
                <span className="icon-eos_icons_transfer mr-2" />Transfer
              </a>
            </li>
            <li>
              <a
                className="col-link px-4 py-3"
                aria-current="false"
                href="/transactions"
              >
                <span className="icon-eos_icons_history mr-2" />Transaction
                History
              </a>
            </li>
            <li>
              <a
                className="col-link px-4 py-3"
                aria-current="false"
                href="/permissions"
              >
                <span className="icon-eos_icons_permissions mr-2" />Permissions
              </a>
            </li>
          </ul>
        </div>
        <ul className="navbar-links">
          <li>
            <a
              className="col-link px-4 py-3"
              aria-current="false"
              href="/users"
            >
              Users
            </a>
          </li>
          <li>
            <a
              className="col-link px-4 py-3"
              aria-current="false"
              href="/about"
            >
              About
            </a>
          </li>
          <li>
            <a className="col-link px-4 py-3" aria-current="false" href="/faq">
              FAQ
            </a>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="menu-closer" role="button" tabindex="0" />
        <div>
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h2>Transfer</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-7">
                <div className="section">
                  <p>Move funds to another EOS account.</p>
                  <form>
                    <fieldset className="form-group">
                      <label for="to">To</label>
                      <div className="input-prefix">
                        <input
                          type="text"
                          name="to"
                          value="initb"
                          aria-describedby="to"
                          className="form-control form-control-lg prefix"
                          id="to"
                        />
                      </div>
                    </fieldset>
                    <fieldset className="form-group">
                      <div>
                        <small className="form-text text-muted">
                          <a>Use Full Balance</a>
                        </small>
                        <label for="amount">Amount</label>
                        <input
                          type="text"
                          name="amount"
                          value="20"
                          aria-describedby="amount"
                          className="form-control form-control-lg"
                          id="amount"
                          pattern="^[0-9.]*$"
                          required=""
                        />
                      </div>
                    </fieldset>
                    <fieldset className="form-group">
                      <label for="memo">Memo</label>
                      <input
                        type="text"
                        name="memo"
                        value="test transaction 2"
                        aria-describedby="memo"
                        className="form-control form-control-lg"
                        id="memo"
                      />
                    </fieldset>
                    <div className="row col-12 no-gutters p-0">
                      <div className="col-sm-auto col-6 pl-0 pr-2">
                        <button
                          className="btn btn-primary btn-lg btn-block px-0 px-sm-5"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                      <div className="col-sm-auto col-6 pl-2 pr-0">
                        <button
                          className="btn btn-secondary btn-lg btn-block px-0 px-sm-5"
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="d-flex justify-content-between items-center">
                  <div>
                    <h3>Transaction History</h3>
                  </div>
                  <div>
                    <small className="form-text text-muted">
                      <a href="/transactions">View All</a>
                    </small>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="section">
                      <ul>
                        <li>
                          <div className="transaction d-flex flex-row">
                            <div className="transaction-meta d-flex flex-row items-center">
                              <div className="transaction-date">
                                <div className="date-month">Sep</div>
                                <div className="date-day">15</div>
                              </div>
                              <div className="transaction-thumbnail ml-3 hidden-md-down">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <div className="transaction-data ml-3">
                                <p className="transaction-sender mb-1">
                                  <a>inita</a>
                                </p>
                                <p className="transaction-memo mb-0">
                                  test transaction 2
                                </p>
                              </div>
                            </div>
                            <div className="transaction-amount-container d-flex flex-row-reverse items-center">
                              <div className="transaction-icon icon-eos_icons_transfer_to up">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage:
                                      "url(&quot;undefined&quot;)"
                                  }}
                                />
                              </div>
                              <p className="transaction-amount">20</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="transaction d-flex flex-row">
                            <div className="transaction-meta d-flex flex-row items-center">
                              <div className="transaction-date">
                                <div className="date-month">Sep</div>
                                <div className="date-day">15</div>
                              </div>
                              <div className="transaction-thumbnail ml-3 hidden-md-down">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <div className="transaction-data ml-3">
                                <p className="transaction-sender mb-1">
                                  <a>inita</a>
                                </p>
                                <p className="transaction-memo mb-0">
                                  test transaction 2
                                </p>
                              </div>
                            </div>
                            <div className="transaction-amount-container d-flex flex-row-reverse items-center">
                              <div className="transaction-icon icon-eos_icons_transfer_to up">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage:
                                      "url(&quot;undefined&quot;)"
                                  }}
                                />
                              </div>
                              <p className="transaction-amount">20</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="transaction d-flex flex-row">
                            <div className="transaction-meta d-flex flex-row items-center">
                              <div className="transaction-date">
                                <div className="date-month">Sep</div>
                                <div className="date-day">15</div>
                              </div>
                              <div className="transaction-thumbnail ml-3 hidden-md-down">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <div className="transaction-data ml-3">
                                <p className="transaction-sender mb-1">
                                  <a>inita</a>
                                </p>
                                <p className="transaction-memo mb-0">
                                  test transaction 2
                                </p>
                              </div>
                            </div>
                            <div className="transaction-amount-container d-flex flex-row-reverse items-center">
                              <div className="transaction-icon icon-eos_icons_transfer_to up">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage:
                                      "url(&quot;undefined&quot;)"
                                  }}
                                />
                              </div>
                              <p className="transaction-amount">20</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="transaction d-flex flex-row">
                            <div className="transaction-meta d-flex flex-row items-center">
                              <div className="transaction-date">
                                <div className="date-month">Sep</div>
                                <div className="date-day">15</div>
                              </div>
                              <div className="transaction-thumbnail ml-3 hidden-md-down">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <div className="transaction-data ml-3">
                                <p className="transaction-sender mb-1">
                                  <a>inita</a>
                                </p>
                                <p className="transaction-memo mb-0">
                                  test transaction 2
                                </p>
                              </div>
                            </div>
                            <div className="transaction-amount-container d-flex flex-row-reverse items-center">
                              <div className="transaction-icon icon-eos_icons_transfer_to up">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage:
                                      "url(&quot;undefined&quot;)"
                                  }}
                                />
                              </div>
                              <p className="transaction-amount">20</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="transaction d-flex flex-row">
                            <div className="transaction-meta d-flex flex-row items-center">
                              <div className="transaction-date">
                                <div className="date-month">Sep</div>
                                <div className="date-day">15</div>
                              </div>
                              <div className="transaction-thumbnail ml-3 hidden-md-down">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <div className="transaction-data ml-3">
                                <p className="transaction-sender mb-1">
                                  <a>inita</a>
                                </p>
                                <p className="transaction-memo mb-0">
                                  test transaction
                                </p>
                              </div>
                            </div>
                            <div className="transaction-amount-container d-flex flex-row-reverse items-center">
                              <div className="transaction-icon icon-eos_icons_transfer_to up">
                                <i
                                  aria-label="Image"
                                  className="-icon-class"
                                  style={{
                                    backgroundImage: "url(&quot;&quot;)"
                                  }}
                                />
                              </div>
                              <p className="transaction-amount">20</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <h5>What are EOS tokens?</h5>
                <div className="module p-4 mb-5">
                  <p>
                    EOS tokens are ERC-20 compatible tokens distributed on the
                    Ethereum blockchain pursuant to a related ERC-20 smart
                    contract (the “EOS Tokens”).
                  </p>
                </div>
                <h5>How can I use EOS tokens?</h5>
                <div className="module p-4">
                  <p>
                    block.one is building the EOS.IO Software but it will not
                    configure and/or launch any public blockchain platform
                    adopting the open source EOS.IO Software (the “EOS
                    Platform”). Any launch of an EOS Platform will occur by
                    members of the community unrelated to block.one. Third
                    parties launching the EOS Platform may delete, modify or
                    supplement the EOS.IO Software prior to, during or after
                    launching the EOS Platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="Nav row no-gutters items-center justify-content-center">
          <div className="col-md-6 text-center text-md-left">
            <small>Copyright 2017 | All Rights Reserved</small>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <a href="/privacy">Privacy Policy</a>
            <span> | </span>
            <a href="/terms">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  </main>
);

export default App;
