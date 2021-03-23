/**
 * @description 依赖反转
 */

import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES, { Weapon, Warrior, ThrowableWeapon } from "./types";

@injectable()
class Katana implements Weapon {
  public hit(): string {
    return "cut!";
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw(): string {
    return "hit!";
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  // @inject(TYPES.Weapon) katana: Weapon,
  // @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  // 等于constructor的内容
  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }
  public fight(): string {
    return this._katana.hit();
  }
  public sneak(): string {
    return this._shuriken.throw();
  }
}

export { Ninja, Katana, Shuriken };
