const fs = require("fs");




var md_file = "";
var md_obj = [];
(async () => {


  // first we will go through every single json file, then within each file
  // loop through the top level array, creating a new array of objects, containing
  // only the data needed to make the docs.

  try {

    const files = fs.readdirSync("./repo-json");

    for await (const file of files) {
      let raw = fs.readFileSync(`./repo-json/${file}`, {encoding: "utf8" });
      let data = JSON.parse(raw);

      for (let i = 0; i < data.length; i++) {
        md_obj.push({
          name: data[i].name,
          url: data[i].html_url,
          repo: data[i].full_name,
          desc: data[i].description
        });
      }

    }

    await mdGen();

    // once thats done, lets write the file.
    fs.writeFileSync("repo.md", md_file);

  } catch(err) {
    console.error(err);
  }

})();

async function mdGen() {
  md_file += `| Name | Latest Commit | Latest Tag | Issues | License | Primary Language | Forks | Stars | Description |`
  md_file += `| ---- | ------------- | ---------- | ------ | ------- | ---------------- | ----- | ----- | ----------- |`
  for (let i = 0; i < md_obj.length; i++) {
    let tmp = [
      `| [${md_obj[i].name}](${md_obj[i].url}) | `,
      `![GitHub last commit](https://img.shields.io/github/last-commit/${md_obj[i].repo}?style=flat-square) | `
      `![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/${md_obj[i].repo}?style=flat-square) | `,
      `![GitHub issues](https://img.shields.io/github/issues/${md_obj[i].repo}?style=flat-square) | `,
      `![GitHub License](https://img.shields.io/github/license/${md_obj[i].repo}?style=flat-square) | `,
      `![GitHub top language](https://img.shields.io/github/languages/top/${md_obj[i].repo}?style=flat-square) | `,
      `![GitHub Forks](https://img.shields.io/github/forks/${md_obj[i].repo}?style=flat-square) | `,
      `![GitHub Stars](https://img.shields.io/github/stars/${md_obj[i].repo}?style=flat-square) | `,
      `${md_obj[i].desc} |`
    ];

    md_file += tmp.join('')

  }
}
