`use strict`;

const { readdir, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const { Constants, Pay, Sql, Tools } = require(`./tools`);

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

                let Via = [];

                if (Raw.mugs[1][Pulls.mug]) {

                  Raw.incoming[0].forEach(Obj => {

                    if (Obj.mug === Pulls.mug && Obj.state === `queue`) {Via.push(Obj.invoice)}
                  });
                }

                Arg[1].end(Tools.coats({catalog: Objs, incoming: Via}));
              }

              if (Pulls.pull === `incoming`) {

                let Via = [];

                if (Raw.mugs[1][Pulls.mug]) {

                  Raw.incoming[0].forEach(Obj => {

                    if (Obj.mug === Pulls.mug) {Via.push(Obj)}
                  });

                  Arg[1].end(Tools.coats({incoming: Via}));
                }
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

                      //Tools.mailto([`mailto@eatso.store`, `Mann2asugo`, Pulls.email, Constants.mail.init]);

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
                    
                    Pay.inta.collection()
                      .mpesaStkPush({
                        email: Raw.mugs[1][Pulls.mug].email,
                        host: `https://sojava.xyz`,
                        amount: parseFloat(Pulls.float),
                        phone_number: `254` + Pulls.call,
                        api_ref: md})
                      .then((Blob) => {

                      if (Blob.id) {

                        Sql.puts([`incoming`, {
                          float: parseFloat(Pulls.float),
                          id: `254` + Pulls.call,  
                          info: Pulls.box,
                          invoice: Blob.invoice.invoice_id, 
                          md: md,
                          mug: Pulls.mug, 
                          state: `queue`,
                          ts: ts,
                          tx: Blob.id}, (Bill) => {Arg[1].end(Tools.coats({tx: Blob.id}))}]);
                        }
                      })
                    .catch((flaw) => {console.error(`BUG_REPORT:`, flaw)});
                  }
                }
              }
            });
          }
        }
      });
    }
  }

  io (App) {

    App.on(`connection`, Polling => {

      Polling.on(`incoming`, Arg => {

        Sql.pulls(Raw => {

          let Yet = []

          Raw.incoming[0].forEach(Obj => {

            if (Obj.mug === Arg[0] && Arg[1].indexOf(Obj.invoice) > -1 && Obj.state === `queue`) Yet.push([Obj.invoice, Obj.md])
          });

          Yet.forEach(Obj => {

            Pay.inta.collection()
            .status(Obj[0])
            .then((Blob) => {

              if (Blob.invoice.state === `COMPLETE` && !Raw.ledge[1][Obj[1]]) {

                let Old = Tools.typen(Tools.coats(Raw.incoming[1][Obj[1]]));

                Raw.incoming[1][Obj[1]].state = `complete`;

                Sql.places([`incoming`, Raw.incoming[1][Obj[1]], Old, (Q) => {}]);
              }

              if (Blob.invoice.state === `FAILED`) {

                let Old = Tools.typen(Tools.coats(Raw.incoming[1][Obj[1]]));

                Raw.incoming[1][Obj[1]].state = `fail`;

                Sql.places([`incoming`, Raw.incoming[1][Obj[1]], Old, (Q) => {}])
              }
            })
            .catch((flaw) => {console.error(`STATUS:`, flaw)});
          });

          let Queue = [];

          Raw.incoming[0].forEach(Obj => { if (Obj.mug === Arg[0] && Obj.state === `queue`) { Queue.push(Obj.invoice) } });

          App.emit(`incoming`, [Arg[0], Queue])
        });
      });
    });
  }
}

module.exports = new Route();