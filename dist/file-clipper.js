!function(e){var t={};function r(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(i,s,function(t){return e[t]}.bind(null,s));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=6)}([function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("event-callback-promise")},function(e,t){e.exports=require("zlib")},function(e,t,r){const i=r(0);e.exports=function(e){return i.createHash("sha256").update(e).digest()}},function(e,t,r){const i=r(7).encrypt,s=r(10).decrypt,n=r(11),o=r(2),a=r(12);class c{constructor(){this.action=!1,this.path=null,this.secret=null}async getFiles(){return await n.getFiles(await this.resolve(this.path))}async resolve(e){return o.resolve(e)}static start({mode:e,path:t,secret:r}){let n=new this;switch(n.path=t,n.secret=r,e){case"encrypt":n.action=i;break;case"decrypt":n.action=s;break;default:n.action=!1}return n.run(),n}run(){const{secret:e,action:t}=this;if(!t)return!1;this.getFiles().then(t=>Promise.all(t.map(t=>this.action({file:t,secret:e})))).then(e=>!0).catch(e=>!1)}}c.start(a.opts()),e.exports=c},function(e,t,r){const i=r(0),s=r(1),n=r(2),o=r(4),a=r(8),c=r(5),p=r(3);e.exports=new class{getCipher(e){this.initVect=i.randomBytes(16);const t=c(e);return i.createCipheriv("aes256",t,this.initVect)}getZip(){return o.createGzip()}getTransformation(e){return new a(e)}async pipe(e,t,r,i,s){return i.map(t=>e=e.pipe(t)),await s.onClose(),await s.onRename(t,r),!0}async encrypt({file:e,secret:t}){const r=this.getCipher(t),i=s.createReadStream(e),o=this.getZip(),a=this.getTransformation(this.initVect),c=s.createWriteStream(n.join(e+".enc")),u=p(c,"close"),l=p(s.rename);return await this.pipe(i,e+".enc",e,[o,r,a,c],{onClose:u,onRename:l})}}},function(e,t,r){const{Transform:i}=r(9);e.exports=class extends i{constructor(e,t){super(t),this.initVect=e,this.appended=!1}_transform(e,t,r){this.appended||(this.push(this.initVect),this.appended=!0),this.push(e),r()}}},function(e,t){e.exports=require("stream")},function(e,t,r){const i=r(0),s=r(1),n=r(4),o=r(5),a=r(3);e.exports=new class{async getDecipher(e,t,r){const n=s.createReadStream(e,{end:15}),a=r(n,"data"),c=r(n,"close"),p=await a();await c();const u=o(t);return i.createDecipheriv("aes256",u,p)}getUnZip(){return n.createUnzip()}async pipe(e,t,r,i,s){return i.map(t=>e=e.pipe(t)),await s.onClose(),await s.onRename(t,r),!0}async decrypt({file:e,secret:t}){const r=await this.getDecipher(e,t,a),i=s.createReadStream(e,{start:16}),n=this.getUnZip(),o=s.createWriteStream(e+".unenc"),c=a(o,"close"),p=a(s.rename);return this.pipe(i,e+".unenc",e,[r,n,o],{onClose:c,onRename:p}),!0}}},function(e,t,r){const i=r(2),s=r(1),n=r(3);class o{constructor(e){Object.assign(this,s),this.access=n(this.access),this.stat=n(this.stat),this.readdir=n(this.readdir),this.link=e,this.list=[]}async start(){return await this.access(this.link,this.constants.W_OK),(await this.stat(this.link)).isDirectory()?this.list=this.list.concat(await this.iterate()):this.list.push(this.link),await this.reduce(this.list)}async iterate(){const e=await this.readdir(this.link);return Promise.all(e.map(e=>(e=i.join(this.link,e),o.getFiles(e))))}async reduce(e){let t=[];for(let r in e)Array.isArray(e[r])?t=t.concat(await this.reduce(e[r])):t.push(e[r]);return t}static async getFiles(e){return new o(e).start()}}e.exports=o},function(e,t,r){const i=r(13),{version:s}=r(14);i.version(s).option("-m, --mode <mode>","encrypt/decrypt the filea or folders","").option("-p, --path <path>","path of a file or directory","").option("-s, --secret <secret>","secrect or salt to handle encryption","").parse(process.argv),e.exports=i},function(e,t){e.exports=require("commander")},function(e){e.exports=JSON.parse('{"name":"file-clipper","version":"1.0.0","description":"This package enable you to encrypt or decrypt a file or folder","main":"src/index.js","scripts":{"start":"node ./dist/file-clipper.js","dev":"node ./src/index.js","lint":"eslint --ignore-path .gitignore ./src ./test","pre:publish":"npm run lint && npm run test","build":"npm test && node ./node_modules/webpack/bin/webpack.js --mode production --config webpack/webpack.config.js","test":"mocha --require ./test/bootstrap.js --timeout 10000 --recursive   ./test/**/*.test.js","cover":"istanbul cover node_modules/.bin/_mocha --  --require ./test/bootstrap.js --timeout 10000 --recursive --reporter nyan ./test/**/*.test.js","coverage":"nyc --reporter html --reporter text npm test","pre:commit":"npm test --silent"},"files":["dist"],"bin":{"file-clipper":"./dist/file-clipper.js"},"repository":{"type":"git","url":"git+https://github.com/sonsor/file-clipper.git"},"keywords":["File","Clipper","Crypt","Decrypt"],"author":"Wasif Farooq","license":"MIT","bugs":{"url":"https://github.com/sonsor/file-clipper/issues"},"homepage":"https://github.com/sonsor/file-clipper#readme","dependencies":{"commander":"^3.0.2","event-callback-promise":"^1.0.2"},"devDependencies":{"chai":"^4.2.0","chai-as-promised":"^7.1.1","eslint":"^6.6.0","eslint-config-node":"^4.0.0","husky":"^3.0.9","istanbul":"^0.4.5","mocha":"^6.2.2","mock-fs":"^4.10.2","nyc":"^14.1.1","sinon":"^7.5.0","sinon-chai":"^3.3.0","webpack":"^4.41.2","webpack-cli":"^3.3.10","webpack-node-externals":"^1.7.2"},"husky":{"hooks":{"pre-push":"npm run coverage"}}}')}]);