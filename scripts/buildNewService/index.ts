import { join } from "path";
import fs from "fs";
import program from "commander";
import inquirer from "inquirer";
import _ from "lodash";
import chalk from "chalk";
import { buildFileContent, writeServiceFile, FILE_TYPE } from "./lib";

// 匹配中英文数字
// /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test('你好a')

program
  .command("start")
  // .alias("")
  .description("创建新的服务")
  .option("--name [serviceName]")
  .option("--cname [serviceCname]")
  .option("--common", "通用服务")
  .option("--mall", "市场服务")
  .option("--member", "会员服务")
  .option("--social", "社交服务")
  .option("--user", "用户服务")
  .option("--all", "全部")
  .option("--api", "仅api")
  .option("--db", "仅数据库")
  .option("--service", "仅service")
  .option("--manager", "仅manager")
  .action((option) => {
    let config = _.assign(
      {
        serviceName: null,
        serviceCname: null,
        description: "",
        all: false,
        api: false,
        db: false,
        service: false,
        manager: false,
        common: false,
        mall: false,
        member: false,
        social: false,
        user: false,
      },
      option
    );
    const promps: inquirer.QuestionCollection[] = [];

    console.log("");
    console.log(chalk.green("准备模版配置"));
    console.log("");

    if (config.serviceName !== "string") {
      promps.push({
        type: "input",
        name: "serviceName",
        message: "请输入服务名字",
        validate(input) {
          if (!input) {
            return "不能为空";
          }
          return true;
        },
      });
    }
    if (config.serviceCname !== "string") {
      promps.push({
        type: "input",
        name: "serviceCname",
        message: "请输入服务中文名字",
        validate(input) {
          if (!/^[\u4e00-\u9fa5_0-9]+$/.test(input)) {
            return "cname只能包含中午和数字";
          }
          return true;
        },
      });
    }
    if (config.description !== "string") {
      promps.push({
        type: "input",
        name: "description",
        message: "请输入服务描述",
      });
    }
    if (
      config.common === false &&
      config.mall === false &&
      config.member === false &&
      config.social === false &&
      config.user === false
    ) {
      promps.push({
        type: "list",
        name: "baseLocation",
        message: "放在哪个微服务中",
        choices: [
          {
            name: "通用",
            value: "common",
          },
          {
            name: "市场",
            value: "mall",
          },
          {
            name: "会员",
            value: "member",
          },
          {
            name: "社交",
            value: "social",
          },
          {
            name: "用户",
            value: "user",
          },
        ],
      });
    }
    if (
      config.all === false &&
      config.api === false &&
      config.db === false &&
      config.service === false &&
      config.manager === false
    ) {
      promps.push({
        type: "list",
        name: "fileType",
        message: "想要生成哪些文件",
        choices: [
          {
            name: "全部类型",
            value: "all",
          },
          {
            name: "api",
            value: "api",
          },
          {
            name: "db",
            value: "db",
          },
          {
            name: "service",
            value: "service",
          },
          {
            name: "manager",
            value: "manager",
          },
        ],
      });
    }
    inquirer.prompt(promps).then((answers) => {
      console.log(chalk.green("配置的内容:"));
      console.log(answers);
      console.log(chalk.blue("配置完成，开始生成文件。。。"));

      config = _.assign(config, answers);
      config[answers["fileType"]] = true;
      console.log(answers);
      // console.log("process.argv", process.argv);
      // const args = process.argv.slice(2, process.argv.length);
      // console.log("args:", args);

      // console.log("准备开始创建新service...");
      const { serviceName } = config;
      let defaultConfig = {
        api: config.api,
        db: config.db,
        service: config.service,
        manager: config.manager,
      };
      if (config.all) {
        defaultConfig = {
          api: true,
          db: true,
          service: true,
          manager: true,
        };
      }
      const basePath = join(__dirname, "../", "../");
      const baseMicroServicePath = join(
        "micro-services/",
        `${answers["baseLocation"]}-service/`,
        "src"
      );
      const srcPath = join(basePath, baseMicroServicePath);
      const dbPath = join(srcPath, "db");
      const apiPath = join(srcPath, "api");
      const servicePath = join(srcPath, "services");
      const managerPath = join(srcPath, "manager");
      // --db --api --service --manager 根据参数生成文件
      const pathGroup = [
        {
          key: FILE_TYPE.DB,
          path: dbPath,
        },
        {
          key: FILE_TYPE.API,
          path: apiPath,
        },
        {
          key: FILE_TYPE.SERVICE,
          path: servicePath,
        },
        {
          key: FILE_TYPE.MANAGER,
          path: managerPath,
        },
      ];
      console.log(pathGroup);

      const tempPath = join(basePath, "scripts/buildNewService", "template");
      pathGroup.forEach((item) => {
        if (defaultConfig[item.key]) {
          const logName = `${serviceName} ${item.key}文件是否存在`;
          const checkFilePath = join(item.path, serviceName + ".ts");
          const isFileExist = fs.existsSync(checkFilePath);
          if (isFileExist) {
            console.log(logName, isFileExist);
            // 是否要覆盖
          } else {
            console.log(logName, isFileExist);

            const tempFilePath = join(tempPath, item.key + ".ts");
            const targetFile = join(item.path, serviceName + ".ts");

            const fileContent = buildFileContent({
              filePath: tempFilePath,
              replaceName: serviceName,
              type: item.key,
              cname: config.serviceCname,
              baseMicroServicePath,
            });

            writeServiceFile(targetFile, fileContent);
          }
        }
      });
    });
  })
  .on("--help", () => {
    console.log("  Examples:");
    console.log("");
    console.log("$ yarn create-service start");
  });
program.parse(process.argv);
