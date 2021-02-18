export const passwordRuleCheck = (text: string): boolean => {
  const rule = /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
  return rule.test(text);
};
