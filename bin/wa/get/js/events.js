`use strict`;

class Event {

  listen (Arg) { 

    (Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
  }

  getSource (Arg) {

    if (Arg.target) return Arg.target;
  }

  app (Arg) {

    let Catalog = {};

    Arg[0].catalog.forEach(Cat => {

      Cat.pay = {};

      Cat.objs.forEach((A) => {Cat.pay[A[0]] = A[1]});

      Catalog[Cat.ts] = Cat;
    });

    document.querySelectorAll(`.box`).forEach((VAR, NODE) => {

            this.listen([VAR, `click`, S => {

                let Slot = VAR.parentNode.parentNode;

                let METER = VAR.parentNode.children;

                if (!Clients.box) {Clients.box = Tools.coats({})}

                let Box = Tools.typen(Clients.box);

                if (Catalog[Slot.id].objs.length === 1) {let items = 0;

                    if (VAR.getAttribute(`role`) === `+`) {

                        if (!Tools.typen(Clients.box)[Slot.id]) {

                            Box[Slot.id] = {
                                label: Catalog[Slot.id].label.toString().replace(`_`, ` `), 
                                mass: Catalog[Slot.id].mass, 
                                objs: {[VAR.parentNode.id]: [Catalog[Slot.id].pay[VAR.parentNode.id], 1]}};

                            Clients.box = Tools.coats(Box);
                        }

                        else if (Tools.typen(Clients.box)[Slot.id]) {

                            Box[Slot.id].objs[VAR.parentNode.id][1] += 1;

                            Clients.box = Tools.coats(Box);
                        }

                        VAR.previousSibling.innerText = Box[Slot.id].objs[VAR.parentNode.id][1];

                        VAR.previousSibling.style.display = `flex`;

                        VAR.previousSibling.previousSibling.style.display = `flex`;
                    }

                    if (VAR.getAttribute(`role`) === `-`) {

                        if (Tools.typen(Clients.box)[Slot.id] && Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.id]) {

                            Box = Tools.typen(Clients.box);

                            Box[Slot.id].objs[VAR.parentNode.id][1] -= 1;

                            if (Box[Slot.id].objs[VAR.parentNode.id][1] === 0) {

                                let Objects = {};

                                for (let item in Box) {

                                    if (item !== Slot.id) Objects[item] = Box[item];
                                }

                                Box = Objects;

                                VAR.style.display = `none`;

                                VAR.nextSibling.style.display = `none`;
                            }

                            Clients.box = Tools.coats(Box);

                            VAR.nextSibling.innerText = (!Box[Slot.id])? 0: Box[Slot.id].objs[VAR.parentNode.id][1];
                        }                       
                    }

                    for (let item in Box) {++items}

                    document.querySelectorAll(`#menu-box-list ._gZz`)[0].innerText = items;
                }

                if (Catalog[Slot.id].objs.length > 1) {

                    View.pop();

                    View.DOM([`#modal`, [Models.app.multi(Catalog[Slot.id])]]);

                    document.querySelector(`#modal`).style.display = `flex`;

                    document.querySelectorAll(`.multibox`).forEach(VAR => {

                        this.listen([VAR, `click`, S => {

                            let items = 0, bag = 0;

                            if (VAR.getAttribute(`role`) === `-`) {

                                if (Tools.typen(Clients.box)[Slot.id] && Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

                                    Box = Tools.typen(Clients.box);

                                    Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] -= 1;

                                    if (Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] === 0) {

                                        let Objs = {};

                                        for (let obj in Box[Slot.id].objs) {

                                            if (obj !== VAR.parentNode.parentNode.id) Objs[obj] = Box[Slot.id].objs[obj];
                                        };

                                        Box[Slot.id].objs = Objs;

                                        let Objects = {};

                                        for (let item in Box) {

                                            let objs = 0

                                            for (let obj in Box[item].objs) {objs++}

                                            if (objs > 0) Objects[item] = Box[item];
                                        }

                                        Box = Objects;

                                        METER[0].style.display = `none`;

                                        METER[1].style.display = `none`;
                                    }

                                    Clients.box = Tools.coats(Box);

                                    if (Box[Slot.id]) {

                                        for (let item in Box[Slot.id].objs) {items += parseFloat(Box[Slot.id].objs[item][1])}METER[1].innerText = items;

                                        METER[0].style.display = `flex`;

                                        METER[1].style.display = `flex`;
                                    }

                                    VAR.nextSibling.innerText = (!Box[Slot.id] || !Box[Slot.id].objs[VAR.parentNode.parentNode.id])? 0: Box[Slot.id].objs[VAR.parentNode.parentNode.id][1];             
                                }
                            }

                            if (VAR.getAttribute(`role`) === `+`) {

                                if (!Tools.typen(Clients.box)[Slot.id]) {

                                    Box[Slot.id] = {label: Catalog[Slot.id].label.toString().replace(`_`, ` `), mass: Catalog[Slot.id].mass, objs: {}};

                                    Clients.box = Tools.coats(Box);
                                }

                                if (Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

                                    Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] += 1;

                                    Clients.box = Tools.coats(Box);
                                }

                                if (Tools.typen(Clients.box)[Slot.id] && !Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

                                    Box[Slot.id].objs[VAR.parentNode.parentNode.id] = [Catalog[Slot.id].pay[VAR.parentNode.parentNode.id], 1];

                                    Clients.box = Tools.coats(Box);
                                }

                                for (let item in Box[Slot.id].objs) {items += parseFloat(Box[Slot.id].objs[item][1])}

                                VAR.previousSibling.innerText = Box[Slot.id].objs[VAR.parentNode.parentNode.id][1];

                                METER[1].innerText = items;

                                METER[0].style.display = `flex`;

                                METER[1].style.display = `flex`;
                            }

                            for (let item in Box) {++bag}

                            document.querySelectorAll(`#menu-box-list ._gZz`)[0].innerText = bag;
                        }]);
                    });

                    this.listen([document.querySelector(`#multiClose`), `click`, S => {document.querySelector(`#modal`).style.display = `none`;}]);
                }
            }]);
    });

    this.listen([document.querySelector(`#menu-box`), `click`, S => {

      if (Clients.mug) {

        let XHR = [];

        XHR[0] = Tools.pull([
          `/json/web/`, { 
            mug: Clients.mug, pull: `incoming`}]);

        XHR[0].onload = () => {

          XHR[1] = Tools.typen(XHR[0].response);console.log(XHR[1])

          document.querySelector(`#incoming ._gZz`).innerHTML = XHR[1].incoming.length;
        }
      }

      document.querySelector(`#menu-box-list`).style.display = (document.querySelector(`#menu-box-list`).style.display === `flex`)? `none`: `flex`;
    }]);

    this.listen([document.querySelector(`#boxup`), `click`, S => {

      document.querySelector(`#menu-box-list`).style.display = `none`;

      let boxup = () => {

        View.pop();

        View.DOM([`#modal`, [Models.app.boxup()]]);

        document.querySelector(`#modal`).style.display = `flex`;

                if (document.querySelector(`.multibox`)) {

                    document.querySelectorAll(`.multibox`).forEach(VAR => {

                        this.listen([VAR, `click`, S => {

                            let Slot = Tools.typen(VAR.parentNode.id);

                            let METER = document.querySelector(`.g${Slot[0]} .scale`).children;

                            let Box = Tools.typen(Clients.box), float = 0, items = 0, bag = 0;

                            if (VAR.getAttribute(`role`) === `-`) {

                                if (Tools.typen(Clients.box)[Slot[0]] && Tools.typen(Clients.box)[Slot[0]].objs[Slot[1]]) {

                                    Box = Tools.typen(Clients.box);

                                    Box[Slot[0]].objs[Slot[1]][1] -= 1;

                                    if (Box[Slot[0]].objs[Slot[1]][1] === 0) {

                                        let Objs = {};

                                        for (let obj in Box[Slot[0]].objs) {

                                            if (obj !== Slot[1]) Objs[obj] = Box[Slot[0]].objs[obj];
                                        }

                                        Box[Slot[0]].objs = Objs;

                                        let Objects = {};

                                        for (let item in Box) {

                                            let objs = 0

                                            for (let obj in Box[item].objs) {objs++}

                                            if (objs > 0) Objects[item] = Box[item];
                                        }

                                        Box = Objects;

                                        METER[0].style.display = `none`;

                                        METER[1].style.display = `none`;

                                        Clients.box = Tools.coats(Box);

                                        boxup();
                                    }

                                    Clients.box = Tools.coats(Box);

                                    if (Box[Slot[0]]) {

                                        for (let item in Box[Slot[0]].objs) {items += parseFloat(Box[Slot[0]].objs[item][1])}

                                        METER[1].innerText = items;

                                        METER[0].style.display = `flex`;

                                        METER[1].style.display = `flex`;
                                    }

                                    VAR.nextSibling.innerText = (!Box[Slot[0]] || !Box[Slot[0]].objs[Slot[1]])? 0: Box[Slot[0]].objs[Slot[1]][1];

                                    VAR.parentNode.parentNode.querySelector(`.sum`).innerText = (!Box[Slot[0]] || !Box[Slot[0]].objs[Slot[1]])? 0: parseFloat(Box[Slot[0]].objs[Slot[1]][1]*Box[Slot[0]].objs[Slot[1]][0]).toFixed(2);
                                }
                            }

                            if (VAR.getAttribute(`role`) === `+`) {

                                if (Tools.typen(Clients.box)[Slot[0]].objs[Slot[1]]) {

                                    Box[Slot[0]].objs[Slot[1]][1] += 1;

                                    Clients.box = Tools.coats(Box);
                                }

                                VAR.previousSibling.innerText = Box[Slot[0]].objs[Slot[1]][1];

                                VAR.parentNode.parentNode.querySelector(`.sum`).innerText = parseFloat(Box[Slot[0]].objs[Slot[1]][1]*Box[Slot[0]].objs[Slot[1]][0]).toFixed(2);
                            
                                for (let item in Box[Slot[0]].objs) {items += parseFloat(Box[Slot[0]].objs[item][1])}

                                METER[1].innerText = items;

                                METER[0].style.display = `flex`;

                                METER[1].style.display = `flex`;
                            }

                            for (let item in Box) {

                                ++bag;

                                for (let obj in Box[item].objs) {float += parseFloat(Box[item].objs[obj][1]*Box[item].objs[obj][0])}
                            }

                            document.querySelectorAll(`#menu-box-list ._gZz`)[0].innerText = bag;

                            document.querySelector(`#total`).innerText = float.toFixed(2);
                        }]);
                    });
                }

                this.listen([document.querySelector(`#paymug`), `click`, S => {
                
                    if (!Clients.mug) {

                        View.pop();

                        View.DOM([`#modal`, [Models.app.inputMug([0])]]);

                        this.mug();
                    }

                    if (Clients.mug) {

                        View.pop();

                        View.DOM([`#modal`, [Models.app.pay()]]);

                        let Box = Tools.typen(Clients.box), float = 0;

                        for (let item in Box) {

                            for (let obj in Box[item].objs) {float += parseFloat(Box[item].objs[obj][1]*Box[item].objs[obj][0])}
                        }

                        document.querySelector(`#total`).innerText = float.toFixed(2);

                        this.listen([document.querySelector(`#callSlot`), `keyup`, S => {

                            let Slot = this.getSource(S);

                            if (!parseInt(Slot.value)) Slot.value = 0;

                            if (Slot.value.length > 9) Slot.value = Slot.value.substr(0, 8);

                            Slot.value = parseInt(Slot.value);
                        }]);

                        this.listen([document.querySelector(`#mpesa`), `click`, S => {

                            let Values = [(!Tools.slim(document.querySelector(`#callSlot`).value))? false: Tools.slim(document.querySelector(`#callSlot`).value)];

                            if (Values[0] === false || typeof parseFloat(Values[0]) !== `number` || Values[0].toString().length !== 9) return;

                            let XHR = [];

                            XHR[0] = Tools.pull([
                                `/json/web/`, { 
                                    box: Tools.typen(Clients.box),
                                    call: parseFloat(Values[0]),
                                    flag: `incoming`,
                                    float: parseFloat(float),
                                    mug: Clients.mug, 
                                    pull: `pay`}]);

                            Values = [];

                            document.querySelector(`#modal`).style.display = `none`

                            XHR[0].onload = () => {

                                XHR[1] = Tools.typen(XHR[0].response);
                            }
                        }]);

                        this.listen([document.querySelector(`#payx`), `click`, S => {document.querySelector(`#modal`).style.display = `none`}]);
                    }
                }]);

                this.listen([document.querySelector(`#boxClose`), `click`, S => {document.querySelector(`#modal`).style.display = `none`}]);
      }

      boxup();
    }]);

    this.listen([document.querySelector(`#incoming`), `click`, S => {

      if (Clients.mug) {

        let XHR = [];

        XHR[0] = Tools.pull([
          `/json/web/`, { 
            mug: Clients.mug, pull: `incoming`}]);

        XHR[0].onload = () => {

          XHR[1] = Tools.typen(XHR[0].response);

          View.pop();

          View.DOM([`#modal`, [Models.app.incoming(XHR[1].incoming)]]);

          document.querySelector(`#modal`).style.display = `flex`;

          this.listen([document.querySelector(`#incoming-`), `click`, S => {document.querySelector(`#modal`).style.display = `none`}]);
        }
      }
    }]);

    setInterval(() => { 

      let ts = new Date().valueOf();

      if (Tools.typen(Clients.incoming).length > 0 && Clients.mug) { io().emit(`incoming`, [Clients.mug, Tools.typen(Clients.incoming)])}
    }, 5000);

    io().on(`incoming`, Obj => { if (Clients.mug && Clients.mug === Obj[0]) { Clients.incoming = Tools.coats(Obj[1]) } });   
  }

  mug () {

        if (document.querySelector(`#modalMugin`)) {

            this.listen([document.querySelector(`#modalMugin`), `click`, S => {

                View.pop();

                View.DOM([`#modal`, [Models.app.inputMug([2])]]);

                this.mug()
            }]);
        }

        if (document.querySelector(`#modalMugup`)) {

            this.listen([document.querySelector(`#modalMugup`), `click`, S => {

                View.pop();

                View.DOM([`#modal`, [Models.app.inputMug([0])]]);

                this.mug()
            }]);
        }

        if (document.querySelector(`#emailAvail`)) {

            this.listen([document.querySelector(`#emailAvail`), `click`, S => {

                if (!Tools.slim(document.querySelector(`input#email`).value) === true) return;

                let XHR = Tools.pull([
                    `/json/web`, {email: document.querySelector(`input#email`).value, flag: `emailAvail`, pull: `mug`}]);

                document.querySelector(`input#email`).value = ``;

                XHR.onload = () => {

                    let Obj = Tools.typen(XHR.response);

                    if (Obj.email) {

                        View.pop();

                        View.DOM([`#modal`, [Models.app.inputMug([1])]]);

                        this.listen([document.querySelector(`#saltAvail`), `click`, S => {

                            if (!Tools.slim(document.querySelector(`input#lock`).value) === true) return;

                            let XHR = Tools.pull([
                                `/json/web`, {email: Obj.email, salt: document.querySelector(`input#lock`).value, flag: `saltAvail`, pull: `mug`}]);

                            XHR.onload = () => {

                                let Obj = Tools.typen(XHR.response);

                                if (Obj && Obj.md) {

                                    Clients.mug = Obj.md;

                                    window.location = window.location;
                                }
                            }
                        }]);
                    }
                }
            }]);
        }

        if (document.querySelector(`#emailSalt`)) {

            this.listen([document.querySelector(`#emailSalt`), `click`, S => {

                if (!Tools.slim(document.querySelector(`input#email`).value) === true || !Tools.slim(document.querySelector(`input#salt`).value) === true) return;

                let XHR = Tools.pull([
                    `/json/web`, {
                        email: document.querySelector(`input#email`).value, flag: `emailSalt`, pull: `mug`, salt: document.querySelector(`input#salt`).value}]);

                XHR.onload = () => {

                    let Obj = Tools.typen(XHR.response);

                    if (Obj && Obj.md) {

                        Clients.mug = Obj.md;

                        window.location = window.location;
                    }
                }
            }]);
        }
    }
}

Event = new Event;