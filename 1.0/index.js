/**
 * @fileoverview 
 * @author 岳松<yuesong.xys@taobao.com>
 * @module tb-video-player-h5
 **/
KISSY.add(function (S, Node, Base, DOM) {

    var EMPTY = '',
        $ = Node.all,
        PLATFORM = _getPlatform();

    function _getPlatform() {

        var _PLATFORM = {};
        switch (S.UA.os){
            case 'ios' :
                _PLATFORM.equipmentType = S.UA.ipad ? 2 : 3;
                break;
            case 'android' :
                _PLATFORM.equipmentType = S.UA.android < 3.0 ? 6 : 5;
                break;
            default:
                _PLATFORM.equipmentType = 6;
                break;
        }
        return _PLATFORM;

    }
    
    /**
     * 
     * @class TbVideoPlayerH5
     * @constructor
     * @extends Base
     */
    function TbVideoPlayerH5(Config) {

        var self = this,
            _guid = S.guid('TbVideoPlayerH5-'),
            _getVideoUrl = function() {

                var _vid = self.get('vid'),
                    _uid = self.get('uid'),
                    _isDaily = self.get('daily');

                var _exp = new RegExp(/\d+$/i);
                if (!_exp.test(_vid)) {
                    S.log(_vid + 'is illegal!');
                    return;
                }

                var _video_url = 'http://cloud.video.';
                    _video_url += _isDaily ? 'daily.taobao.net' : 'taobao.com';
                    _video_url += '/play/u/';
                    _video_url += _uid + '/p/1/e/';
                    _video_url += PLATFORM.equipmentType + '/t/1/';
                    _video_url += _vid + '.';
                    _video_url += S.inArray(PLATFORM.equipmentType, [2, 3, 5]) ? 'm3u8' : 'mp4';

                return _video_url;

            };
        // 调用父类构造函数
        TbVideoPlayerH5.superclass.constructor.call(self, Config);
        //self._guid = S.guid('TbVideoPlayerH5-');
        //self._init();
        var _container = typeof self.get('container') === 'string' ? DOM.get(self.get('container')) : self.get('container');

        if (!$(_container).length) {
            S.log('container is illegal!');
            self.set('container', 'body');
        }

        var _video_node = DOM.create('<video>', {
            width: self.get('width'),
            height: self.get('height'),
            controls: 'controls',
            src: _getVideoUrl(),
            id: _guid
        });

        if (self.get('poster').length) {
            DOM.attr(_video_node, 'poster', self.get('poster'));
        }

        if (self.get('autoplay')) {
            DOM.attr(_video_node, 'autoplay', 'autoplay');
        }

        DOM.append(_video_node, _container);

        self._destroy = function() {
            $('#' + _guid).detach().remove();
        }

        self._play = function(){
            DOM.get('#' + _guid).play();
        }

        self._pause = function(){
            DOM.get('#' + _guid).pause();
        }

        self.get('callback')(DOM.get('#' + _guid));

    }

    S.extend(TbVideoPlayerH5, Base, /** @lends TbVideoPlayerH5.prototype*/{

        destroy: function(){

            this._destroy();

        },
        pause: function(){

            this._pause();

        },
        play: function(){

            this._play();

        }
    }, {ATTRS : {
        container: {
            value : 'body'
        },
        vid: {
            value : EMPTY
        },
        callback: {
            value: function(){}
        },
        uid: {
            value: '727053408'
        },
        width: {
            value : '100%'
        },
        height: {
            value : '100%'
        },
        poster: {
            value : EMPTY
        },
        autoplay: {
            value: false
        },
        daily: {
            value: false
        }
    }});

    return TbVideoPlayerH5;

}, {requires:['node', 'base', 'dom']});
