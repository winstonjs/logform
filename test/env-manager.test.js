/* eslint-disable no-process-env */
'use strict';

const assume = require('assume');
const { EnvManager } = require('../env-manager');

describe('EnvManager', () => {
  it('should disable color if NO_COLOR is set to a truthy value', () => {
    process.env.NO_COLOR = '1';
    const envManager = new EnvManager();
    assume(envManager.isColorDisabled).to.be.true;
    delete process.env.NO_COLOR;
  });

  it('should not disable color if NO_COLOR is set to "0"', () => {
    process.env.NO_COLOR = '0';
    const envManager = new EnvManager();
    assume(envManager.isColorDisabled).to.be.false;
    delete process.env.NO_COLOR;
  });

  it('should not disable color if NO_COLOR is set to "false"', () => {
    process.env.NO_COLOR = 'false';
    const envManager = new EnvManager();
    assume(envManager.isColorDisabled).to.be.false;
    delete process.env.NO_COLOR;
  });

  it('should not disable color if NO_COLOR is not set', () => {
    delete process.env.NO_COLOR;
    const envManager = new EnvManager();
    assume(envManager.isColorDisabled).to.be.false;
  });

  it('should use the disableColor option if provided', () => {
    const envManager = new EnvManager({ disableColor: true });
    assume(envManager.isColorDisabled).to.be.true;
  });

  it('should override the disableColor option with NO_COLOR environment variable', () => {
    process.env.NO_COLOR = '0';
    const envManager = new EnvManager({ disableColor: true });
    assume(envManager.isColorDisabled).to.be.false;
    delete process.env.NO_COLOR;
  });
});
