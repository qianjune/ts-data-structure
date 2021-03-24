import { asValue, createContainer } from "awilix";

const container = createContainer();
container.register({
  CONFIG: asValue(global.config),
});
