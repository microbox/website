How configuration module works?
===============================

### Basic logic
1. Application load `settings.yaml` for default values
2. Try to applying settings from `conf/${NODE_ENV}.yaml` (optional)
3. Try to applying settings from environment variables only if the item not found in `conf/${NODE_ENV}.yaml`
4. Make sure the item in `settings.yaml` always has a value, otherwise call `process.exit(0)`
5. Create `lib/config/env/${NODE_ENV}.js` instance using the `settings` object
6. Merge `lib/config/env/${NODE_ENV}.js` instance with `lib/config/base.js` instance created from the `settings` object
7. Got the `config` object

### Remark
- `settings` is static configuration load from file or system environment
- `config` is runtime configuration which may includes some helper functions

### Priorities

1. `lib/config/env/${NODE_ENV}.js`
2. `lib/config/base.js`
3. `conf/${NODE_ENV}.yaml`
4. `lib/config/settings.yaml`

