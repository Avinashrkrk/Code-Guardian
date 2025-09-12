import * as users from './users';
import * as accounts from './accounts';
import * as repositories from './repositories';
import * as reviewJobs from './reviewJobs';
import * as relations from './relations';

// This single object is what you'll import when you need to use your schema.
const schema = {
  ...users,
  ...accounts,
  ...repositories,
  ...reviewJobs,
  ...relations,
};

export default schema;