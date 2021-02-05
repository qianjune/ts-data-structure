import fs from "fs";
import path from "path";
import Router from "koa-router";
import xlsx from "node-xlsx";
const router = new Router({
  prefix: "/v1/excel",
});

router.get("/products", async (ctx) => {
  const data = [
    [1, 2, 3],
    [true, false, null, "sheetjs"],
    ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
    ["baz", null, "qux"],
  ];
  const options = {
    "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }],
  };

  let buffer = xlsx.build([{ name: "mySheetName", data }], options); // Returns a buffer
  const filePath = path.join(process.cwd(), `public/demo2.xlsx`);
  fs.writeFileSync(filePath, buffer);
  ctx.body = {
    url: "http://localhost:3111/demo2.xlsx",
  };
});

export default router;
