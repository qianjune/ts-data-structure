/**
 * @description 点赞 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { ShopModel, User } from "@src/db/models";
export enum LikeItemType {
  NOTE = "note",
}
enum LikeStatus {
  DISABLE = 1,
  ABLE = 0,
}
class Like extends Model {
  // custom property here
}

Like.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    uid: {
      type: TYPES.INTEGER,
      comment: "用户id",
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    type: {
      type: TYPES.STRING,
      comment: "收藏的类型",
      allowNull: false,
    },
    likeId: {
      type: TYPES.INTEGER,
      comment: "收藏的id",
      allowNull: false,
    },
    disabled: {
      type: TYPES.INTEGER,
      comment:
        "是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐",
      defaultValue: LikeStatus.ABLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "likeDb",
  }
);

Like.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Like;
