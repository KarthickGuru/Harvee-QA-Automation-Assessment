
export const users = {
  standard: process.env.STANDARD_USER || 'standard_user',
  locked: process.env.LOCKED_USER || 'locked_out_user',
  password: process.env.TEST_PASSWORD || 'secret_sauce',
  invalidpassword: process.env.WRONG123 || 'wrong123'
};
