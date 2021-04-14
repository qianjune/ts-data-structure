/*
 Navicat Premium Data Transfer

 Source Server         : aliyun_mysql
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 121.43.158.38:3311
 Source Schema         : jblog

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 14/04/2021 17:51:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for BrowseRecord
-- ----------------------------
DROP TABLE IF EXISTS `BrowseRecord`;
CREATE TABLE `BrowseRecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `shop_id` int(11) DEFAULT NULL COMMENT '店铺id',
  `product_id` int(11) DEFAULT NULL COMMENT '商品id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `disabled` int(11) NOT NULL DEFAULT '0' COMMENT '是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of BrowseRecord
-- ----------------------------
BEGIN;
INSERT INTO `BrowseRecord` VALUES (1, 5, 1, NULL, '2021-01-05 15:36:53', '2021-01-05 15:36:53', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for FavoritesDb
-- ----------------------------
DROP TABLE IF EXISTS `FavoritesDb`;
CREATE TABLE `FavoritesDb` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收藏的类型',
  `like_id` int(11) NOT NULL COMMENT '收藏的id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `disabled` int(11) NOT NULL DEFAULT '0' COMMENT '是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐',
  PRIMARY KEY (`id`),
  KEY `like_id` (`like_id`),
  KEY `uid` (`uid`),
  CONSTRAINT `FavoritesDb_ibfk_105` FOREIGN KEY (`like_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FavoritesDb_ibfk_58` FOREIGN KEY (`uid`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FavoritesDb_ibfk_581` FOREIGN KEY (`like_id`) REFERENCES `note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FavoritesDb_ibfk_582` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of FavoritesDb
-- ----------------------------
BEGIN;
INSERT INTO `FavoritesDb` VALUES (1, 'shop', 2, '2021-01-05 17:17:04', '2021-01-07 14:24:56', NULL, 5, 0);
INSERT INTO `FavoritesDb` VALUES (3, 'note', 1, '2021-03-19 15:16:22', '2021-03-19 15:16:22', NULL, 5, 0);
COMMIT;

-- ----------------------------
-- Table structure for IndexCarouselDb
-- ----------------------------
DROP TABLE IF EXISTS `IndexCarouselDb`;
CREATE TABLE `IndexCarouselDb` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '轮播图',
  `to` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '跳转地址',
  `status` int(11) DEFAULT '0' COMMENT '启用状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `weights` int(11) DEFAULT '0' COMMENT '排序权重',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of IndexCarouselDb
-- ----------------------------
BEGIN;
INSERT INTO `IndexCarouselDb` VALUES (1, 'http://qiniu.miaolingfei.top/06514f20-f985-11ea-97f5-99ebdcfbfaa8.png', '/1', 0, '2020-09-18 16:00:37', '2020-09-18 16:00:37', NULL, 0);
INSERT INTO `IndexCarouselDb` VALUES (2, 'http://qiniu.miaolingfei.top/e9833a00-fcab-11ea-8125-9b3b7e38d015.jpg', '/2', 0, '2020-09-22 16:16:33', '2020-09-22 16:16:33', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for IndexConfigDb
-- ----------------------------
DROP TABLE IF EXISTS `IndexConfigDb`;
CREATE TABLE `IndexConfigDb` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `shop_id` int(11) DEFAULT NULL COMMENT '店铺id',
  `data` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置数据',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '首页配置的名字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of IndexConfigDb
-- ----------------------------
BEGIN;
INSERT INTO `IndexConfigDb` VALUES (15, NULL, '[{\"key\":\"34f4f610-3b7a-11eb-a945-f3eeec5b760c\",\"data\":[{\"data\":5}],\"type\":\"goods\"}]', '2020-12-11 14:29:34', '2020-12-11 14:29:34', NULL, '默认1607668174390');
INSERT INTO `IndexConfigDb` VALUES (16, NULL, '[{\"key\":\"cc658f80-3b81-11eb-9351-6b74c86ec82f\",\"data\":[{\"id\":5,\"name\":\"奶瓶\",\"mainImage\":\"http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg\"},{\"id\":4,\"name\":\"kfc-1\",\"mainImage\":\"http://qiniu.miaolingfei.top/7b5ae370-fd4b-11ea-8e60-09114d7f7380.jpeg\"},{\"id\":3,\"name\":\"鸡肉套装\",\"mainImage\":\"http://qiniu.miaolingfei.top/98d40700-f310-11ea-a35b-d1aa94dcb437.png\"}],\"type\":\"goods\"}]', '2020-12-11 16:03:48', '2020-12-11 16:03:48', NULL, '默认1607673828154');
INSERT INTO `IndexConfigDb` VALUES (17, NULL, '[{\"key\":\"a270ec50-3dd5-11eb-bc47-1118e1d977e8\",\"data\":[{\"key\":\"aa0e62d0-3dd5-11eb-bc47-1118e1d977e8\",\"pic\":\"http://qiniu.miaolingfei.top/bf6de1f0-3dd5-11eb-bc47-1118e1d977e8.png\",\"url\":\"https://www.baidu.com\"},{\"key\":\"c0edcb30-3dd5-11eb-bc47-1118e1d977e8\",\"pic\":\"http://qiniu.miaolingfei.top/c60225d0-3dd5-11eb-bc47-1118e1d977e8.png\",\"url\":\"/test-1\"},{\"key\":\"c197ede0-3dd5-11eb-bc47-1118e1d977e8\",\"pic\":\"http://qiniu.miaolingfei.top/cab4ff80-3dd5-11eb-bc47-1118e1d977e8.png\",\"url\":\"/test-1/1\"}],\"type\":\"multi-pic\"},{\"key\":\"ab3a86c0-3dd5-11eb-bc47-1118e1d977e8\",\"data\":[{\"key\":\"aca7f970-3dd5-11eb-bc47-1118e1d977e8\",\"pic\":\"http://qiniu.miaolingfei.top/b2fb8ad0-3dd5-11eb-bc47-1118e1d977e8.jpeg\",\"url\":\"/test-2\"}],\"type\":\"single-pic\"},{\"key\":\"d97f2950-3dd5-11eb-bc47-1118e1d977e8\",\"data\":[{\"id\":3,\"name\":\"鸡肉套装\",\"mainImage\":\"http://qiniu.miaolingfei.top/98d40700-f310-11ea-a35b-d1aa94dcb437.png\"},{\"id\":1,\"name\":\"test-goods-1\",\"mainImage\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"id\":4,\"name\":\"kfc-1\",\"mainImage\":\"http://qiniu.miaolingfei.top/7b5ae370-fd4b-11ea-8e60-09114d7f7380.jpeg\"},{\"id\":5,\"name\":\"奶瓶\",\"mainImage\":\"http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg\"},{\"id\":2,\"name\":\"蛋白质护肤水\",\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}],\"type\":\"goods\"}]', '2020-12-14 14:30:56', '2020-12-14 14:30:56', NULL, '默认1607927456587');
INSERT INTO `IndexConfigDb` VALUES (18, NULL, '[{\"key\":\"4b96d7a0-4109-11eb-b2be-bb44995a61a9\",\"data\":[{\"key\":\"4d9518a0-4109-11eb-b2be-bb44995a61a9\",\"pic\":\"http://qiniu.miaolingfei.top/06514f20-f985-11ea-97f5-99ebdcfbfaa8.png\",\"url\":\"test图片选择\"}],\"type\":\"single-pic\"}]', '2020-12-18 16:16:44', '2020-12-18 16:16:44', NULL, '默认1608279404384');
COMMIT;

-- ----------------------------
-- Table structure for IndexThemeDb
-- ----------------------------
DROP TABLE IF EXISTS `IndexThemeDb`;
CREATE TABLE `IndexThemeDb` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图标',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键id',
  `goods` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '商品组',
  `status` int(11) DEFAULT '0' COMMENT '启用状态',
  `weights` int(11) DEFAULT '0' COMMENT '排序权重',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of IndexThemeDb
-- ----------------------------
BEGIN;
INSERT INTO `IndexThemeDb` VALUES (1, '精选好物', NULL, 'A', '1,2,3,4,5,1,2,3', 0, 0, '2020-09-18 17:29:58', '2020-09-18 17:29:58', NULL);
COMMIT;

-- ----------------------------
-- Table structure for LevelGroup
-- ----------------------------
DROP TABLE IF EXISTS `LevelGroup`;
CREATE TABLE `LevelGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '等级组名字',
  `level_group` text COLLATE utf8mb4_general_ci COMMENT '等级数组',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of LevelGroup
-- ----------------------------
BEGIN;
INSERT INTO `LevelGroup` VALUES (8, '奖牌型等级', NULL, '2021-01-26 14:31:59', '2021-01-26 14:31:59', NULL);
COMMIT;

-- ----------------------------
-- Table structure for action
-- ----------------------------
DROP TABLE IF EXISTS `action`;
CREATE TABLE `action` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `page_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '页面路径',
  `key` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '行为的识别key',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of action
-- ----------------------------
BEGIN;
INSERT INTO `action` VALUES (1, '2021-04-06 09:54:30', '2021-04-06 09:54:30', NULL, '', '', 0);
INSERT INTO `action` VALUES (2, '2021-04-06 10:22:00', '2021-04-06 10:22:00', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (3, '2021-04-06 10:24:41', '2021-04-06 10:24:41', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (4, '2021-04-06 10:24:43', '2021-04-06 10:24:43', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (5, '2021-04-06 10:24:48', '2021-04-06 10:24:48', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (6, '2021-04-06 10:25:09', '2021-04-06 10:25:09', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (7, '2021-04-06 10:25:12', '2021-04-06 10:25:12', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (8, '2021-04-06 10:25:24', '2021-04-06 10:25:24', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (9, '2021-04-06 10:25:52', '2021-04-06 10:25:52', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (10, '2021-04-06 10:25:53', '2021-04-06 10:25:53', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (11, '2021-04-06 10:25:53', '2021-04-06 10:25:53', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (12, '2021-04-06 10:26:04', '2021-04-06 10:26:04', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (13, '2021-04-06 10:26:05', '2021-04-06 10:26:05', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (14, '2021-04-06 10:26:05', '2021-04-06 10:26:05', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (15, '2021-04-06 10:31:11', '2021-04-06 10:31:11', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (16, '2021-04-06 10:31:11', '2021-04-06 10:31:11', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (17, '2021-04-06 10:31:12', '2021-04-06 10:31:12', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (18, '2021-04-06 10:50:17', '2021-04-06 10:50:17', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (19, '2021-04-06 10:50:18', '2021-04-06 10:50:18', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (20, '2021-04-06 10:50:19', '2021-04-06 10:50:19', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (21, '2021-04-06 11:04:33', '2021-04-06 11:04:33', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (22, '2021-04-06 11:06:33', '2021-04-06 11:06:33', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (23, '2021-04-06 11:10:08', '2021-04-06 11:10:08', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (24, '2021-04-06 11:10:40', '2021-04-06 11:10:40', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (25, '2021-04-06 13:43:58', '2021-04-06 13:43:58', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (26, '2021-04-06 14:06:49', '2021-04-06 14:06:49', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (27, '2021-04-06 14:27:56', '2021-04-06 14:27:56', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (28, '2021-04-06 14:28:20', '2021-04-06 14:28:20', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (29, '2021-04-06 14:28:52', '2021-04-06 14:28:52', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (30, '2021-04-06 14:29:19', '2021-04-06 14:29:19', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (31, '2021-04-06 14:30:08', '2021-04-06 14:30:08', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (32, '2021-04-06 14:33:01', '2021-04-06 14:33:01', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (33, '2021-04-06 14:34:08', '2021-04-06 14:34:08', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (34, '2021-04-06 14:34:22', '2021-04-06 14:34:22', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (35, '2021-04-06 14:35:05', '2021-04-06 14:35:05', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (36, '2021-04-06 14:35:12', '2021-04-06 14:35:12', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (37, '2021-04-06 14:35:40', '2021-04-06 14:35:40', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (38, '2021-04-06 14:37:51', '2021-04-06 14:37:51', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (39, '2021-04-06 14:38:39', '2021-04-06 14:38:39', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (40, '2021-04-06 14:40:50', '2021-04-06 14:40:50', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (41, '2021-04-06 14:42:51', '2021-04-06 14:42:51', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (42, '2021-04-06 14:44:21', '2021-04-06 14:44:21', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (43, '2021-04-06 14:57:54', '2021-04-06 14:57:54', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (44, '2021-04-06 15:11:31', '2021-04-06 15:11:31', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (45, '2021-04-06 15:12:02', '2021-04-06 15:12:02', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (46, '2021-04-06 15:12:15', '2021-04-06 15:12:15', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (47, '2021-04-06 15:14:33', '2021-04-06 15:14:33', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (48, '2021-04-06 15:14:50', '2021-04-06 15:14:50', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (49, '2021-04-06 15:14:50', '2021-04-06 15:14:50', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (50, '2021-04-06 15:14:56', '2021-04-06 15:14:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (51, '2021-04-06 15:18:51', '2021-04-06 15:18:51', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (52, '2021-04-06 15:19:04', '2021-04-06 15:19:04', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (53, '2021-04-06 15:21:56', '2021-04-06 15:21:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (54, '2021-04-06 15:22:11', '2021-04-06 15:22:11', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (55, '2021-04-06 15:22:33', '2021-04-06 15:22:33', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (56, '2021-04-06 15:22:33', '2021-04-06 15:22:33', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (57, '2021-04-06 15:23:06', '2021-04-06 15:23:06', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (58, '2021-04-06 15:23:11', '2021-04-06 15:23:11', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (59, '2021-04-06 15:23:11', '2021-04-06 15:23:11', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (60, '2021-04-06 15:23:13', '2021-04-06 15:23:13', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (61, '2021-04-06 15:23:14', '2021-04-06 15:23:14', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (62, '2021-04-06 15:23:15', '2021-04-06 15:23:15', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (63, '2021-04-06 15:23:17', '2021-04-06 15:23:17', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (64, '2021-04-06 15:23:32', '2021-04-06 15:23:32', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (65, '2021-04-06 15:24:05', '2021-04-06 15:24:05', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (66, '2021-04-06 15:24:08', '2021-04-06 15:24:08', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (67, '2021-04-06 15:24:09', '2021-04-06 15:24:09', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (68, '2021-04-06 15:24:44', '2021-04-06 15:24:44', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (69, '2021-04-06 15:24:55', '2021-04-06 15:24:55', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (70, '2021-04-06 15:24:56', '2021-04-06 15:24:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (71, '2021-04-06 15:26:28', '2021-04-06 15:26:28', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (72, '2021-04-06 15:30:35', '2021-04-06 15:30:35', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (73, '2021-04-06 15:33:56', '2021-04-06 15:33:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (74, '2021-04-06 15:35:52', '2021-04-06 15:35:52', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (75, '2021-04-06 15:35:52', '2021-04-06 15:35:52', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (76, '2021-04-06 15:44:57', '2021-04-06 15:44:57', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (77, '2021-04-06 15:45:00', '2021-04-06 15:45:00', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (78, '2021-04-06 15:45:01', '2021-04-06 15:45:01', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (79, '2021-04-06 15:45:08', '2021-04-06 15:45:08', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (80, '2021-04-06 15:45:13', '2021-04-06 15:45:13', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (81, '2021-04-06 15:45:13', '2021-04-06 15:45:13', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (82, '2021-04-06 15:45:23', '2021-04-06 15:45:23', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (83, '2021-04-06 15:45:58', '2021-04-06 15:45:58', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (84, '2021-04-06 15:46:06', '2021-04-06 15:46:06', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (85, '2021-04-06 15:46:08', '2021-04-06 15:46:08', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (86, '2021-04-06 15:46:08', '2021-04-06 15:46:08', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (87, '2021-04-06 15:46:13', '2021-04-06 15:46:13', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (88, '2021-04-06 15:46:14', '2021-04-06 15:46:14', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (89, '2021-04-06 15:46:14', '2021-04-06 15:46:14', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (90, '2021-04-06 15:49:33', '2021-04-06 15:49:33', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (91, '2021-04-06 15:55:19', '2021-04-06 15:55:19', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (92, '2021-04-06 15:55:42', '2021-04-06 15:55:42', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (93, '2021-04-06 15:57:56', '2021-04-06 15:57:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (94, '2021-04-06 15:58:51', '2021-04-06 15:58:51', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (95, '2021-04-06 15:59:42', '2021-04-06 15:59:42', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (96, '2021-04-06 15:59:50', '2021-04-06 15:59:50', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (97, '2021-04-06 16:07:26', '2021-04-06 16:07:26', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (98, '2021-04-06 16:07:49', '2021-04-06 16:07:49', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (99, '2021-04-06 16:08:15', '2021-04-06 16:08:15', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (100, '2021-04-06 16:08:18', '2021-04-06 16:08:18', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (101, '2021-04-06 16:08:29', '2021-04-06 16:08:29', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (102, '2021-04-06 16:11:34', '2021-04-06 16:11:34', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (103, '2021-04-06 16:15:12', '2021-04-06 16:15:12', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (104, '2021-04-06 16:15:40', '2021-04-06 16:15:40', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (105, '2021-04-06 16:16:09', '2021-04-06 16:16:09', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (106, '2021-04-06 16:16:19', '2021-04-06 16:16:19', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (107, '2021-04-06 16:16:39', '2021-04-06 16:16:39', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (108, '2021-04-06 16:16:49', '2021-04-06 16:16:49', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (109, '2021-04-06 16:18:28', '2021-04-06 16:18:28', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (110, '2021-04-06 16:18:31', '2021-04-06 16:18:31', NULL, 'pages/order-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (111, '2021-04-06 16:18:31', '2021-04-06 16:18:31', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (112, '2021-04-06 16:18:38', '2021-04-06 16:18:38', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (113, '2021-04-06 16:21:53', '2021-04-06 16:21:53', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (114, '2021-04-06 16:26:23', '2021-04-06 16:26:23', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (115, '2021-04-07 09:22:12', '2021-04-07 09:22:12', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (116, '2021-04-07 09:22:15', '2021-04-07 09:22:15', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (117, '2021-04-07 09:22:15', '2021-04-07 09:22:15', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (118, '2021-04-07 09:22:17', '2021-04-07 09:22:17', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (119, '2021-04-08 15:39:29', '2021-04-08 15:39:29', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (120, '2021-04-08 15:39:30', '2021-04-08 15:39:30', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (121, '2021-04-08 15:39:30', '2021-04-08 15:39:30', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (122, '2021-04-08 15:40:02', '2021-04-08 15:40:02', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (123, '2021-04-08 15:40:03', '2021-04-08 15:40:03', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (124, '2021-04-08 15:40:03', '2021-04-08 15:40:03', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (125, '2021-04-08 15:40:36', '2021-04-08 15:40:36', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (126, '2021-04-08 15:40:39', '2021-04-08 15:40:39', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (127, '2021-04-08 15:40:39', '2021-04-08 15:40:39', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (128, '2021-04-08 15:40:44', '2021-04-08 15:40:44', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (129, '2021-04-08 15:40:44', '2021-04-08 15:40:44', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (130, '2021-04-08 15:40:45', '2021-04-08 15:40:45', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (131, '2021-04-08 15:42:59', '2021-04-08 15:42:59', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (132, '2021-04-08 15:43:00', '2021-04-08 15:43:00', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (133, '2021-04-08 15:43:00', '2021-04-08 15:43:00', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (134, '2021-04-08 15:44:06', '2021-04-08 15:44:06', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (135, '2021-04-08 15:44:08', '2021-04-08 15:44:08', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (136, '2021-04-08 15:44:08', '2021-04-08 15:44:08', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (137, '2021-04-08 15:44:27', '2021-04-08 15:44:27', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (138, '2021-04-08 15:44:28', '2021-04-08 15:44:28', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (139, '2021-04-08 15:44:28', '2021-04-08 15:44:28', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (140, '2021-04-08 15:44:49', '2021-04-08 15:44:49', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (141, '2021-04-08 15:44:50', '2021-04-08 15:44:50', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (142, '2021-04-08 15:44:50', '2021-04-08 15:44:50', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (143, '2021-04-08 15:44:59', '2021-04-08 15:44:59', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (144, '2021-04-08 15:45:00', '2021-04-08 15:45:00', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (145, '2021-04-08 15:45:00', '2021-04-08 15:45:00', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (146, '2021-04-08 15:45:09', '2021-04-08 15:45:09', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (147, '2021-04-08 15:45:11', '2021-04-08 15:45:11', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (148, '2021-04-08 15:45:12', '2021-04-08 15:45:12', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (149, '2021-04-08 15:45:13', '2021-04-08 15:45:13', NULL, 'pages/login-mini/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (150, '2021-04-08 15:45:14', '2021-04-08 15:45:14', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (151, '2021-04-08 15:45:14', '2021-04-08 15:45:14', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (152, '2021-04-08 15:47:35', '2021-04-08 15:47:35', NULL, 'pages/login-mini/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (153, '2021-04-08 15:49:00', '2021-04-08 15:49:00', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (154, '2021-04-08 15:49:03', '2021-04-08 15:49:03', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (155, '2021-04-08 15:49:03', '2021-04-08 15:49:03', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (156, '2021-04-08 15:49:13', '2021-04-08 15:49:13', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (157, '2021-04-08 15:49:14', '2021-04-08 15:49:14', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (158, '2021-04-08 15:49:14', '2021-04-08 15:49:14', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (159, '2021-04-08 15:49:46', '2021-04-08 15:49:46', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (160, '2021-04-08 15:50:01', '2021-04-08 15:50:01', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (161, '2021-04-08 15:50:20', '2021-04-08 15:50:20', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (162, '2021-04-08 15:50:24', '2021-04-08 15:50:24', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (163, '2021-04-08 15:50:24', '2021-04-08 15:50:24', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (164, '2021-04-08 15:50:48', '2021-04-08 15:50:48', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (165, '2021-04-08 15:50:51', '2021-04-08 15:50:51', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (166, '2021-04-08 15:50:51', '2021-04-08 15:50:51', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (167, '2021-04-08 15:50:53', '2021-04-08 15:50:53', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (168, '2021-04-08 15:50:53', '2021-04-08 15:50:53', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (169, '2021-04-08 15:51:28', '2021-04-08 15:51:28', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (170, '2021-04-08 15:52:39', '2021-04-08 15:52:39', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (171, '2021-04-08 15:52:39', '2021-04-08 15:52:39', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (172, '2021-04-08 15:52:41', '2021-04-08 15:52:41', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (173, '2021-04-08 15:52:45', '2021-04-08 15:52:45', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (174, '2021-04-08 15:52:46', '2021-04-08 15:52:46', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (175, '2021-04-08 15:52:47', '2021-04-08 15:52:47', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (176, '2021-04-08 15:52:50', '2021-04-08 15:52:50', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (177, '2021-04-08 15:52:52', '2021-04-08 15:52:52', NULL, 'pages/mine-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (178, '2021-04-08 15:52:52', '2021-04-08 15:52:52', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (179, '2021-04-08 15:52:53', '2021-04-08 15:52:53', NULL, 'pages/note-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (180, '2021-04-08 15:52:53', '2021-04-08 15:52:53', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (181, '2021-04-08 15:52:56', '2021-04-08 15:52:56', NULL, 'pages/note-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (182, '2021-04-08 16:27:28', '2021-04-08 16:27:28', NULL, 'pages/mine-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (183, '2021-04-08 16:27:48', '2021-04-08 16:27:48', NULL, 'pages/order-pay-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (184, '2021-04-08 16:32:16', '2021-04-08 16:32:16', NULL, 'pages/order-pay-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (185, '2021-04-08 16:33:10', '2021-04-08 16:33:10', NULL, 'pages/order-pay-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (186, '2021-04-08 16:33:28', '2021-04-08 16:33:28', NULL, 'pages/order-pay-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (187, '2021-04-09 10:10:38', '2021-04-09 10:10:38', NULL, 'pages/order-pay-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (188, '2021-04-09 10:11:07', '2021-04-09 10:11:07', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (189, '2021-04-09 10:11:50', '2021-04-09 10:11:50', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (190, '2021-04-09 13:48:15', '2021-04-09 13:48:15', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (191, '2021-04-09 13:49:55', '2021-04-09 13:49:55', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (192, '2021-04-09 13:50:00', '2021-04-09 13:50:00', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (193, '2021-04-09 13:50:00', '2021-04-09 13:50:00', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (194, '2021-04-09 13:50:04', '2021-04-09 13:50:04', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (195, '2021-04-09 14:02:14', '2021-04-09 14:02:14', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (196, '2021-04-09 14:02:17', '2021-04-09 14:02:17', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (197, '2021-04-09 14:02:17', '2021-04-09 14:02:17', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (198, '2021-04-09 14:02:20', '2021-04-09 14:02:20', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (199, '2021-04-09 14:07:30', '2021-04-09 14:07:30', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (200, '2021-04-09 14:07:31', '2021-04-09 14:07:31', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (201, '2021-04-09 14:07:34', '2021-04-09 14:07:34', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (202, '2021-04-09 14:12:02', '2021-04-09 14:12:02', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (203, '2021-04-09 14:12:02', '2021-04-09 14:12:02', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (204, '2021-04-09 14:12:04', '2021-04-09 14:12:04', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (205, '2021-04-09 14:17:01', '2021-04-09 14:17:01', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (206, '2021-04-09 14:17:01', '2021-04-09 14:17:01', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (207, '2021-04-09 14:17:04', '2021-04-09 14:17:04', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (208, '2021-04-09 14:21:25', '2021-04-09 14:21:25', NULL, 'pages/order-confirm-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (209, '2021-04-09 14:21:25', '2021-04-09 14:21:25', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (210, '2021-04-09 14:21:27', '2021-04-09 14:21:27', NULL, 'pages/order-confirm-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (211, '2021-04-13 14:51:02', '2021-04-13 14:51:02', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
INSERT INTO `action` VALUES (212, '2021-04-13 14:51:05', '2021-04-13 14:51:05', NULL, 'pages/order-list-page/index', 'action_page_leave', 999999999);
INSERT INTO `action` VALUES (213, '2021-04-13 14:51:08', '2021-04-13 14:51:08', NULL, 'pages/order-list-page/index', 'action_page_entry', 999999999);
COMMIT;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `country_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'CN' COMMENT '国家',
  `city_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '省',
  `province_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '市',
  `area_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '区',
  `town_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '街道',
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
  `post_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '000000' COMMENT '邮编',
  `tel` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系电话',
  `receiver` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收件人',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of address
-- ----------------------------
BEGIN;
INSERT INTO `address` VALUES (1, 5, 'CN', '1404', '14', '140405', '140405101000', 'aaaaaaaaa', '000000', '111123112312', 'june', '2020-09-02 14:40:14', '2020-09-02 14:40:14', NULL);
INSERT INTO `address` VALUES (2, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:49:57', '2020-09-02 15:49:57', NULL);
INSERT INTO `address` VALUES (3, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:49:59', '2020-09-02 15:49:59', NULL);
INSERT INTO `address` VALUES (4, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:50:01', '2020-09-02 15:50:01', NULL);
INSERT INTO `address` VALUES (5, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:50:03', '2020-09-02 15:50:03', NULL);
INSERT INTO `address` VALUES (6, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:50:05', '2020-09-02 15:50:05', NULL);
INSERT INTO `address` VALUES (7, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:50:08', '2020-09-02 15:50:08', NULL);
INSERT INTO `address` VALUES (8, 5, 'CN', '1201', '12', '120101', '120101001000', 'bbbbb', '000000', '111123112312', 'june', '2020-09-02 15:50:12', '2020-09-02 15:50:12', NULL);
INSERT INTO `address` VALUES (14, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:36:56', '2020-09-25 11:36:56', NULL);
INSERT INTO `address` VALUES (15, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:00', '2020-09-25 11:37:00', NULL);
INSERT INTO `address` VALUES (16, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:01', '2020-09-25 11:37:01', NULL);
INSERT INTO `address` VALUES (17, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:03', '2020-09-25 11:37:03', NULL);
INSERT INTO `address` VALUES (18, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:04', '2020-09-25 11:37:04', NULL);
INSERT INTO `address` VALUES (19, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:05', '2020-09-25 11:37:05', NULL);
INSERT INTO `address` VALUES (20, 5, 'CN', '2206', '22', '220605', '220605004000', '杭州市滨江区', '000000', '111123112312', 'june', '2020-09-25 11:37:06', '2020-09-25 11:37:06', NULL);
COMMIT;

-- ----------------------------
-- Table structure for attributeKey
-- ----------------------------
DROP TABLE IF EXISTS `attributeKey`;
CREATE TABLE `attributeKey` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性key的id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '属性key的名字',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of attributeKey
-- ----------------------------
BEGIN;
INSERT INTO `attributeKey` VALUES (1, '尺寸', '2020-08-05 17:52:33', '2020-08-05 17:52:33', '2020-08-06 11:50:38');
INSERT INTO `attributeKey` VALUES (4, '尺寸3', '2020-08-06 10:59:06', '2020-08-06 10:59:06', '2020-08-06 11:49:03');
INSERT INTO `attributeKey` VALUES (5, '尺寸4', '2020-08-06 11:01:43', '2020-08-06 11:01:43', NULL);
INSERT INTO `attributeKey` VALUES (6, '颜色', '2020-08-06 14:25:45', '2020-08-06 14:25:45', NULL);
INSERT INTO `attributeKey` VALUES (7, '图案', '2020-08-06 14:26:34', '2020-08-06 14:26:34', NULL);
COMMIT;

-- ----------------------------
-- Table structure for attributeValue
-- ----------------------------
DROP TABLE IF EXISTS `attributeValue`;
CREATE TABLE `attributeValue` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '属性值的id',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '属性值的值',
  `key_id` int(11) NOT NULL COMMENT '属性值所属的key',
  `weights` int(11) DEFAULT '0' COMMENT '排序权重',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of attributeValue
-- ----------------------------
BEGIN;
INSERT INTO `attributeValue` VALUES (1, 's', 1, 0, '2020-08-05 17:52:33', '2020-08-05 17:52:33', '2020-08-06 11:50:38');
INSERT INTO `attributeValue` VALUES (2, 'm', 1, 0, '2020-08-05 17:52:33', '2020-08-05 17:52:33', '2020-08-06 11:50:38');
INSERT INTO `attributeValue` VALUES (3, 'l', 1, 0, '2020-08-05 17:52:33', '2020-08-05 17:52:33', '2020-08-06 11:50:38');
INSERT INTO `attributeValue` VALUES (10, 's', 4, 0, '2020-08-06 10:59:06', '2020-08-06 10:59:06', '2020-08-06 11:49:03');
INSERT INTO `attributeValue` VALUES (11, 'm', 4, 0, '2020-08-06 10:59:06', '2020-08-06 10:59:06', '2020-08-06 11:49:03');
INSERT INTO `attributeValue` VALUES (12, 'l', 4, 0, '2020-08-06 10:59:06', '2020-08-06 10:59:06', '2020-08-06 11:49:03');
INSERT INTO `attributeValue` VALUES (13, 's', 5, 0, '2020-08-06 11:01:43', '2020-08-06 11:01:43', NULL);
INSERT INTO `attributeValue` VALUES (14, 'm', 5, 0, '2020-08-06 11:01:43', '2020-08-06 11:01:43', NULL);
INSERT INTO `attributeValue` VALUES (15, 'l', 5, 0, '2020-08-06 11:01:43', '2020-08-06 11:01:43', NULL);
INSERT INTO `attributeValue` VALUES (16, '红', 6, 0, '2020-08-06 14:25:45', '2020-08-06 14:25:45', NULL);
INSERT INTO `attributeValue` VALUES (17, '黄', 6, 0, '2020-08-06 14:25:45', '2020-08-06 14:25:45', NULL);
INSERT INTO `attributeValue` VALUES (18, '蓝', 6, 0, '2020-08-06 14:25:45', '2020-08-06 14:25:45', NULL);
INSERT INTO `attributeValue` VALUES (19, '龙', 7, 0, '2020-08-06 14:26:35', '2020-08-06 14:26:35', NULL);
INSERT INTO `attributeValue` VALUES (20, '虎', 7, 0, '2020-08-06 14:26:35', '2020-08-06 14:26:35', NULL);
INSERT INTO `attributeValue` VALUES (21, '狮', 7, 0, '2020-08-06 14:26:35', '2020-08-06 14:26:35', NULL);
COMMIT;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `like_num` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for buriedPoint
-- ----------------------------
DROP TABLE IF EXISTS `buriedPoint`;
CREATE TABLE `buriedPoint` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `who` int(11) NOT NULL COMMENT '用户（ID）(设备ID)',
  `when` int(11) NOT NULL COMMENT '时间戳',
  `where` int(11) DEFAULT NULL COMMENT '手机型号，用户定位',
  `what` int(11) DEFAULT NULL COMMENT '是什么（首页、详情页）',
  `how` int(11) DEFAULT NULL COMMENT '维度特征（向前、向后）',
  `platform` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '平台',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `under_which` int(11) NOT NULL COMMENT '挂在某个商品下（或其他）',
  `user_id` int(11) NOT NULL COMMENT '评论的用户id',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '回复父评论的id',
  `content` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论的内容',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论的事物的类型',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (2, 1, 5, -1, '评论1', '2020-08-25 16:15:11', '2020-08-25 16:15:11', NULL, 'product');
INSERT INTO `comment` VALUES (3, 1, 5, 2, '评论1-1', '2020-08-25 16:46:45', '2020-08-25 16:46:45', NULL, 'product');
INSERT INTO `comment` VALUES (4, 1, 5, 3, '评论1-1-1', '2020-08-25 16:46:56', '2020-08-25 16:46:56', NULL, 'product');
INSERT INTO `comment` VALUES (5, 1, 5, 3, '评论1-1-1', '2021-03-19 16:24:05', '2021-03-19 16:24:05', NULL, 'product');
COMMIT;

-- ----------------------------
-- Table structure for level
-- ----------------------------
DROP TABLE IF EXISTS `level`;
CREATE TABLE `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '等级名',
  `weight` int(11) DEFAULT '0' COMMENT '权重',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `level_up_amount` int(11) DEFAULT '999999999' COMMENT '该等级需要的数值',
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg' COMMENT '等级图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of level
-- ----------------------------
BEGIN;
INSERT INTO `level` VALUES (1, '铜牌', 0, '2021-01-21 16:43:22', '2021-01-21 16:43:22', NULL, 0, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg');
INSERT INTO `level` VALUES (2, '银牌', 0, '2021-01-21 16:43:42', '2021-01-21 16:43:42', NULL, 500, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg');
INSERT INTO `level` VALUES (3, '金牌', 0, '2021-01-21 16:43:58', '2021-01-21 16:43:58', NULL, 1200, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for levelGroupLevelRelation
-- ----------------------------
DROP TABLE IF EXISTS `levelGroupLevelRelation`;
CREATE TABLE `levelGroupLevelRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `level_group_id` int(11) NOT NULL COMMENT '等级组id',
  `level_id` int(11) NOT NULL COMMENT '等级id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `levelGroupLevelRelation_levelId_levelGroupId_unique` (`level_group_id`,`level_id`),
  KEY `level_id` (`level_id`),
  CONSTRAINT `levelGroupLevelRelation_ibfk_113` FOREIGN KEY (`level_group_id`) REFERENCES `LevelGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `levelGroupLevelRelation_ibfk_114` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of levelGroupLevelRelation
-- ----------------------------
BEGIN;
INSERT INTO `levelGroupLevelRelation` VALUES (1, 8, 2, '2021-01-26 14:39:01', '2021-01-26 14:39:01', NULL);
INSERT INTO `levelGroupLevelRelation` VALUES (2, 8, 3, '2021-01-26 14:39:07', '2021-01-26 14:39:07', NULL);
INSERT INTO `levelGroupLevelRelation` VALUES (3, 8, 1, '2021-01-26 14:39:10', '2021-01-26 14:39:10', NULL);
COMMIT;

-- ----------------------------
-- Table structure for levelRightsRelation
-- ----------------------------
DROP TABLE IF EXISTS `levelRightsRelation`;
CREATE TABLE `levelRightsRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `level_id` int(11) NOT NULL,
  `right_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `level_id` (`level_id`),
  KEY `right_id` (`right_id`),
  CONSTRAINT `levelRightsRelation_ibfk_505` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `levelRightsRelation_ibfk_506` FOREIGN KEY (`right_id`) REFERENCES `rights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of levelRightsRelation
-- ----------------------------
BEGIN;
INSERT INTO `levelRightsRelation` VALUES (1, '2021-01-26 11:07:51', '2021-01-26 11:07:51', NULL, 2, 1);
INSERT INTO `levelRightsRelation` VALUES (2, '2021-01-26 11:07:55', '2021-01-26 11:07:55', NULL, 2, 2);
COMMIT;

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for likeDb
-- ----------------------------
DROP TABLE IF EXISTS `likeDb`;
CREATE TABLE `likeDb` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收藏的类型',
  `like_id` int(11) NOT NULL COMMENT '收藏的id',
  `disabled` int(11) NOT NULL DEFAULT '0' COMMENT '是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `likeDb_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '会员id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `nick_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `sex` decimal(10,0) NOT NULL DEFAULT '3' COMMENT '性别(1.男性 2.女性 3.保密)',
  `member_card_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '会员卡号',
  `growth_value` int(11) NOT NULL DEFAULT '0' COMMENT '成长值',
  `points` int(11) DEFAULT '0' COMMENT '当前积分',
  `real_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '姓名',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `residence` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '常居地',
  `id_card` int(11) DEFAULT NULL COMMENT '生份证',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of member
-- ----------------------------
BEGIN;
INSERT INTO `member` VALUES (1, 5, '微信用户', 0, 'dce60550-016c-11eb-9cab-ebabe872a254', 30, 0, NULL, '2020-09-01 00:00:00', '--', NULL, '2020-09-28 17:27:43', '2021-04-09 14:21:27', NULL, 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132');
COMMIT;

-- ----------------------------
-- Table structure for memberPointsRelation
-- ----------------------------
DROP TABLE IF EXISTS `memberPointsRelation`;
CREATE TABLE `memberPointsRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `member_id` int(11) NOT NULL COMMENT '会员id',
  `point_id` int(11) NOT NULL COMMENT '积分id',
  `current_sum` int(11) NOT NULL COMMENT '当前积分总数',
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  KEY `point_id` (`point_id`),
  CONSTRAINT `memberPointsRelation_ibfk_27` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberPointsRelation_ibfk_28` FOREIGN KEY (`point_id`) REFERENCES `points` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of memberPointsRelation
-- ----------------------------
BEGIN;
INSERT INTO `memberPointsRelation` VALUES (1, '2021-01-25 16:18:12', '2021-01-25 16:18:12', NULL, 1, 4, 0);
INSERT INTO `memberPointsRelation` VALUES (2, '2021-01-25 16:18:37', '2021-01-25 16:18:37', NULL, 1, 5, 0);
INSERT INTO `memberPointsRelation` VALUES (3, '2021-01-25 16:21:36', '2021-01-25 16:21:36', NULL, 1, 6, 0);
INSERT INTO `memberPointsRelation` VALUES (4, '2021-01-25 16:53:13', '2021-01-25 16:53:13', NULL, 1, 7, 0);
INSERT INTO `memberPointsRelation` VALUES (5, '2021-01-25 16:56:28', '2021-01-25 16:56:28', NULL, 1, 8, 10);
INSERT INTO `memberPointsRelation` VALUES (6, '2021-01-25 17:09:01', '2021-01-25 17:09:01', NULL, 1, 10, 15);
INSERT INTO `memberPointsRelation` VALUES (7, '2021-01-25 17:09:23', '2021-01-25 17:09:23', NULL, 1, 11, 30);
INSERT INTO `memberPointsRelation` VALUES (8, '2021-01-28 16:24:58', '2021-01-28 16:24:58', NULL, 1, 25, 45);
INSERT INTO `memberPointsRelation` VALUES (9, '2021-01-28 16:53:42', '2021-01-28 16:53:42', NULL, 1, 26, 60);
COMMIT;

-- ----------------------------
-- Table structure for memberRightRelation
-- ----------------------------
DROP TABLE IF EXISTS `memberRightRelation`;
CREATE TABLE `memberRightRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL COMMENT '会员id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名字',
  `num` int(11) DEFAULT NULL COMMENT '权益的数值',
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg' COMMENT '图片',
  `pattern` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '权益类型',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '权益属性',
  `expired` int(11) DEFAULT NULL COMMENT '过期时间',
  `amount` int(11) DEFAULT NULL COMMENT '权益可用数量',
  `desc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权益的描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of memberRightRelation
-- ----------------------------
BEGIN;
INSERT INTO `memberRightRelation` VALUES (1, '2021-01-27 18:08:15', '2021-01-27 18:08:15', NULL, 1, '优惠劵', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', 'COUPON', 'CONSUMABLE', NULL, 2, '全场通用优惠劵');
INSERT INTO `memberRightRelation` VALUES (2, '2021-01-28 10:39:28', '2021-01-28 10:39:28', NULL, 1, '优惠劵2', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', 'COUPON', 'CONSUMABLE', NULL, 2, '全场通用优惠劵');
INSERT INTO `memberRightRelation` VALUES (3, '2021-01-28 10:39:28', '2021-01-28 10:39:28', NULL, 1, '优惠劵1', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', 'COUPON', 'CONSUMABLE', NULL, 2, '全场通用优惠劵');
INSERT INTO `memberRightRelation` VALUES (4, '2021-01-28 10:39:28', '2021-01-28 10:39:28', NULL, 1, '优惠劵3', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', 'COUPON', 'CONSUMABLE', NULL, 2, '全场通用优惠劵');
COMMIT;

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `sight_materials` text COLLATE utf8mb4_general_ci COMMENT '视觉物料',
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '文字内容',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发布时的地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of note
-- ----------------------------
BEGIN;
INSERT INTO `note` VALUES (1, 'http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg', 'titile1', 'content1', '2020-08-25 16:10:25', '2020-08-25 16:10:25', '2020-08-25 16:10:25', NULL);
INSERT INTO `note` VALUES (2, NULL, '测试标题', '测试内容', '2021-03-16 21:47:41', '2021-03-16 21:47:41', NULL, NULL);
INSERT INTO `note` VALUES (3, '[{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/1FTxCRWnlh8F049062461413cd8b093233d12c3ce53a.png\"}]', '测试标题', '测试内容', '2021-03-16 21:53:17', '2021-03-16 21:53:17', NULL, NULL);
INSERT INTO `note` VALUES (4, '[{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"},{\"url\":\"http://qiniu.miaolingfei.top/YqPvoPEMHP7u146ddac083179904f48f7f1e6e0dcacd.jpeg\"}]', '测试标题', '测试内容', '2021-03-16 21:56:03', '2021-03-16 21:56:03', NULL, NULL);
INSERT INTO `note` VALUES (5, NULL, '测试标题', '测试内容', '2021-03-25 16:42:02', '2021-03-25 16:42:02', NULL, NULL);
INSERT INTO `note` VALUES (6, NULL, '测试标题', '测试内容', '2021-03-25 16:42:44', '2021-03-25 16:42:44', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '收获地址id（包含收件人及手机号）',
  `goods` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '将购买的商品',
  `amount` float NOT NULL COMMENT '购物总数',
  `total_price` float NOT NULL COMMENT '购买总价',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '支付状态',
  `code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '99999999999999' COMMENT '订单号（有含义）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of order
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES (1, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 17:42:17', '2020-09-14 17:42:17', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (2, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 17:46:41', '2020-09-14 17:46:41', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (3, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 17:49:13', '2020-09-14 17:49:13', NULL, 1, '99999999999999');
INSERT INTO `order` VALUES (4, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 17:56:54', '2020-09-14 17:56:54', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (5, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:00:50', '2020-09-14 18:00:50', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (6, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:03:32', '2020-09-14 18:03:32', NULL, 1, '99999999999999');
INSERT INTO `order` VALUES (7, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:07:08', '2020-09-14 18:07:08', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (8, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:09:11', '2020-09-14 18:09:11', NULL, 2, '99999999999999');
INSERT INTO `order` VALUES (9, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:11:46', '2020-09-14 18:11:46', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (10, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:13:28', '2020-09-14 18:13:28', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (11, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:16:52', '2020-09-14 18:16:52', NULL, 3, '99999999999999');
INSERT INTO `order` VALUES (12, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:18:12', '2020-09-14 18:18:12', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (13, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-14 18:21:27', '2020-09-14 18:21:27', NULL, 4, '99999999999999');
INSERT INTO `order` VALUES (14, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":null},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-15 16:01:19', '2020-09-15 16:01:19', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (15, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":null},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-09-15 16:05:31', '2020-09-15 16:05:31', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (16, 5, '{\"id\":14,\"countryId\":\"CN\",\"cityId\":\"2206\",\"provinceId\":\"22\",\"areaId\":\"220605\",\"townId\":\"220605004000\",\"address\":\"杭州市滨江区\",\"postCode\":\"000000\",\"tel\":111123112312,\"receiver\":\"june\",\"provinceName\":\"吉林省\",\"cityName\":\"白山市\",\"areaName\":\"江源区\",\"townName\":\"城墙街道\"}', '[{\"shopInfo\":{\"id\":13,\"name\":\"apple官方旗舰店\"},\"goodsGroup\":[{\"id\":1,\"amount\":1,\"name\":\"test-goods-1\",\"sku\":\"图案|龙-颜色|红\",\"price\":2,\"mainImage\":\"http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg\"}]}]', 1, 2, '2020-09-30 16:10:42', '2020-09-30 16:10:42', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (17, 5, '{\"id\":20,\"provinceName\":\"吉林省\",\"cityName\":\"白山市\",\"areaName\":\"江源区\",\"townName\":\"城墙街道\",\"address\":\"杭州市滨江区\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-11-10 15:30:22', '2020-11-10 15:30:22', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (18, 5, '{\"id\":20,\"provinceName\":\"吉林省\",\"cityName\":\"白山市\",\"areaName\":\"江源区\",\"townName\":\"城墙街道\",\"address\":\"杭州市滨江区\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-11-10 15:30:25', '2020-11-10 15:30:25', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (19, 5, '{\"id\":20,\"provinceName\":\"吉林省\",\"cityName\":\"白山市\",\"areaName\":\"江源区\",\"townName\":\"城墙街道\",\"address\":\"杭州市滨江区\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2020-11-10 15:30:25', '2020-11-10 15:30:25', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (20, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 10:02:11', '2021-04-09 10:02:11', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (21, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 10:12:11', '2021-04-09 10:12:11', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (22, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 11:45:53', '2021-04-09 11:45:53', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (23, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 13:50:06', '2021-04-09 13:50:06', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (24, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 14:07:36', '2021-04-09 14:07:36', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (25, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 14:21:53', '2021-04-09 14:21:53', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (26, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 15:55:12', '2021-04-09 15:55:12', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (27, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 16:16:47', '2021-04-09 16:16:47', NULL, 0, '99999999999999');
INSERT INTO `order` VALUES (28, 5, '{\"id\":8,\"provinceName\":\"天津市\",\"cityName\":\"天津市\",\"areaName\":\"和平区\",\"townName\":\"劝业场街道\",\"address\":\"bbbbb\",\"tel\":111123112312,\"receiver\":\"june\"}', '[{\"shopInfo\":{\"id\":11,\"name\":\"kfc\",\"logo\":\"\"},\"goodsGroup\":[{\"id\":2,\"amount\":1,\"name\":\"蛋白质护肤水\",\"sku\":\"图案|虎-颜色|红-尺寸4|m\",\"price\":12.5,\"mainImage\":\"http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png\"}]}]', 1, 12.5, '2021-04-09 16:18:43', '2021-04-09 18:01:17', NULL, 1, '161795632358019669');
COMMIT;

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '页面名称',
  `path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '页面地址',
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '页面截图',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of page
-- ----------------------------
BEGIN;
INSERT INTO `page` VALUES (1, 'wechat首页', 'pages/index/index', NULL, '2021-04-02 14:37:42', '2021-04-02 14:37:42', NULL);
INSERT INTO `page` VALUES (2, '微信登陆页面', 'pages/login-mini/index', NULL, '2021-04-02 14:39:00', '2021-04-02 14:39:00', NULL);
INSERT INTO `page` VALUES (3, '笔记列表页', 'pages/note-list-page/index', NULL, '2021-04-02 14:39:26', '2021-04-02 14:39:26', NULL);
INSERT INTO `page` VALUES (4, '笔记详情页', 'pages/note-detail-page/index', NULL, '2021-04-02 14:39:45', '2021-04-02 14:39:45', NULL);
INSERT INTO `page` VALUES (5, '我的页面', 'pages/mine-page/index', NULL, '2021-04-02 14:40:10', '2021-04-02 14:40:10', NULL);
COMMIT;

-- ----------------------------
-- Table structure for payOrder
-- ----------------------------
DROP TABLE IF EXISTS `payOrder`;
CREATE TABLE `payOrder` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '支付订单的状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `total_price` float NOT NULL COMMENT '需要支付的金额',
  `order_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品订单号',
  `order_id` int(11) NOT NULL COMMENT '商品订单id',
  `code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '支付订单号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of payOrder
-- ----------------------------
BEGIN;
INSERT INTO `payOrder` VALUES (8, '0', '2021-04-09 18:01:17', '2021-04-09 18:01:17', NULL, 12.5, '161795632358019669', 28, '161795632358019669012482');
COMMIT;

-- ----------------------------
-- Table structure for points
-- ----------------------------
DROP TABLE IF EXISTS `points`;
CREATE TABLE `points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) NOT NULL COMMENT '数值',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '变化方式（increase 增加，reduce 减少）',
  `pattern` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '变化种类',
  `expired` int(11) DEFAULT NULL COMMENT '过期时长',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of points
-- ----------------------------
BEGIN;
INSERT INTO `points` VALUES (4, 10, 'INCREASE', 'MOCK', NULL, '2021-01-25 16:18:12', '2021-01-25 16:18:12', NULL);
INSERT INTO `points` VALUES (5, 10, 'INCREASE', 'MOCK', NULL, '2021-01-25 16:18:37', '2021-01-25 16:18:37', NULL);
INSERT INTO `points` VALUES (6, 10, 'INCREASE', 'MOCK', NULL, '2021-01-25 16:21:36', '2021-01-25 16:21:36', NULL);
INSERT INTO `points` VALUES (7, 10, 'INCREASE', 'MOCK', NULL, '2021-01-25 16:53:13', '2021-01-25 16:53:13', NULL);
INSERT INTO `points` VALUES (8, 10, 'INCREASE', 'MOCK', NULL, '2021-01-25 16:56:28', '2021-01-25 16:56:28', NULL);
INSERT INTO `points` VALUES (9, 5, 'INCREASE', 'MOCK', NULL, '2021-01-25 17:07:33', '2021-01-25 17:07:33', NULL);
INSERT INTO `points` VALUES (10, 5, 'INCREASE', 'MOCK', NULL, '2021-01-25 17:09:01', '2021-01-25 17:09:01', NULL);
INSERT INTO `points` VALUES (11, 15, 'INCREASE', 'MOCK', NULL, '2021-01-25 17:09:23', '2021-01-25 17:09:23', NULL);
INSERT INTO `points` VALUES (25, 15, 'INCREASE', 'MOCK', NULL, '2021-01-28 16:24:58', '2021-01-28 16:24:58', NULL);
INSERT INTO `points` VALUES (26, 15, 'INCREASE', 'MOCK', NULL, '2021-01-28 16:53:41', '2021-01-28 16:53:41', NULL);
COMMIT;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `main_image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品主图',
  `images` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '',
  `desc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` float DEFAULT '10000000000',
  `sku_group` text COLLATE utf8mb4_general_ci NOT NULL COMMENT 'sku 价格',
  `offer` float DEFAULT '1',
  `shop_id` int(11) NOT NULL DEFAULT '1',
  `belong` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所属的分类',
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT 'sku的销售状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'spu识别码（不一定会用）',
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'test-goods-1', 'http://qiniu.miaolingfei.top/336139a0-e6aa-11ea-9124-2127eae6a2fb.jpg', '', '<p>测试商品1</p>', 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"蓝\",\"enabled\":1,\"salePrice\":\"1\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"虎\",\"颜色\":\"蓝\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"enabled\":1,\"salePrice\":\"4\"}]', 1, 13, NULL, '0', '2020-08-25 16:10:25', '2020-08-25 16:10:25', NULL, NULL);
INSERT INTO `product` VALUES (2, '蛋白质护肤水', 'http://qiniu.miaolingfei.top/60d2de80-f310-11ea-a35b-d1aa94dcb437.png', '', '<p>鸡肉带白护肤</p>', 10000000000, '[{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"12.5\"},{\"图案\":\"狮\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"14.5\"}]', 1, 11, '47', '0', '2020-09-10 10:51:12', '2020-09-10 10:51:12', NULL, NULL);
INSERT INTO `product` VALUES (3, '鸡肉套装', 'http://qiniu.miaolingfei.top/98d40700-f310-11ea-a35b-d1aa94dcb437.png', '', '<p>🐔人套装</p>', 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"1.1\"},{\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"1.2\"},{\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"1.3\"},{\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"1.4\"},{\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"1.5\"},{\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"1.6\"}]', 1, 11, '46', '0', '2020-09-10 10:52:42', '2020-09-10 10:52:42', NULL, NULL);
INSERT INTO `product` VALUES (4, 'kfc-1', 'http://qiniu.miaolingfei.top/7b5ae370-fd4b-11ea-8e60-09114d7f7380.jpeg', '', '<p>kfc 套餐</p>', 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"1\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"龙\",\"颜色\":\"黄\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"龙\",\"颜色\":\"黄\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"4\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"5\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"6\"},{\"图案\":\"虎\",\"颜色\":\"黄\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"7\"},{\"图案\":\"虎\",\"颜色\":\"黄\",\"尺寸4\":\"l\",\"enabled\":1,\"salePrice\":\"8\"}]', 1, 11, '44', '0', '2020-09-23 11:19:30', '2020-09-23 11:19:30', NULL, NULL);
INSERT INTO `product` VALUES (5, '奶瓶', 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '', '<p>超级奶瓶</p>', 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"4\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"10\"}]', 1, 9, '39', '0', '2020-09-23 11:20:57', '2020-09-23 11:20:57', NULL, NULL);
INSERT INTO `product` VALUES (6, 'IPhone12', 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '', NULL, 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"4\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"10\"}]', 1, 13, NULL, '0', '2021-01-15 10:44:00', '2021-01-15 10:44:00', NULL, NULL);
INSERT INTO `product` VALUES (7, 'Mac Pro', 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '', NULL, 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"4\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"10\"}]', 1, 13, NULL, '0', '2021-01-15 10:44:00', '2021-01-15 10:44:00', NULL, NULL);
INSERT INTO `product` VALUES (8, 'Airpod 2', 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '', NULL, 10000000000, '[{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"2\"},{\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"3\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1,\"salePrice\":\"4\"},{\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1,\"salePrice\":\"10\"}]', 1, 13, NULL, '0', '2021-01-15 10:44:00', '2021-01-15 10:44:00', NULL, NULL);
INSERT INTO `product` VALUES (9, 'iphone13', 'http://qiniu.miaolingfei.top/6b2e0dd0-9745-11eb-b650-c9d842dd35f7.jpeg', '', '<p>2021最新款iPhone13</p>', 10000000000, '[{\"salePrice\":\"1.1\",\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"2\",\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"3\",\"图案\":\"龙\",\"颜色\":\"蓝\",\"尺寸4\":\"l\",\"enabled\":1},{\"salePrice\":\"4\",\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"5\",\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"6\",\"图案\":\"龙\",\"颜色\":\"红\",\"尺寸4\":\"l\",\"enabled\":1},{\"salePrice\":\"7\",\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"8\",\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"9\",\"图案\":\"虎\",\"颜色\":\"蓝\",\"尺寸4\":\"l\",\"enabled\":1},{\"salePrice\":\"10\",\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"11\",\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"12\",\"图案\":\"虎\",\"颜色\":\"红\",\"尺寸4\":\"l\",\"enabled\":1},{\"salePrice\":\"13\",\"图案\":\"狮\",\"颜色\":\"蓝\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"14\",\"图案\":\"狮\",\"颜色\":\"蓝\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"15\",\"图案\":\"狮\",\"颜色\":\"蓝\",\"尺寸4\":\"l\",\"enabled\":1},{\"salePrice\":\"16\",\"图案\":\"狮\",\"颜色\":\"红\",\"尺寸4\":\"s\",\"enabled\":1},{\"salePrice\":\"17\",\"图案\":\"狮\",\"颜色\":\"红\",\"尺寸4\":\"m\",\"enabled\":1},{\"salePrice\":\"18\",\"图案\":\"狮\",\"颜色\":\"红\",\"尺寸4\":\"l\",\"enabled\":1}]', 1, 13, '46', '0', '2021-04-07 10:04:36', '2021-04-07 17:21:39', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for productBrand
-- ----------------------------
DROP TABLE IF EXISTS `productBrand`;
CREATE TABLE `productBrand` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '品牌id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '品牌名',
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '品牌logo',
  `desc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '品牌描述',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL COMMENT '关联的店铺id',
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `productBrand_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of productBrand
-- ----------------------------
BEGIN;
INSERT INTO `productBrand` VALUES (1, 'apple', NULL, '创造未来', '2020-07-23 11:41:04', '2020-07-23 11:41:04', NULL, NULL);
INSERT INTO `productBrand` VALUES (2, '华为', NULL, NULL, '2020-07-23 14:06:06', '2020-07-23 14:06:06', NULL, NULL);
INSERT INTO `productBrand` VALUES (3, '小米', NULL, NULL, '2020-07-23 14:06:23', '2020-07-23 14:06:23', NULL, NULL);
INSERT INTO `productBrand` VALUES (4, 'apple中国', NULL, NULL, '2020-07-23 17:26:38', '2020-07-23 17:26:38', NULL, 13);
INSERT INTO `productBrand` VALUES (5, '科技产品', NULL, NULL, '2020-07-26 20:18:54', '2020-07-26 20:18:54', NULL, NULL);
INSERT INTO `productBrand` VALUES (6, 'test分类', NULL, NULL, '2020-07-26 20:22:03', '2020-07-26 20:22:03', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for productCategory
-- ----------------------------
DROP TABLE IF EXISTS `productCategory`;
CREATE TABLE `productCategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `parent_id` int(11) NOT NULL COMMENT '父级分类id',
  `shop_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分类所属的店铺',
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分类图标',
  `status` int(11) DEFAULT '0' COMMENT '启用状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of productCategory
-- ----------------------------
BEGIN;
INSERT INTO `productCategory` VALUES (1, '科技分类', 0, NULL, NULL, 0, '2020-07-26 20:35:40', '2020-07-26 20:35:40', NULL);
INSERT INTO `productCategory` VALUES (33, '1', 1, NULL, NULL, 0, '2020-07-30 15:23:42', '2020-07-30 15:23:42', NULL);
INSERT INTO `productCategory` VALUES (34, '2', 1, NULL, NULL, 0, '2020-07-30 15:24:36', '2020-07-30 15:24:36', NULL);
INSERT INTO `productCategory` VALUES (35, '22', 34, NULL, NULL, 0, '2020-07-30 15:30:40', '2020-07-30 15:30:40', NULL);
INSERT INTO `productCategory` VALUES (36, '222', 35, NULL, NULL, 0, '2020-07-30 15:31:27', '2020-07-30 15:31:27', NULL);
INSERT INTO `productCategory` VALUES (37, '百货', 0, NULL, NULL, 0, '2020-09-10 10:20:30', '2020-09-10 10:20:30', NULL);
INSERT INTO `productCategory` VALUES (38, '数码', 0, NULL, NULL, 0, '2020-09-10 10:20:34', '2020-09-10 10:20:34', NULL);
INSERT INTO `productCategory` VALUES (39, '母婴', 0, NULL, NULL, 0, '2020-09-10 10:20:40', '2020-09-10 10:20:40', NULL);
INSERT INTO `productCategory` VALUES (40, '箱包', 0, NULL, NULL, 0, '2020-09-10 10:20:46', '2020-09-10 10:20:46', NULL);
INSERT INTO `productCategory` VALUES (41, '女装', 0, NULL, NULL, 0, '2020-09-10 10:20:50', '2020-09-10 10:20:50', NULL);
INSERT INTO `productCategory` VALUES (42, '进口', 0, NULL, NULL, 0, '2020-09-10 10:20:57', '2020-09-10 10:20:57', NULL);
INSERT INTO `productCategory` VALUES (43, '鞋靴', 0, NULL, NULL, 0, '2020-09-10 10:21:04', '2020-09-10 10:21:04', NULL);
INSERT INTO `productCategory` VALUES (44, '手机', 0, NULL, NULL, 0, '2020-09-10 10:21:09', '2020-09-10 10:21:09', NULL);
INSERT INTO `productCategory` VALUES (45, '食品', 0, NULL, NULL, 0, '2020-09-10 10:21:14', '2020-09-10 10:21:14', NULL);
INSERT INTO `productCategory` VALUES (46, '男装', 0, NULL, NULL, 0, '2020-09-10 10:21:19', '2020-09-10 10:21:19', NULL);
INSERT INTO `productCategory` VALUES (47, '美妆', 0, NULL, NULL, 0, '2020-09-10 10:21:25', '2020-09-10 10:21:25', NULL);
INSERT INTO `productCategory` VALUES (48, 'Mac', 53, '13', NULL, 1, '2020-01-14 16:45:00', '2020-01-14 16:45:00', NULL);
INSERT INTO `productCategory` VALUES (49, 'IPhone', 53, '13', NULL, 1, '2020-01-14 16:47:00', '2020-01-14 16:47:00', NULL);
INSERT INTO `productCategory` VALUES (50, 'IPad', 53, '13', NULL, 1, '2020-01-14 16:47:00', '2020-01-14 16:47:00', NULL);
INSERT INTO `productCategory` VALUES (51, 'Airpod', 53, '13', NULL, 0, '2020-01-14 16:47:00', '2020-01-14 16:47:00', NULL);
INSERT INTO `productCategory` VALUES (52, '新品', 0, '13', NULL, 1, '2020-01-15 15:33:00', '2020-01-15 15:33:00', NULL);
INSERT INTO `productCategory` VALUES (53, 'Apple产品', 0, '0', NULL, 0, '2020-01-19 17:51:00', '2020-01-19 17:51:00', NULL);
COMMIT;

-- ----------------------------
-- Table structure for rightPackage
-- ----------------------------
DROP TABLE IF EXISTS `rightPackage`;
CREATE TABLE `rightPackage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权益包名字',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rightPackage
-- ----------------------------
BEGIN;
INSERT INTO `rightPackage` VALUES (1, '铜牌权益', '2021-01-22 16:51:27', '2021-01-22 16:51:27', NULL);
COMMIT;

-- ----------------------------
-- Table structure for rightRelation
-- ----------------------------
DROP TABLE IF EXISTS `rightRelation`;
CREATE TABLE `rightRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL COMMENT '权益包id',
  `right_id` int(11) NOT NULL COMMENT '权益id',
  `weight` int(11) DEFAULT NULL COMMENT '权重',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `amount` int(11) DEFAULT '0' COMMENT '权益包中某个权益的数量',
  PRIMARY KEY (`id`),
  KEY `right_id` (`right_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `rightRelation_ibfk_113` FOREIGN KEY (`package_id`) REFERENCES `rightPackage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rightRelation_ibfk_114` FOREIGN KEY (`right_id`) REFERENCES `rights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rightRelation
-- ----------------------------
BEGIN;
INSERT INTO `rightRelation` VALUES (1, 1, 1, NULL, '2021-01-22 17:05:40', '2021-01-22 17:05:40', NULL, 0);
INSERT INTO `rightRelation` VALUES (2, 1, 2, NULL, '2021-01-22 17:05:48', '2021-01-22 17:05:48', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for rights
-- ----------------------------
DROP TABLE IF EXISTS `rights`;
CREATE TABLE `rights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名字',
  `num` int(11) DEFAULT NULL COMMENT '权益的数值',
  `pattern` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '权益类型',
  `expired` int(11) DEFAULT NULL COMMENT '过期时间',
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg' COMMENT '图片',
  `desc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权益的描述',
  `amount` int(11) DEFAULT '0' COMMENT '初始数量',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '权益属性',
  PRIMARY KEY (`id`),
  UNIQUE KEY `rights_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of rights
-- ----------------------------
BEGIN;
INSERT INTO `rights` VALUES (1, '折扣buff', NULL, 'DISCOUNT', NULL, NULL, '2021-01-22 15:31:37', '2021-01-22 15:31:37', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '全场通用折扣劵', 0, 'STATE_TYPE');
INSERT INTO `rights` VALUES (2, '优惠劵', NULL, 'COUPON', NULL, NULL, '2021-01-22 15:32:18', '2021-01-22 15:32:18', NULL, 'http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg', '全场通用优惠劵', 0, 'CONSUMABLE');
COMMIT;

-- ----------------------------
-- Table structure for safeList
-- ----------------------------
DROP TABLE IF EXISTS `safeList`;
CREATE TABLE `safeList` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '黑名单还是白名单',
  `keywords_list` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '名单内容',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '名单名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of safeList
-- ----------------------------
BEGIN;
INSERT INTO `safeList` VALUES (1, '2021-03-28 11:08:24', '2021-03-28 13:03:55', NULL, 'black', '[\"傻逼\"]', '测试名单1');
INSERT INTO `safeList` VALUES (2, '2021-03-28 11:17:42', '2021-03-28 11:17:42', NULL, 'black', '[\"傻逼\"]', '测试名单2');
INSERT INTO `safeList` VALUES (3, '2021-03-28 11:25:07', '2021-03-28 11:25:07', NULL, 'black', '[\"傻逼\"]', '测试名单3');
INSERT INTO `safeList` VALUES (4, '2021-03-28 11:58:09', '2021-03-28 11:58:09', NULL, 'black', '[\"傻逼\"]', '测试名单4');
COMMIT;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '店铺logo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of shop
-- ----------------------------
BEGIN;
INSERT INTO `shop` VALUES (1, '公用测试店铺', '2020-07-10 17:57:24', '2020-07-10 17:57:24', NULL, '');
INSERT INTO `shop` VALUES (2, '测试店铺2', '2020-07-12 23:27:19', '2020-07-12 23:27:19', NULL, '');
INSERT INTO `shop` VALUES (3, '测试店铺2', '2020-07-12 23:50:20', '2020-07-12 23:50:20', NULL, '');
INSERT INTO `shop` VALUES (4, '测试店铺2', '2020-07-12 23:50:23', '2020-07-12 23:50:23', NULL, '');
INSERT INTO `shop` VALUES (5, '测试权限', '2020-07-13 16:42:27', '2020-07-13 16:42:27', NULL, '');
INSERT INTO `shop` VALUES (6, '测试权限', '2020-07-13 16:51:13', '2020-07-13 16:51:13', NULL, '');
INSERT INTO `shop` VALUES (7, '测试店铺2', '2020-07-13 21:53:08', '2020-07-13 21:53:08', NULL, '');
INSERT INTO `shop` VALUES (8, '测试店铺2', '2020-07-13 21:53:29', '2020-07-13 21:53:29', NULL, '');
INSERT INTO `shop` VALUES (9, '测试店铺权限', '2020-07-14 11:42:16', '2020-07-14 11:42:16', NULL, '');
INSERT INTO `shop` VALUES (11, 'kfc', '2020-07-14 16:39:41', '2020-07-14 16:39:41', NULL, '');
INSERT INTO `shop` VALUES (13, 'apple官方旗舰店', '2020-07-23 15:50:35', '2020-07-23 15:50:35', NULL, '');
INSERT INTO `shop` VALUES (18, 'graphql', '2020-11-25 18:34:23', '2020-11-25 18:34:23', NULL, '');
INSERT INTO `shop` VALUES (19, 'test type graphql', '2020-11-30 11:20:00', '2020-11-30 11:20:00', NULL, '');
COMMIT;

-- ----------------------------
-- Table structure for shopProductRelation
-- ----------------------------
DROP TABLE IF EXISTS `shopProductRelation`;
CREATE TABLE `shopProductRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for shopUserRelation
-- ----------------------------
DROP TABLE IF EXISTS `shopUserRelation`;
CREATE TABLE `shopUserRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of shopUserRelation
-- ----------------------------
BEGIN;
INSERT INTO `shopUserRelation` VALUES (1, 5, 11, '2020-07-14 16:39:41', '2020-07-14 16:39:41', NULL);
INSERT INTO `shopUserRelation` VALUES (2, 5, 13, '2020-07-23 15:50:35', '2020-07-23 15:50:35', NULL);
INSERT INTO `shopUserRelation` VALUES (3, 0, 18, '2020-11-25 18:34:24', '2020-11-25 18:34:24', NULL);
INSERT INTO `shopUserRelation` VALUES (4, 0, 19, '2020-11-30 11:20:00', '2020-11-30 11:20:00', NULL);
COMMIT;

-- ----------------------------
-- Table structure for shoppingCart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingCart`;
CREATE TABLE `shoppingCart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `num` int(11) DEFAULT '1' COMMENT '数量',
  `sku` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'sku',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `shop_id` int(11) NOT NULL COMMENT '店铺Id',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `shoppingCart_ibfk_633` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `shoppingCart_ibfk_634` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `shoppingCart_ibfk_635` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of shoppingCart
-- ----------------------------
BEGIN;
INSERT INTO `shoppingCart` VALUES (2, '2020-12-25 11:42:59', '2020-12-25 11:43:03', NULL, 1, 3, '图案|龙-颜色|蓝', 5, 13);
INSERT INTO `shoppingCart` VALUES (3, '2020-12-25 13:31:54', '2020-12-25 13:31:54', NULL, 2, 2, '图案|虎-颜色|红-尺寸4|m', 5, 11);
INSERT INTO `shoppingCart` VALUES (4, '2020-12-25 13:32:30', '2020-12-25 13:32:30', NULL, 3, 3, '图案|龙-颜色|蓝-尺寸4|l', 5, 11);
COMMIT;

-- ----------------------------
-- Table structure for sms
-- ----------------------------
DROP TABLE IF EXISTS `sms`;
CREATE TABLE `sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` bigint(11) DEFAULT NULL,
  `sms_num` int(6) DEFAULT NULL,
  `effective_time` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sms
-- ----------------------------
BEGIN;
INSERT INTO `sms` VALUES (1, 13116763735, 135795, 1567042152239, '2019-08-28 16:40:14', '2019-08-29 09:29:11', NULL);
COMMIT;

-- ----------------------------
-- Table structure for spuCategoryRelation
-- ----------------------------
DROP TABLE IF EXISTS `spuCategoryRelation`;
CREATE TABLE `spuCategoryRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `spu_id` int(11) NOT NULL COMMENT '产品id',
  `category_id` int(11) NOT NULL COMMENT '分类id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `spuCategoryRelation_categoryId_spuId_unique` (`spu_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `spuCategoryRelation_ibfk_73` FOREIGN KEY (`spu_id`) REFERENCES `product` (`id`),
  CONSTRAINT `spuCategoryRelation_ibfk_74` FOREIGN KEY (`category_id`) REFERENCES `productCategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of spuCategoryRelation
-- ----------------------------
BEGIN;
INSERT INTO `spuCategoryRelation` VALUES (1, 6, 52, '2021-01-15 15:52:00', '2021-01-15 15:52:00', NULL);
INSERT INTO `spuCategoryRelation` VALUES (2, 6, 49, '2021-01-15 15:52:22', '2021-01-15 15:52:22', NULL);
COMMIT;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '主题名字',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `heat` int(11) DEFAULT NULL COMMENT '热度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of topic
-- ----------------------------
BEGIN;
INSERT INTO `topic` VALUES (1, '萌宠', '2021-03-10 11:29:09', '2021-03-10 11:29:09', NULL, NULL);
INSERT INTO `topic` VALUES (2, '宠物大冒险', '2021-03-10 14:15:59', '2021-03-10 14:15:59', NULL, NULL);
INSERT INTO `topic` VALUES (3, '怪兽', '2021-03-10 16:32:48', '2021-03-10 16:32:48', NULL, NULL);
INSERT INTO `topic` VALUES (4, '2', '2021-03-16 21:47:41', '2021-03-16 21:47:41', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for topicNoteRelation
-- ----------------------------
DROP TABLE IF EXISTS `topicNoteRelation`;
CREATE TABLE `topicNoteRelation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `note_id` int(11) NOT NULL COMMENT '笔记id',
  `topic_id` int(11) NOT NULL COMMENT '话题id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `topicNoteRelation_topicId_noteId_unique` (`note_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `topicNoteRelation_ibfk_103` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topicNoteRelation_ibfk_104` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of topicNoteRelation
-- ----------------------------
BEGIN;
INSERT INTO `topicNoteRelation` VALUES (11, 1, 1, '2021-03-15 15:46:05', '2021-03-15 15:46:05', NULL);
INSERT INTO `topicNoteRelation` VALUES (12, 1, 3, '2021-03-15 15:46:05', '2021-03-15 15:46:05', NULL);
INSERT INTO `topicNoteRelation` VALUES (13, 2, 4, '2021-03-16 21:47:41', '2021-03-16 21:47:41', NULL);
INSERT INTO `topicNoteRelation` VALUES (14, 4, 2, '2021-03-16 21:56:03', '2021-03-16 21:56:03', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` bigint(11) DEFAULT NULL COMMENT '用户手机号',
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户密码',
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'active' COMMENT '用户状态',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `openid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '微信openid',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `status` (`status`),
  UNIQUE KEY `mobile_21` (`mobile`),
  UNIQUE KEY `mobile_22` (`mobile`),
  UNIQUE KEY `user_email_mobile` (`email`,`mobile`),
  UNIQUE KEY `user_email_mobile_openid` (`email`,`mobile`,`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (2, 13116763734, NULL, NULL, NULL, '2020-04-07 17:33:15', '2020-04-07 17:33:15', NULL, NULL);
INSERT INTO `user` VALUES (5, 13116763735, '$2a$10$3PTtvjxxW.dBqfcwSWXz/e13dG4BJXQzrH6stmAtMJ9JlXL6fVp2m', '418694294@qq.com', NULL, '2020-07-13 16:41:04', '2021-02-19 17:11:58', NULL, 'ojdq84q7ya3pmQD06Jn2iGuOit3E');
COMMIT;

-- ----------------------------
-- Table structure for userBrowsePath
-- ----------------------------
DROP TABLE IF EXISTS `userBrowsePath`;
CREATE TABLE `userBrowsePath` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `page_id` int(11) NOT NULL COMMENT '当前页面id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `next_browse_page_id` int(11) DEFAULT NULL COMMENT '下一个浏览页面id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of userBrowsePath
-- ----------------------------
BEGIN;
INSERT INTO `userBrowsePath` VALUES (1, 1, 5, '2021-04-02 16:26:14', '2021-04-02 16:26:14', NULL, NULL);
INSERT INTO `userBrowsePath` VALUES (2, 1, 5, '2021-04-02 16:26:36', '2021-04-02 16:26:36', NULL, 3);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
