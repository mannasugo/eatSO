`use strict`;

const { createSecureServer } = require(`http2`);

const { createHash } = require(`crypto`);

const { readFileSync, statSync, writeFileSync } = require(`fs`);

const { Constants, Sql, Tools } = require(`./tools`);

const { Call, io } = require(`./route`);

//const { SMTPServer } = require(`smtp-server`);

//const { simpleParser } = require(`mailparser`);

Sql.Sql([readFileSync(`bin/sql.sql`, {encoding: `utf8`}), () => {}]);

let App = createSecureServer({
  key: readFileSync(`http2/ssl/privkey.pem`),
  cert: readFileSync(`http2/ssl/fullchain.pem`),
  allowHTTP1: true}, (call, put) => {Call([call, put])});

App.on(`error`, (err) => console.error(err));

App.listen(8124);

io(require(`socket.io`)(App));

Tools.csv();

/**

let Mail = new SMTPServer({

	onData(via, state, call) {

		simpleParser(via, (fail, Value) => {

			if (fail) {

				console.error(`Mail fail:`, fail);

				return call(fail);
			}

			console.log(`Mail from:`, Value.from.text);

			console.log(`Subject:`, Value.subject);

			call();
		});
	}
});

Mail.listen(2525, `0.0.0.0`, () => {console.log(`Plug SMTP on port 2525`)});

Mail.on(`fail`, fail => console.error(fail));
**/