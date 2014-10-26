How configuration module works?
===============================

###
Copy `lib/config/settings.yaml` to `conf/development.yaml` and set `PORT`, `AZURE_STORAGE_KEY` and `AZURE_STORAGE_SECRET`

### Priority of Configuration

1. `lib/config/env/${NODE_ENV}.js`
2. `lib/config/base.js`
3. `conf/${NODE_ENV}.yaml`
4. `lib/config/settings.yaml`

### Basic logic
1. Application load `lib/config/settings.yaml` for default values
2. Try to applying settings from `conf/${NODE_ENV}.yaml` (optional)
3. Try to applying settings from environment variables only if the item not found in `conf/${NODE_ENV}.yaml`
4. Make sure the item in `settings.yaml` always has a value, otherwise call `process.exit(0)`
5. Create `lib/config/env/${NODE_ENV}.js` instance using the `settings` object
6. Merge `lib/config/env/${NODE_ENV}.js` instance with `lib/config/base.js` instance created from the `settings` object
7. Return the merged `config` object to use

### Remark
- `lib/config/settings.yaml` or `conf/${NODE_ENV}.yaml` is static configuration load from file or system environment
- `lib/config/base.js` or `lib/config/env/${NODE_ENV}.js` creates runtime configuration may includes some helper functions



