import container from "./inversify.config";
import TYPES, { Warrior } from "./types";
const ninja = container.get<Warrior>(TYPES.Warrior);

test("ioc demo test", () => {
  expect(ninja.fight()).toEqual("cut!"); // true
  expect(ninja.sneak()).toEqual("hit!"); // true
});
