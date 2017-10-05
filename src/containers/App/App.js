// @flow
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./App.scss";

const App = () => (
  <main>
    <Helmet titleTemplate="%s | EOS Wallet" defaultTitle="EOS Wallet" />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="columns is-mobile is-vcentered">
          <div className="column">
            <a href="/">
              <img alt="" className="logo" src="/images/logo.svg" />
            </a>
          </div>
          <div className="column">
            <div className="card">
              <div className="media">
                <div className="media-content has-text-right">
                  <p class="title is-4">Hi, Display Name</p>
                  <p class="subtitle is-6">Customize your profile | <span className="icon-settings"></span> | <span className="icon-logout"></span></p>
                </div>
                <div className="media-right">
                  <figure class="image is-48x48">
                    <img src="https://avatarfiles.alphacoders.com/696/69632.jpg" alt="Placeholder image" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="columns is-gapless is-fluid">
      <div className="column is-narrow">
        <section className="section">
          <aside class="menu">
            <div className="-is-logged-in">
              <h1 class="title is-1 balance">1.00m</h1>
              <h6 class="subtitle is-6 full_balance">1,000,000.0080</h6>
              <span class="tag is-primary is-medium change">+27,600</span>
              <ul class="menu-list">
                <li>
                  <a href="/"><span className="icon-transfer"></span>Transfer</a>
                </li>
                <li>
                  <a href="/transactions"><span className="icon-history"></span>Transaction History</a>
                </li>
                <li>
                  <a href="/permissions"><span className="icon-permissions"></span>Permission</a>
                </li>
                <li>
                  <a href="/"><span className="icon-logout"></span>Logout</a>
                </li>
              </ul>
            </div>
            <ul class="menu-list">
              <li>
                <a href="/users">Users</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </aside>
        </section>
      </div>
      <div className="column">
        <div className="menu-closer" role="button" tabindex="0" />
        <div className="columns is-gapless">
          <div className="column is-7">
            <section className="section">
              <h2 className="title is-2">Transfer</h2>
              <p>Move funds to another EOS account.</p>
              <form>
                <div className="field">
                  <label className="label" for="to">To</label>
                  <div className="control">
                    <input type="text" name="to" className="input" />
                  </div>
                </div>
                <div className="field">
                  <label className="label" for="amount">Amount</label>
                  <div className="control">
                    <input type="text" name="amount" className="input" />
                  </div>
                  <p class="help"><a>Use Full Balance</a></p>
                </div>
                <div className="field">
                  <label className="label" for="memo">Memo</label>
                  <div className="control">
                    <input type="text" name="memo" className="input" />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-primary">Submit</button>
                  </div>
                  <div class="control">
                    <button class="button is-secondary">Clear</button>
                  </div>
                </div>
              </form>
            </section>
            <section className="section">
              <h3 className="title is-3">Transaction History</h3>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-6">July, 25</p>
                  </div>
                  <div className="level-item">
                    <img className="image is-32x32" src="/images/male_2.jpg" />
                  </div>
                  <div className="level-item">
                    <p className="subtitle is-6"><a>Brian Dawson</a></p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="subtitle is-6">$10.00</p>
                  </div>
                  <div className="level-item">
                    <span className="icon-logout"></span>
                  </div>
                </div>
              </div>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-6">July, 25</p>
                  </div>
                  <div className="level-item">
                    <img className="image is-32x32" src="/images/male_2.jpg" />
                  </div>
                  <div className="level-item">
                    <p className="subtitle is-6"><a>Brian Dawson</a></p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="subtitle is-6">$10.00</p>
                  </div>
                  <div className="level-item">
                    <span className="icon-logout"></span>
                  </div>
                </div>
              </div>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-6">July, 25</p>
                  </div>
                  <div className="level-item">
                    <img className="image is-32x32" src="/images/male_2.jpg" />
                  </div>
                  <div className="level-item">
                    <p className="subtitle is-6"><a>Brian Dawson</a></p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="subtitle is-6">$10.00</p>
                  </div>
                  <div className="level-item">
                    <span className="icon-logout"></span>
                  </div>
                </div>
              </div>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-6">July, 25</p>
                  </div>
                  <div className="level-item">
                    <img className="image is-32x32" src="/images/male_2.jpg" />
                  </div>
                  <div className="level-item">
                    <p className="subtitle is-6"><a>Brian Dawson</a></p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="subtitle is-6">$10.00</p>
                  </div>
                  <div className="level-item">
                    <span className="icon-logout"></span>
                  </div>
                </div>
              </div>
              <div className="level box">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-6">July, 25</p>
                  </div>
                  <div className="level-item">
                    <img className="image is-32x32" src="/images/male_2.jpg" />
                  </div>
                  <div className="level-item">
                    <p className="subtitle is-6"><a>Brian Dawson</a></p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="subtitle is-6">$10.00</p>
                  </div>
                  <div className="level-item">
                    <span className="icon-logout"></span>
                  </div>
                </div>
              </div>
              <div class="control">
                <button class="button is-primary">View All</button>
              </div>
            </section>
          </div>
          <div className="column is-5">
            <section className="section">
              <h5 className="title is-5">What are EOS tokens?</h5>
              <div className="box">
                EOS tokens are ERC-20 compatible tokens distributed on the
                Ethereum blockchain pursuant to a related ERC-20 smart
                contract (the “EOS Tokens”).
              </div>
              <h5 className="title is-5">How can I use EOS tokens?</h5>
              <div className="box">
                block.one is building the EOS.IO Software but it will not
                configure and/or launch any public blockchain platform
                adopting the open source EOS.IO Software (the “EOS
                Platform”). Any launch of an EOS Platform will occur by
                members of the community unrelated to block.one. Third
                parties launching the EOS Platform may delete, modify or
                supplement the EOS.IO Software prior to, during or after
                launching the EOS Platform.
              </div>
            </section>
          </div>
        </div>
        <footer className="columns section">
          <div className="column is-half">
            <small>Copyright 2017 | All Rights Reserved</small>
          </div>
          <div className="column is-half has-text-right">
            <a href="/privacy">Privacy Policy</a>
            <span> | </span>
            <a href="/terms">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  </main>
);

export default App;
