/*!build time : 2014-03-19 7:04:08 PM*/
KISSY.add("gallery/tb-video-player-h5/1.0/index",function(a,b,c,d){function e(){var b={};switch(a.UA.os){case"ios":b.equipmentType=a.UA.ipad?2:3;break;case"android":b.equipmentType=a.UA.android<3?6:5;break;default:b.equipmentType=6}return b}function f(b){var c=this,e=a.guid("TbVideoPlayerH5-"),g=function(){var b=c.get("vid"),d=c.get("uid"),e=c.get("daily"),f=new RegExp(/\d+$/i);if(!f.test(b))return a.log(b+"is illegal!"),void 0;var g="http://cloud.video.";return g+=e?"daily.taobao.net":"taobao.com",g+="/play/u/",g+=d+"/p/1/e/",g+=i.equipmentType+"/t/1/",g+=b+".",g+=a.inArray(i.equipmentType,[2,3,5])?"m3u8":"mp4"};f.superclass.constructor.call(c,b);var j="string"==typeof c.get("container")?d.get(c.get("container")):c.get("container");h(j).length||(a.log("container is illegal!"),c.set("container","body"));var k=d.create("<video>",{width:c.get("width"),height:c.get("height"),controls:"controls",src:g(),id:e});c.get("poster").length&&d.attr(k,"poster",c.get("poster")),c.get("autoplay")&&d.attr(k,"autoplay","autoplay"),d.append(k,j),c._destroy=function(){h("#"+e).detach().remove()},c._play=function(){d.get("#"+e).play()},c._pause=function(){d.get("#"+e).pause()},c.get("callback")(d.get("#"+e))}var g="",h=b.all,i=e();return a.extend(f,c,{destroy:function(){this._destroy()},pause:function(){this._pause()},play:function(){this._play()}},{ATTRS:{container:{value:"body"},vid:{value:g},callback:{value:function(){}},uid:{value:"727053408"},width:{value:"100%"},height:{value:"100%"},poster:{value:g},autoplay:{value:!1},daily:{value:!1}}}),f},{requires:["node","base","dom"]});