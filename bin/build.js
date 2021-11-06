const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async function main() {
    try {
        const is_windows = process.platform === "win32";
//        await exec('git fetch');
//        const tags = await exec('git tag');
//        const version = tags.stdout.trim().split("\n")[tags.stdout.trim().split("\n").length - 1];
        const version = "3.3.3";
        const build = await exec(`${is_windows ? "SET " : ""}VERSION=${version} && node scripts/build.js`);
        console.log("start", version)
        console.log(build.stdout)
    } catch (e) {
        console.error(e);
    }
}());
