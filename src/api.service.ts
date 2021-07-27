import { Countries, Partners } from "./models";
import { input } from "./test-input";

// TODO Configure local server
export const getPartners = (): Promise<{ partners: Partners[] }> => {
  return new Promise((resolve) => resolve(input));
};

export const postCountries = (body: Countries[]) => {
  console.log(body);
};
