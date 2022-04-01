const fs = require("fs");
const path = require("path");
const es = require("event-stream");

let requests = 0;

/**
 * @type {import('express').RequestHandler}
 */
exports.linesHandler = async (req, res, next) => {
  try {
    let isFirst = true;
    res.set("content-type", "application/json");

    const asyncWrite = (data) =>
      new Promise((resolve, reject) => {
        let isWait = false;
        isWait = !res.write(data, (err) => {
          if (err) {
            return reject();
          }

          // if high watermark reached!
          if (isWait) {
            res.once("drain", resolve); // delay until stream drains
          } else {
            resolve();
          }
        });
      });
    await asyncWrite("[");
    fs.createReadStream(path.resolve("out.txt"))
      .pipe(es.split())
      .pipe(
        es.map(async (line, cb) => {
          const isCurrFirst = isFirst;
          isFirst = false;
          cb(null, `${isCurrFirst ? "" : ","}"${line}"`);
        })
      )
      .on("end", async () => {
        await asyncWrite("]");
        res.end();
      })
      .pipe(res, { end: false })
      .on("error", (err) => {
        console.error(err);
      });
  } catch (err) {
    next(err);
  }
};

/**
 * @type {import('express').RequestHandler}
 */
// exports.linesHandler = async (req, res, next) => {
//   try {
//     requests += 1;
//     const i = requests;
//     let isFirst = true;
//     res.set("content-type", "application/json");

//     const asyncWrite = (data) =>
//       new Promise((resolve, reject) => {
//         let isWait = false;
//         isWait = !res.write(data, (err) => {
//           if (err) {
//             return reject();
//           }

//           // if high watermark reached!
//           if (isWait) {
//             res.once("drain", resolve); // delay until stream drains
//           } else {
//             resolve();
//           }
//         });
//       });
//     await asyncWrite("[");
//     fs.createReadStream(path.resolve("out.txt"))
//       .pipe(es.split())
//       .pipe(
//         es.map(async (line, cb) => {
//           await asyncWrite(`${isFirst ? "" : ","}"${line.split(" ")[0]}"`);
//           isFirst = false;
//           res.flushHeaders();
//           cb();
//         })
//       )
//       .on("error", (err) => {
//         console.error(err);
//       })
//       .on("end", async () => {
//         await asyncWrite("]");
//         res.end();
//         requests += 1;
//       });
//   } catch (err) {
//     next(err);
//   }
// };
