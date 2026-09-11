import { format, ErrorsOptions } from '..';

const opts: ErrorsOptions = { stack: true, cause: true };
format.errors();
format.errors({});
format.errors({ stack: true });
format.errors({ cause: true });
format.errors(opts);

// @ts-expect-error stack must be a boolean
format.errors({ stack: 'yes' });

// @ts-expect-error unknown option
format.errors({ nope: true });
