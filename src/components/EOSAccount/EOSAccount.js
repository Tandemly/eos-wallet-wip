//@flow
import React from "react";
import Button from "components/Button";
import Notification from "components/Notification";
import type { KeyPair } from "../../redux-modules/eos-account/types";
import cx from "classnames";
import css from "./styles.module.scss";

type Props = {
  accountName: string,
  ownerKeys: KeyPair,
  activeKeys: KeyPair,
  onDisconnect: () => mixed,
  fakeIt: () => mixed
};

const EOSAccount = ({
  accountName,
  ownerKeys,
  activeKeys,
  onDisconnect,
  fakeIt
}: Props) => (
  <article>
    <h3>EOS</h3>
    <div className="box double">
      <div className="columns is-desktop">
        <div className="column">
          <Notification
            text="Your keys should be copied and stored offline for security"
            status="warn"
            unsetNotification={fakeIt}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Username:</label>
            <p className="tertitle">{accountName}</p>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className={cx("level", css.level)}>
            <div className={cx("level-left", css.level_left)}>
              <div className={cx("level-item", css.level_item)}>
                <div className="field">
                  <label className="label">Active Key (Public):</label>
                  <p className="tertitle">
                    {activeKeys && activeKeys.publicKey}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("level-right", css.level_right)}>
              <div className={cx("level-item", css.level_item)}>
                <Button
                  className="button is-small is-primary"
                  text="Copy Key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className={cx("level", css.level)}>
            <div className={cx("level-left", css.level_left)}>
              <div className={cx("level-item", css.level_item)}>
                <div className="field">
                  <label className="label">Active Key (Private):</label>
                  <p className="tertitle">
                    {activeKeys && activeKeys.privateKey}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("level-right", css.level_right)}>
              <div className={cx("level-item", css.level_item)}>
                <Button
                  className="button is-small is-primary"
                  text="Copy Key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className={cx("level", css.level)}>
            <div className={cx("level-left", css.level_left)}>
              <div className={cx("level-item", css.level_item)}>
                <div className="field">
                  <label className="label">Owner Key (Public):</label>
                  <p className="tertitle">{ownerKeys && ownerKeys.publicKey}</p>
                </div>
              </div>
            </div>
            <div className={cx("level-right", css.level_right)}>
              <div className={cx("level-item", css.level_item)}>
                <Button
                  className="button is-small is-primary"
                  text="Copy Key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className={cx("level", css.level)}>
            <div className={cx("level-left", css.level_left)}>
              <div className={cx("level-item", css.level_item)}>
                <div className="field">
                  <label className="label">Owner Key (Private):</label>
                  <p className="tertitle">
                    {ownerKeys && ownerKeys.privateKey}
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("level-right", css.level_right)}>
              <div className={cx("level-item", css.level_item)}>
                <Button
                  className="button is-small is-primary"
                  text="Copy Key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <div className="control">
              <Button
                className="button is-large is-primary is-outlined"
                onClick={onDisconnect}
                text="Disconnect"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

export default EOSAccount;
