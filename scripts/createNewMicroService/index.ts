/**
 * @description 创建新的微服务文件结构
 */
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import program from "commander";
import inquirer from "inquirer";
import _ from "lodash";
import chalk from "chalk";

program
  .command("start")
  // .alias("")
  .description("创建新的服务")
  .option("--name [serviceName]")
  .option("--cname [serviceCname]")
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
      console.log(chalk.blue("配置完成，开始生成文件夹。。。"));

      config = _.assign(config, answers);
      config[answers["fileType"]] = true;
      console.log(answers);

      let defaultConfig: any = {
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
      console.log(config, "config...");
      console.log(defaultConfig, "defaultConfig...");
      // 创建一个README

      const targetPath = join(
        __dirname,
        "../",
        "../",
        "micro-services",
        config.serviceName + "-service"
      );
      const targetSrcPath = join(targetPath, "src");
      if (!existsSync(targetPath)) {
        console.log("创建src");
        mkdirSync(targetPath);
        mkdirSync(targetSrcPath);
      }
      if (!existsSync(targetSrcPath)) {
        mkdirSync(targetSrcPath);
      }
      const readmePath = join(targetSrcPath, "README.md");
      if (!existsSync(readmePath)) {
        console.log("创建readme");
        writeFileSync(
          readmePath,
          `### @description ${config.serviceCname} - 微服务`
        );
      }
      // 还差把新的服务插入配置文件 __dirname
      Object.keys(defaultConfig).forEach((key) => {
        const childTargetUrl = join(targetSrcPath, key);
        if (defaultConfig[key] && !existsSync(childTargetUrl)) {
          mkdirSync(join(childTargetUrl));
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
