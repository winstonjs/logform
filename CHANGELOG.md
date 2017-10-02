# CHANGELOG

### 1.2.1
**2017/10/01**

- [#3] Strip `info.splat` in `format.simple` to avoid double inclusion.

### 1.2.0
**2017/09/30**

- Transition from `info.raw` to `info[Symbol.for('message')]`.
- Finish `README.md` except for full list of all built-in formats.
- 100% coverage for everything except for `{ align, cli, padLevels }`.

### 1.1.0
**2017/09/29**

- [#2] Add baseline expected formats that were previously exposed as options to `common.log` in `winston@2.x` and below.
- [#2] Introduce `format.combine` to remove inconsistency in behavior between `format(fn0)` and `format(fn0, ...moreFns)`.
- [#2] `README.md` now covers all of the basics for `logform`.

### 1.0.0
**2017/09/26**

- Initial release.
