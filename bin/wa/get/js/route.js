`use strict`;

class Route {

  constructor () { this.State = [] }

  getState () {

    let url = (`./${window.location}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
      return String.fromCharCode(parseInt(hex, 16))
    });

    this.State = url;

    this.State = url.split(`/`);
  }

  Call () {

    View.pop();

        this.getState();

        let State = this.State;

    if (State.length === 4 && State[3] === ``) { 

            document.title = `Sojava | GRIT & GRUB`;

            let XHR = Tools.pull([
                `/json/web`, {
                    mug: (Clients.mug) ? Clients.mug: false,
                    pull: `app`
                }]);

      XHR.onload = () => { 

                let Obj = Tools.typen(XHR.response);

        Clients.incoming = Tools.coats(Obj.incoming);

                View.DOM([`div`, [Models.app.a(Obj)]]);

                Event.app([Obj]);
            }
        }
    }
}

Route = new Route();