`use strict`;

const { readdir, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const { Constants, Sql, Tools } = require(`./tools`);

const XHR = require(`https`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf(); 

class Route {

  Call (Arg) {

    let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => {

      return String.fromCharCode(parseInt(hex, 16));
    });

    let State = url.split(`/`);

    if (Arg[0].method === `GET`)  {

      if (State[1] === `favicon.ico`) {

        let File = createReadStream(`bin/wa/get/png/eatso.png`);

        Arg[1].writeHead(200, {[`Content-Type`]: `image/png`});

        File.on(`data`, Arg[1].write.bind(Arg[1]));

        File.on(`close`, () => Arg[1].end());
      }

      else {

        let DOM = readFileSync(`bin/app.html`, {encoding: `utf8`});

        let CSS = readFileSync(`bin/app.css`, {encoding: `utf8`});

        DOM = DOM.replace(/`css`/, CSS);

        Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

        Arg[1].end(DOM);
      }
    }

    else if (Arg[0].method == `POST`) {

      let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

      let Pull = ``;

      let allocate = 0;

      Arg[0].on(`data`, (Data) => {

        Data.copy(blob, allocate);

        allocate += Data.length;

        Pull += Data;

      }).on(`end`, () => {

        let Pulls;

        if (Pull[0] === `{`) Pulls = JSON.parse(Pull);

        if (State[1] === `json`) {

          Arg[1].setHeader(`Content-Type`, `application/json`);

          if (State[2] === `web`) {

            Sql.pulls(Raw => {

              if (Pulls.pull === `app`) {

                let Objs = Tools.typen(readFileSync(`bin/json/catalog.json`, {encoding: `utf8`}));

                /*

                let Catalog = [];

                Objs.forEach(Obj => {

                  if (new Date())
                });

                */

                Arg[1].end(Tools.coats({catalog: Objs}));
              }

              if (Pulls.pull === `mug`) { 

                if (Pulls.flag === `emailAvail`) {

                  let Mail = [];

                  Raw.mugs[0].forEach(Mug => {

                    if (Mug.email === Pulls.email) Mail.push(Pulls.email);
                  });

                  if (Mail.length === 0) {

                    Arg[1].end(Tools.coats({email: Pulls.email}));
                  }
                }

                if (Pulls.flag === `emailSalt`) {

                  let Obj = [];

                  Raw.mugs[0].forEach(Mug => {

                    if (Mug.email === Pulls.email 
                      && Mug.lock === createHash(`md5`).update(`${Pulls.salt}`, `utf8`).digest(`hex`)) {

                      Obj = [Mug.md];
                    }
                  });

                  if (Obj.length > 0) {

                    Arg[1].end(Tools.coats({md: Obj[0]}));
                  }
                }

                if (Pulls.flag === `saltAvail`) { 

                  let Mail = [];

                  Raw.mugs[0].forEach(Mug => {

                    if (Mug.email === Pulls.email) Mail.push(Pulls.email);
                  });

                  if (Mail.length === 0) {

                    let TZ = new Date().valueOf();

                    Sql.puts([`mugs`, {
                      email: Pulls.email,
                      lock: createHash(`md5`).update(Pulls.salt, `utf8`).digest(`hex`),
                      md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`),
                      stamp: TZ
                    }, (sqlObj) => {

                      Tools.mailto([`mailto@eatso.store`, `Mann2asugo`, Pulls.email, Constants.mail.init]);

                      Arg[1].end(Tools.coats({md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`)}));
                    }]);
                  }
                }
              }

              if (Pulls.pull === `pay`) {

                if (Raw.mugs[1][Pulls.mug]) {

                  if (Pulls.flag === `incoming`) {

                    let ts = new Date().valueOf();

                    let md = createHash(`md5`).update(`${ts}`, `utf8`).digest(`hex`);

                    let POST = XHR.request({
                          hostname: `backend.payhero.co.ke`,
                          port: 443,
                          path: `/api/v2/payments`,
                          method: `POST`,
                          headers: {
                            Authorization: `Basic ZmRqQjFUbmZJT05qZHFlRHc1Wnc6MHVFZEx3aU5YOTZ4anVodm5PSUNXZjBjUUNNeWFlUDRYMjVrbTFoOA==`,
                            [`Content-Type`]: `application/json`}}, Blob => {

                        let blob = ``;

                        Blob.on(`data`, (buffer) => {blob += buffer});
                            
                          Blob.on('end', () => {

                            if (blob) {console.log(blob)

                                  if (Tools.typen(blob).reference) {

                                    Sql.puts([`incoming`, {
                                      id: `0` + Pulls.call, 
                                      info: Pulls.box, 
                                      md: md,
                                      mug: Pulls.mug, 
                                      state: `queue`,
                                      ts: ts,
                                      tx: Tools.typen(blob).reference}, (Bill) => {

                                        Arg[1].end(Tools.coats({tx: Tools.typen(blob).reference}));
                                    }]);
                                  }
                                }
                            });
                      });

                    POST.write(Tools.coats({
                      account_id: 1955,
                      amount: parseFloat(Pulls.float),
                      channel_id: 2283,//3417, 
                      external_reference: md, 
                      network_code: `63902`,
                      phone_number: `254` + Pulls.call,
                      provider: `sasapay`}));

                    POST.end();
                  }
                }
              }
            });
          }
        }
      });
    }
  }

  io () {}

  pollPay () {

    setInterval(()=> {

      Sql.pulls(Raw => {

        Raw.incoming[0].forEach(Bill => {

          if (Bill.state === `queue`) {

            let POST = XHR.request({
                  hostname: `backend.payhero.co.ke`,
                  port: 443,
                  path: `/api/v2/transaction-status`,
                  method: `GET`,
                  headers: {
                    Authorization: `Basic ZmRqQjFUbmZJT05qZHFlRHc1Wnc6MHVFZEx3aU5YOTZ4anVodm5PSUNXZjBjUUNNeWFlUDRYMjVrbTFoOA==`,
                    [`Content-Type`]: `application/json`}}, Blob => {

              let blob = ``;

              Blob.on(`data`, (buffer) => {blob += buffer});
                            
                  Blob.on('end', () => {

                      if (blob) {

                        if (Tools.typen(blob).status === `SUCCESS`) {

                            let Old = Tools.typen(Tools.coats(Bill));

                            Bill.state = `complete`;

                    Sql.places([`invoice`, Bill, Old, (Q) => {}]);
                  }
                      }
                  });
            });

            POST.write(Tools.coats({reference: Bill.tx}));

            POST.end();
          }
        });
      });
    }, 120000);
  }
}

module.exports = new Route();