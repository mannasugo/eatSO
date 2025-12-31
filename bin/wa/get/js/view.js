`use strict`;

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00`).valueOf();

class View {

    constructor() {this.appendString = ``}

    ModelDOM(Model) {

        if (typeof Model !== `object`) return;

        Model.forEach(Obj => {

            let a = Obj[0], z, last;

            z = a; 

                if (a === `html`) a = `!doctype html><html`;

                this.appendString += `<` + a;
                
                for (let meta in Obj[1]) {

                    let value = ``;

                    if (meta === `style`) {

                        for (let style in Obj[1][meta]) {

                            value += `${style}:${Obj[1][meta][style]};`
                        }
                    }

                    else value = Obj[1][meta];

                    this.appendString += ` ${meta}='${value}'`;
                }

                this.appendString += `>`;
                
                if (Obj[2]) {

                    if (typeof Obj[2] === `object`) this.ModelDOM(Obj[2]);

                    else if (typeof Obj[2] === `string`) this.appendString += Obj[2];
                }

                let Queer = [`img`, `input`, `meta`];

                if (!Queer.indexOf(z) > -1) this.appendString += `</` + z + `>`;
        });

        return Tools.plains(this.appendString);
    }

    DOM(Arg) { document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]) }

    pop () {this.appendString = ``};
}

let Models = {

  app: {

    a: (Obj) => {

      let DOM = [[]];

      if (!Clients.box) {Clients.box = Tools.coats({})}

      let Box = Tools.typen(Clients.box);

      Obj.catalog.forEach(Cat => {

        if (new Date().valueOf() > DAY + parseFloat(Cat.avail[0])*60*60000 && new Date().valueOf() < DAY + parseFloat(Cat.avail[1])*60*60000) {

          let State = [0, `none`];

          if (Box[Cat.ts]) {

            for (let item in Box[Cat.ts].objs) {State[0] += parseFloat(Box[Cat.ts].objs[item][1])}

            if (State[0] > 0) {State[1] = `flex`};
          }
                
          DOM[0].push([`div`, {id: Cat.ts, class: `g${Cat.ts}`, style: {height: `${180}px`, [`justify-content`]: `end`, [`margin-bottom`]: `${24}px`}}, 
            [[`img`, {src: `wa/get/catalog/${Cat.img}`, style: {margin: `${0} auto ${8}px`, width: `${70}%`}}],
            [`div`, {class: `_gxM`, style: {[`font-family`]: ``,[`font-size`]: `${12.88}px`, [`font-weight`]: 600}}, 
                            [[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {}, `${parseFloat(Cat.objs[0][1]).toFixed(2)}`]]],
                        [`span`, {style: {[`font-family`]: ``,[`font-size`]: `${11}px`, margin: `${4}px ${0}`, overflow: `hidden`, [`text-transform`]: `capitalize`, [`text-overflow`]: `ellipsis`, [`white-space`]: `nowrap`}}, Cat.label.replaceAll(`_`, ` `)],
                        [`span`, {style: {[`font-size`]: `${9}px`}}, Cat.objs[0][0] + Cat.mass],
                        [`div`, {id: Cat.objs[0][0], class: `_geQ scale`, style: {background: `#000000e3`, top: 0, color: `#fff`, position: `absolute`, right: 0}}, 
                            [[`svg`, {class: `box`, role: `-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, display: State[1], height: `${11}px`, margin: `${8}px`, width: `${11}px`}}, 
                                [[`path`, {fill: `#000`, stroke: `#fff`, [`stroke-width`]: 1, d: `M0 12 24 12 `}]]], 
                            [`span`, {style: {background: `#fff`, color: `#000`, display: State[1], [`font-family`]: `insvg`, [`font-size`]: `${10.88}px`, [`justify-content`]: `center`, padding: `${8}px`, width: `${100}%`}}, `${State[0]}`],
                            [`svg`, {class: `box`, role: `+`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${11}px`, margin: `${8}px`, width: `${11}px`}}, 
                                [[`path`, {fill: `#000`, stroke: `#fff`, [`stroke-width`]: 1, d: `M0 12 24 12 M12 0 12 24`}]]]]]]])
                }
            });

            let BAG = [0];

            for (let item in Box) {++BAG[0]}

            return [
                `main`, {id: `app`, class: `_tY0`, style: {background: `#fff`, color: `#000`, [`font-family`]: `intext`, [`font-size`]: `${13.3333}px`, height: `${100}%`}}, 
                    [
                        [`div`, {style: {background: `#fff`, [`border-bottom`]: `${1}px solid #ececec`, height: `${48}px`, padding: `${0}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
                            [[`div`, {class: `_gxM _geQ`}, 
                                [
                                    [`span`, {style: {[`background-image`]: `url(wa/get/png/eatso.png)`, [`background-size`]: `${20}px`, height: `${20}px`, width: `${20}px`}}], 
                                    //[`div`, {class: `_eYG`, style: {[`margin-left`]: `${24}px`}}, [[`span`, {style: {[`font-family`]: `es`, [`font-size`]: `${12}px`, [`font-weight`]: 600}}, `eatso`]]],  
                                    [`div`, {class: `_eYG`}, []], 
                                    [`div`, {class: `_gZz`, style: {}}, 
                                        [[`svg`, {id: `menu-box`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${24}px`, width: `${24}px`}}, 
                                            [[`g`, {style: {fill: `none`, stroke: `#000`, [`stroke-width`]: 1}}, 
                                                [[`path`, {fill: `#fff`, d: `M0 2 3 2 8 19 16 19`}], 
                                                [`circle`, {r: 1.9, cx: 7.5, cy: 20.9}], 
                                                [`circle`, {r: 1.9, cx: 16.5, cy: 20.9}], 
                                                [`path`, {fill: `none`, d: `M6 13 17 13 20 4 6 4`}]]]]],
                                        [`div`, {id: `menu-box-list`, style: {background: `#fff`, border: `${1}px solid #f0f0f0de`, [`border-radius`]: `${2}px`, [`box-shadow`]: `${0} ${8}px ${64}px ${4}px rgba(${10},${14},${29},${.08})`, display: `none`, [`min-width`]: `${240}px`, position: `absolute`, right: 0, top: `${38}px`, [`z-index`]: 24}}, 
                                            [[`div`, {}, 
                                                [[`a`, {id: `boxup`, class: `_gxM _geQ`, href: `javascript:;`, style: {display: `flex`, padding: `${12}px ${20}px`}}, 
                                                    [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `qb`}}, `SHOPPING BAG`], [`div`, {class: `_gZz`}, `${BAG[0]}`]]],
                                                [`a`, {class: `_gxM _geQ`, href: `javascript:;`, style: {[`border-top`]: `1px solid #f0f0f0de`, display: /*(Clients.mug)? `flex`:*/ `none`, padding: `${12}px ${20}px`}}, 
                                                    [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `qb`}}, `OPEN ORDERS`], [`div`, {class: `_gZz`}, `4`]]]]]]]]]]]]], 
                        [`div`, {style: {margin: `${71}px ${24}px`}}, 
                            [
                            [`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `popular this hour`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]],
                                /*[`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `order it again`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]]*/]], 
                        [`div`, {id: `modal`, style: {background: `rgba(${217}, ${217}, ${217}, ${0.8})`, bottom: 0, display: `none`, position: `fixed`, top: 0, width: `${100}%`, [`z-index`]: 18}}]]];
    }, 

    boxup: () => {

      if (!Clients.box) {Clients.box = Tools.coats({})}

      let DOM = [[], []], float = 0, items = 0;

      for (let item in Tools.typen(Clients.box)) {

        ++items;

        DOM[1] = [];

        for (let sub in Tools.typen(Clients.box)[item].objs) {

                    float += parseFloat(parseFloat(Tools.typen(Clients.box)[item].objs[sub][0])*parseFloat(Tools.typen(Clients.box)[item].objs[sub][1]))

                    DOM[1].push([`div`, {class: `_gxM _geQ`, style: {margin: `${4}px ${0}`}}, 
                        [
                            [`span`, {style: {[`font-size`]: `${10}px`, [`font-weight`]: 600, [`text-transform`]: ``}}, `${sub}${Tools.typen(Clients.box)[item].mass}`], 
                            [`div`, {class: `_gZz`}, 
                                [[`div`, {}, 
                                    [
                                        [`div`, {class: `_gxM`, style: {[`font-size`]: `${12.88}px`, [`font-weight`]: 600, [`justify-content`]: `end`, [`margin`]: `${4}px ${5}px ${0} ${0}`}}, 
                                            [[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {class: `sum`}, `${parseFloat(parseFloat(Tools.typen(Clients.box)[item].objs[sub][0])*parseFloat(Tools.typen(Clients.box)[item].objs[sub][1])).toFixed(2)}`]]], 
                                        [`div`, {id: Tools.coats([item, sub]), class: `_gxM _geQ`, style: {[`margin-top`]: `${4}px`}}, 
                                            [
                                                [`svg`, {class: `multibox`, role: `-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
                                                    [[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `-`]]], 
                                                [`span`, {style: {margin: `${0} ${12}px`, [`text-align`]: `center`, width: `${36}px`}}, (!Clients.box || !Tools.typen(Clients.box)[item] || !Tools.typen(Clients.box)[item].objs[sub])? `0`: `${Tools.typen(Clients.box)[item].objs[sub][1]}`],
                                                [`svg`, {class: `multibox`, role: `+`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
                                                    [[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `+`]]]]]]]]]]]);
                }

                DOM[0].push([`div`, {style: {margin: `${10}px ${0}px`}}, 
                    [
                        [`div`, {class: `_gxM _geQ`}, 
                            [
                                [`img`, {src: `wa/get/catalog/${item}.png`, style: {[`width`]: `${36}px`}}], 
                                [`div`, {class: `_eYG`, style: {[`margin-right`]: `${6}px`}}, 
                                    [[`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `capitalize`}}, Tools.typen(Clients.box)[item].label]]]]], 
                        [`div`, {style: {[`margin-left`]: `${48}px`}}, DOM[1]]]]);
            }//#eb6538

            return [`div`, {style: {background: `#fff`, bottom: 0, left: 0, margin: `${48}px auto ${0}`, [`max-width`]: `${600}px`, position: `absolute`, right: 0, top: 0, width: `${100}%`}}, 
                [
                    [`div`, {style: {width: `${100}%`}}, 
                        [[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
                            [ 
                                [`div`, {style: {[`font-weight`]: 300}}, 
                                    [
                                        [`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `uppercase`}}, `Review Cart`],
                                        [`span`, {style: {color: `#9d9d9d`, [`font-size`]: `${11}px`, [`margin-top`]: `${3}px`}}, `Sojava`]]], 
                                [`div`, {class: `_gZz`}, 
                                    [[`svg`, {id: `boxClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
                                        [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M0 6 12 18 24 6`}]]]]]]], 
                        [`div`, {style: {height: `calc(100vh)`, [`max-height`]: `calc(100vh - 228px)`, [`overflow-y`]: `scroll`, padding: `${0}px ${16}px`}}, DOM[0]]]], 
                    [`div`, {style: {background: `#fff`, bottom: 0, display: (items > 0)? `flex` :`none`, position: `absolute`, width: `${100}%`}}, 
                        [[`div`, {style: {margin: `${24}px`}}, 
                            [
                                [`div`, {class: `_gxM _geQ`, style: {display: (items > 0)? `flex` :`none`, [`margin-bottom`]: `${12}px`}}, 
                                    [
                                        [`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `uppercase`}}, `Sub total`], 
                                        [`div`, {class: `_gZz`}, 
                                            [[`div`, {class: `_gxM`, style: {[`font-size`]: `${15}px`, [`font-weight`]: 300, [`justify-content`]: `end`}}, 
                                                [[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {id: `total`}, `${parseFloat(float).toFixed(2)}`]]]]]]],
                                [`div`, {style: {display: (!Clients.mug)? `flex`: `none`, [`margin-bottom`]: `${12}px`}}, 
                                    [[`span`, {style: {[`font-size`]: `${13}px`}}, `Almost There`], [`span`, {style: {color: `#747474`, [`font-size`]: `${11}px`, [`margin-top`]: `${3}px`}}, `Signin or Signup to place an order`]]],
                                [`a`, {id: `paymug`, href: `javascript:;`, style: {background: `#eb6538`, color: `#fff`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`padding`]: `${12}px`, [`text-align`]: `center`, [`text-transform`]: `uppercase`, width: `${100}%`}}, (!Clients.mug)? `Continue`: `proceed to checkout`]]]]]]]
    }, 

    inputMug: (Arg) => {

            let DOM = [];

            DOM[0] = [`section`, {}, 
                [
                    [`h2`, {style: {[`font-size`]: `${19}px`, [`margin-top`]: `${28}px`}}, `Welcome to Sojava`],
                    [`div`, {style: {[`margin-top`]: `${22}px`}}, 
                        [
                            [`label`, {style: {[`font-size`]: `${10.88}px`, [`margin-bottom`]: `${3}px`}}, `Email`], 
                            [`input`, {id: `email`, placeholder: `Email`, type: `email`, style: {background: `#66666629`, [`block-size`]: `${32}px`, border: `none`, [`font-family`]: `qb`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${1.2}px`, outline: `none`, padding: `${8}px ${12}px`, width: `${100}%`}}]]], 
                    [`a`, {id: `emailAvail`, href: `javascript:;`, style: {[`align-content`]: `center`, background: `#eb6538`, [`block-size`]: `${32}px`, color: `#fff`, display: `inline-grid`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${16}px`, [`text-align`]: `center`}}, `Continue`],
                    [`a`, {id: `modalMugin`, href: `javascript:;`, style: {color: `#eb6538`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${16}px`, [`text-align`]: `center`}}, `Sign in`]]];

            DOM[1] = [`section`, {}, 
                [
                    [`h2`, {style: {[`font-size`]: `${19}px`, [`margin-top`]: `${28}px`}}, `Welcome to Sojava`],
                    [`div`, {style: {[`margin-top`]: `${22}px`}}, 
                        [
                            [`label`, {style: {[`font-size`]: `${10.88}px`, [`margin-bottom`]: `${3}px`}}, `Password`], 
                        [`input`, {id: `lock`, placeholder: `Create password`, type: `password`, style: {background: `#66666629`, [`block-size`]: `${32}px`, border: `none`, [`font-family`]: `qb`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${1.2}px`, outline: `none`, padding: `${8}px ${12}px`, width: `${100}%`}}]]], 
                    [`a`, {id: `saltAvail`, href: `javascript:;`, style: {[`align-content`]: `center`, background: `#eb6538`, [`block-size`]: `${32}px`, color: `#fff`, display: `inline-grid`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${16}px`, [`text-align`]: `center`}}, `Continue`],
                    [`a`, {href: `javascript:;`, style: {color: `#eb6538`, display: `none`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${16}px`, [`text-align`]: `center`}}, `Sign in`]]];

            DOM[2] = [`section`, {}, 
                [
                    [`h2`, {style: {[`font-size`]: `${19}px`, [`margin-top`]: `${28}px`}}, `Sign in to Sojava`],
                    [`div`, {style: {[`margin-top`]: `${22}px`}}, 
                        [
                            [`label`, {style: {[`font-size`]: `${10.88}px`, [`margin-bottom`]: `${3}px`}}, `Email`], 
                            [`input`, {id: `email`, placeholder: `Email`, type: `email`, style: {background: `#66666629`, [`block-size`]: `${32}px`, border: `none`, [`font-family`]: `qb`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${1.2}px`, outline: `none`, padding: `${8}px ${12}px`, width: `${100}%`}}], 
                            [`label`, {style: {[`font-size`]: `${10.88}px`, [`margin-top`]: `${16}px`, [`margin-bottom`]: `${3}px`}}, `Password`], 
                            [`input`, {id: `salt`, placeholder: `Password`, type: `password`, style: {background: `#66666629`, [`block-size`]: `${32}px`, border: `none`, color: `#fff`, [`font-family`]: `qb`, [`font-size`]: `${11.88}px`, [`letter-spacing`]: `${1.2}px`, outline: `none`, padding: `${8}px ${12}px`, width: `${100}%`}}]]], 
                    [`a`, {id: `emailSalt`, href: `javascript:;`, style: {[`align-content`]: `center`, background: `#eb6538`, [`block-size`]: `${32}px`, color: `#fff`, display: `inline-grid`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${32}px`, [`text-align`]: `center`}}, `Continue`],
                    [`a`, {id: `modalMugup`, href: `javascript:;`, style: {color: `#eb6538`, [`font-size`]: `${11.88}px`, [`margin-top`]: `${16}px`, [`text-align`]: `center`}}, `Sign up`]]];

            return [`main`, {style: {background: `#fff`, margin: `auto`, [`max-width`]: `${400}px`, width: `${100}%`}}, 
                [[`section`, {style: {[`font-family`]: `qb`, margin: `${24}px`, [`max-width`]: `${100}%`}}, 
                    [[`h1`, {style: {color: `#eb6538`, [`font-family`]: `qb`, [`font-size`]: `${28}px`}}, `Sojava`], DOM[Arg[0]]]]]]
    },

    multi: (Obj) => {

      let DOM = [[]];

      Obj.objs.forEach(Value => {

        DOM[0].push([`div`, {id: Value[0], class: `_gxM _geQ`, style: {margin: `${6}px ${0}`}}, 
                    [
                        [`div`, {}, 
                            [
                                [`span`, {style: {[`font-size`]: `${10}px`, [`font-weight`]: 300, [`text-transform`]: `uppercase`}}, Value[0] + `` + Obj.mass.toLowerCase()],
                                [`div`, {class: `_gxM`, style: {[`font-family`]: ``, [`font-size`]: `${12.88}px`, [`margin-top`]: `${4}px`}}, 
                                    [[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {}, `${parseFloat(Value[1]).toFixed(2)}`]]]]], 
                        [`div`, {class: `_gZz`}, 
                            [
                                [`svg`, {class: `multibox`, role: `-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
                                    [[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `-`]]], 
                                [`span`, {style: {margin: `${0} ${12}px`, [`text-align`]: `center`, width: `${36}px`}}, (!Clients.box || !Tools.typen(Clients.box)[Obj.ts] || !Tools.typen(Clients.box)[Obj.ts].objs[Value[0]])? `0`: `${Tools.typen(Clients.box)[Obj.ts].objs[Value[0]][1]}`],
                                [`svg`, {class: `multibox`, role: `+`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
                                    [[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `+`]]]]]]]);
            });

            return [`div`, {style: {bottom: 0, left: 0, margin: `auto`, [`max-width`]: `${480}px`, position: `absolute`, right: 0, width: `${100}%`}}, 
                [[`div`, {style: {background: `#fff`, width: `${100}%`}}, 
                    [
                        [`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
                            [
                                [`img`, {src: `wa/get/catalog/${Obj.img}`, style: {[`width`]: `${36}px`}}], 
                                [`div`, {class: `_eYG`, style: {[`margin-right`]: `${6}px`}}, 
                                    [
                                        [`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `capitalize`}}, Obj.label.replaceAll(`_`, ` `)],
                                        [`span`, {style: {color: `#9d9d9d`, [`font-family`]: ``, [`font-size`]: `${9}px`, [`margin-top`]: `${6}px`}}, `${Obj.objs.length} OPTIONS AVAILABLE`]]], 
                                [`div`, {class: `_gZz`}, 
                                    [[`svg`, {id: `multiClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
                                        [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M0 6 12 18 24 6`}]]]]]]], 
                        [`div`, {style: {padding: `${10}px ${16}px`}}, DOM[0]]]]]];
        },

        pay: () => {

            return [`div`, {style: {background: `#fff`, bottom: 0, left: 0, margin: `${48}px auto ${0}`, [`max-width`]: `${600}px`, position: `absolute`, right: 0, width: `${100}%`}}, 
                [
                    [`div`, {style: {width: `${100}%`}}, 
                        [[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
                            [ 
                                [`div`, {style: {[`font-weight`]: 300}}, 
                                    [
                                        [`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `uppercase`}}, `Checkout`],
                                        [`span`, {style: {color: `#9d9d9d`, [`font-size`]: `${11}px`, [`margin-top`]: `${3}px`}}, `Sojava`]]], 
                                [`div`, {class: `_gZz _geQ`}, 
                                    [
                                        [`svg`, {viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${16}px`, width: `${16}px`}}, 
                                            [[`g`, {style: {fill: `none`, stroke: `#000`, [`stroke-width`]: 1}}, 
                                                [[`path`, {fill: `#fff`, d: `M0 2 3 2 8 19 16 19`}], [`circle`, {r: 1.9, cx: 7.5, cy: 20.9}], [`circle`, {r: 1.9, cx: 16.5, cy: 20.9}], [`path`, {fill: `none`, d: `M6 13 17 13 20 4 6 4`}]]]]], 
                                        [`div`, {class: `_gxM`, style: {[`font-size`]: `${15}px`, [`font-weight`]: 300, [`justify-content`]: `end`}}, 
                                            [[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {id: `total`}, `${parseFloat(0).toFixed(2)}`]]]]]]], 
                        [`div`, {style: {padding: `${0}px ${16}px`}}, 
                            [[`div`, {class: `_geQ _gxM`, style: {[`font-size`]: `${13}px`}}, 
                                [[`span`, {style: {margin: `${12}px ${0} ${0}`, }}, `Pay with`],
                                [`span`, {style: {margin: `${12}px ${0} ${0} ${8}px`, [`text-decoration`]: `underline`}}, `M-PESA(Mobile Money)`]]],
                            [`div`, {style: {[`margin-top`]: `${18}px`}}, 
                                [[`div`, {class: `_gxM _geQ`, style: {border: `1px solid rgba(${193}, ${193}, ${193}, ${.25})`, [`border-radius`]: `${100}px`, [`font-family`]: `intext`, [`font-size`]: `${13.33333}px`, height: `${36}px`, padding: `${12}px ${16}px`}}, 
                                    [[`img`, {src: `/wa/get/svg/geopo/ke.svg`, style: {[`max-width`]: `${18}px`}}],
                                        [`div`, {class: `_gxM`, style: {[`margin-left`]: `${8}px`}}, 
                                            [[`span`, {style: {color: `#515151`}}, `+254`]]], 
                                        [`div`, {class: `_gZz`}, 
                                            [[`div`, {style: {[`line-height`]: `${32}px`, width: `${100}%`}}, 
                                                [[`div`, {class: `_gxM _gZz _geQ`}, 
                                                    [[`input`, {id: `callSlot`, placeholder: `712345678`, style: {background: `transparent`, [`border-style`]: `none`, [`font-family`]: `intext`, [`letter-spacing`]: `${.75}px`, outline: `none`, padding: 0, [`text-align`]: `right`, width: `${100}%`}}]]]]]]]]]]],
                            [`a`, {id: `mpesa`, href: `javascript:;`, style: {background: `#eb6538`, color: `#fff`, [`font-size`]: `${13.33333}px`, margin: `${18}px ${0}`, [`padding`]: `${12}px`, [`text-align`]: `center`, width: `${100}%`}}, `CONTINUE`],
                            [`a`, {id: `payx`, href: `javascript:;`, style: {color: `#7d7d7d`, [`font-size`]: `${11.33333}px`, margin: `${0}px ${0} ${18}px`, [`text-align`]: `center`, width: `${100}%`}}, `CANCEL`]]]]]]]
        }
    }
}

View = new View;