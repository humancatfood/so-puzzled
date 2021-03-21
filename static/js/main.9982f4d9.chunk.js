(this["webpackJsonpso-puzzled"]=this["webpackJsonpso-puzzled"]||[]).push([[0],{10:function(e,t,i){},12:function(e,t,i){"use strict";i.r(t);var a=i(1),n=i.n(a),c=i(5),r=i.n(c),s=(i(10),function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,13)).then((function(t){var i=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,r=t.getTTFB;i(e),a(e),n(e),c(e),r(e)}))}),d=i.p+"static/media/kitty.9149cd00.jpg",o=i(2),l=i(0);function h(e){var t=e.onStart;return Object(l.jsxs)("div",{children:[Object(l.jsx)("header",{className:"page-header",children:Object(l.jsxs)("h1",{children:["So Puzzled!! ",Object(l.jsx)("br",{})," ",Object(l.jsx)("small",{children:"A little puzzle game for practice, written in React and jQueryUI"})]})}),Object(l.jsxs)("section",{className:"jumbotron text-center",children:[Object(l.jsx)("h2",{children:"How to play:"}),Object(l.jsxs)("ol",{className:"text-left inline-block",children:[Object(l.jsxs)("li",{children:["Click the ",Object(l.jsx)("strong",{className:"",children:"Start"})," button"]}),Object(l.jsx)("li",{children:"Memorize the image"}),Object(l.jsx)("li",{children:"Piece the image back together"}),Object(l.jsx)("li",{children:".. profit?"})]}),Object(l.jsx)("p",{children:Object(l.jsx)("button",{type:"button",className:"btn btn-success btn-lg",onClick:t,children:"Start Puzzling"})})]})]})}var u=i(4);function b(e){var t=e.imgSrc,i=e.$img,n=e.onLoad,c=e.pieceSizeRatio,r=Object(a.useState)({imgWidth:i.width,imgHeight:i.height}),s=Object(o.a)(r,2),d=s[0],h=s[1],b=Object(a.useRef)();Object(a.useEffect)((function(){n(b.current)}),[n]),Object(a.useEffect)((function(){var e=function(){return h((function(e){return Object(u.a)(Object(u.a)({},e),{},{imgWidth:i.width,imgHeight:i.height})}))};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[i.width,i.height]);for(var j=d.imgWidth,g=d.imgHeight,p=Math.min(j,g)/c,m=Math.round(j/p),f=Math.round(g/p),O=j/m,v=g/f,x=0,w={width:O,height:v},C=[],N=0;N<f;N+=1){for(var y=[],S=0;S<m;S+=1){var z={width:j,height:g,left:S*O*-1,top:N*v*-1};x+=1,y.push(Object(l.jsx)("td",{className:"piece-positioner","data-id":x,style:w,children:Object(l.jsx)("div",{className:"piece-wrapper animated","data-id":x,children:Object(l.jsx)("img",{alt:"piece #".concat(x),src:t,className:"piece",style:z})})},S))}C.push(Object(l.jsx)("tr",{children:y},N))}return Object(l.jsx)("table",{ref:b,className:"game-grid",children:Object(l.jsx)("tbody",{children:C})})}var j=window.jQuery;function g(e,t,i){this.$grid=j(e),this.$stage=j(t),this.$img=j(i),this.callbacks={}}g.prototype.events={FINISHED:0},g.prototype.start=function(){this.$img.addClass("transparent");var e=this;this.$grid.find(".piece-positioner").each((function(){var t=j(this),i=t.find(".piece-wrapper");setTimeout((function(){e.scramblePiece(i),i.addClass("scramble")}),1e3),i.draggable({stack:".piece-wrapper",snap:".piece-positioner",snapMode:"inner",snapTolerance:Math.max(i.width(),i.height())/4,containment:e.$stage,start:function(){i.removeClass("animated")},stop:function(){i.addClass("animated")}}),t.droppable({tolerance:"intersect",drop:function(t,i){var a=j(this),n=j(i.draggable);n.offset(a.offset());var c=a.data("currentPiece");if(c&&c.data("id")!==n.data("id")&&e.scramblePiece(c),a.data("currentPiece",n),n.removeClass("scramble"),n.data("id")===a.data("id")&&(a.addClass("done").droppable("destroy"),n.draggable("destroy")),e.isFinished()){var r=e.callbacks[e.events.FINISHED];r&&r(e)}},out:function(e,t){var i=j(t.draggable),a=j(this).data("currentPiece");a&&a.data("id")===i.data("id")&&(j(this).data("currentPiece",null),i.addClass("scramble"))}})})),j(window).resize((function(){e.$grid.find(".piece-positioner").each((function(){var t=j(this),i=t.data("current-piece");i&&i.removeClass("animated").offset(t.offset()).addClass("animated"),t.find(".piece-wrapper.scramble").each((function(t,i){e.scramblePiece(j(i))}))}))}))},g.prototype.isFinished=function(){var e;return j(".piece-positioner").each((function(){return!!(e=j(this).data("currentPiece")&&j(this).data("currentPiece").data("id")===j(this).data("id"))})),!!e},g.prototype.scramblePiece=function(e){var t,i,a=e[0].getBoundingClientRect(),n=this.$stage[0].getBoundingClientRect(),c=this.$img[0].getBoundingClientRect(),r=Math.random;n.width>c.width+3*a.width?(t=r()*(n.height-a.height),i=r()>.5?c.right+r()*(n.right-c.right-a.width):n.left+r()*(c.left-n.left-a.width)):(i=n.left+r()*(n.right-a.width),t=c.bottom+r()*(n.bottom-c.bottom-a.height)),e.offset({top:t,left:i})},g.prototype.toggleHelp=function(e){e?this.$img.addClass("semi-transparent"):this.$img.removeClass("semi-transparent")},g.prototype.setCallback=function(e,t){this.callbacks[e]=t};var p=g;function m(e){var t=e.img,i=Object(a.useState)(null),n=Object(o.a)(i,2),c=n[0],r=n[1],s=Object(a.useState)(!1),d=Object(o.a)(s,2),h=d[0],u=d[1],j=Object(a.useRef)(),g=Object(a.useRef)();Object(a.useEffect)((function(){j.current.onload=function(){setTimeout((function(){u(!0)}),2e3)}}),[]);var m=Object(a.useCallback)((function(e){var t=new p(e,g.current,j.current);t.start(),t.setCallback(t.events.FINISHED,(function(){window.alert("You did it!! (reload the window to play again)")})),r(t)}),[]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("nav",{className:"navbar navbar-default",children:Object(l.jsxs)("div",{className:"container-fluid",children:[Object(l.jsx)("div",{className:"navbar-brand",children:"So Puzzled!"}),Object(l.jsxs)("label",{className:"navbar-text pull-right",htmlFor:"help",children:[Object(l.jsx)("input",{id:"help",type:"checkbox",disabled:!c,onChange:function(e){return c.toggleHelp(!!e.target.checked)}}),"\xa0 Need Help?"]})]})}),Object(l.jsxs)("div",{className:"game-wrapper",children:[Object(l.jsx)("div",{ref:g,className:"container stage"}),Object(l.jsxs)("div",{className:"grid-wrapper",children:[Object(l.jsx)("img",{alt:"Kitty",src:t,className:"base-img",ref:j}),h?Object(l.jsx)(b,{imgSrc:t,$img:j.current,pieceSizeRatio:4,onLoad:m}):null]})]})]})}function f(e){var t=e.img,i=Object(a.useState)(Object(l.jsx)(h,{onStart:function(){r(Object(l.jsx)(m,{img:t}))}})),n=Object(o.a)(i,2),c=n[0],r=n[1];return c}r.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(f,{img:d})}),document.getElementById("app")),s()}},[[12,1,2]]]);
//# sourceMappingURL=main.9982f4d9.chunk.js.map