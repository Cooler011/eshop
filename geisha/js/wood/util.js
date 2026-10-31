;(function() {
/**
 * ユーティリティクラス
 * @module Wood
 * @class Util
 */
Wood.Util = {
    /**
     * Wood用ループ処理
     * @method each
     * @param {*} obj
     * @param {*} callback
     * @return {*} callback key,value
     */
    each : function(obj, callback){
        if(obj === void 0 || obj === null) return ;
        if($.type(obj) === 'array' || $.type(obj) === 'object'){
            if($.type(obj) === 'object' && isNaN(parseInt(Object.keys(obj),10))){//ハッシュキーが文字列の場合
                callback(0, obj);
            }else{
                var key;
                for ( key in obj ) {
                    if (obj.hasOwnProperty(key)) {
                        callback(key, obj[key]);
                    }
                }
            }
        }else{
            callback(0, obj);
        }
    },/*
    /**
     * 2つの配列の差分を取得する
     * @method arrayDiff
     * @param {Array} a
     * @param {Array} b
     * @return {Array} diff 差分の配列
     */
    arrayDiff : function(a, b) {
        if (!a || !b) {
            return false;
        }
        var diff = [];
        a.forEach(function(v) {
            if ($.inArray(v, b) < 0) {
                diff.push(v);
            }
        });
        b.forEach(function(v) {
            if ($.inArray(v, a) < 0) {
                diff.push(v);
            }
        });
        return diff;
    },
    /**
     * 値が'undefined'かチェックする
     * @method isUndefined
     * @param {*} obj
     * @return {boolean} boolean
     */
    isUndefined : function(obj){
        return (obj === void 0 || obj === null);
    },

    /**
     * 値が定義済みかチェックする
     * @method isUndefined
     * @param {*} obj
     * @return {boolean} boolean
     */
    isDefined : function(obj){
        return (obj !== void 0 && obj !== null);
    },

    /**
     * URL query string 内の値のみを URI encode する
     */
    encodeValues : function(url) {
        var parts = url.split('?');
        var path  = parts[0];
        var query = parts[1];

        if (!query) {
            return path;
        }
        var new_kv = [];

        $.each(query.split('&'), function(index, query) {
            var kv  = query.split('=');
            var key = kv[0];
            var val = kv[1];
            new_kv.push(key + '=' + encodeURIComponent(val));
        });

        return path + '?' + new_kv.join('&');
    },

    /**
     * 秒からフォーマットされた時間に変換する
     * @method convertSecondToFormat
     * @param {Number} sec
     * @return {String}
     */
    convertSecondToFormat: function(sec) {
        //todo 数値チェック
        var time = [];
        time[0] = Math.floor(sec / (60 * 60));
        time[1] = Math.floor((sec / 60) % 60);
        if (time[1] < 10) {
            time[1] = '0' + time[1];
        }
        time[2] = sec % 60;
        if (time[2] < 10) {
            time[2] = '0' + time[2];
        }
        return time.join(':');
    },

    createPromise: function(fn) {
        var deferred = jQuery.Deferred();
        _.defer(function() {
            fn(deferred);
        });
        return deferred.promise();
    },

    /**
     * NSUIDがWUPか調べる。
     */
    isWupNsuid: function(nsuid){
        return nsuid
            ? (nsuid.toString().charAt(0) === '5' ? false : true)
            : true;
    },

    /**
     * デバイスに合わせたプレイスホルダーアイコンURLを返す。
     * WUP nsuid: 2xxxxxxxxxx
     * CTR nsuid: 5xxxxxxxxxx
     * 上記以外はWUPとみなす。
     */
    createPlaceHolderUrl: function(nsuid){
        var base = 'image/placeholder/place_icon_';
        var device = Wood.Util.isWupNsuid(nsuid) ? 'wii_u' : '3ds';
        var url = base + device + '.png';

        return url;
    },

    /**
     * デバイスに合わせたアイコン用CSSクラス。マイメニューなど。
     */
    createIconClass: function(nsuid){
        var device = Wood.Util.isWupNsuid(nsuid) ? 'wup-M' : 'ctr-M';
        var icon_class = 'p-icon-' + device;

        return icon_class;
    },

    formatTime: function(num) {
        var mov_time = [];
        var sec = parseInt(num, 10);

        mov_time[0] = Math.floor(sec / (60 * 60));
        mov_time[1] = Math.floor((sec / 60) % 60);
        if (mov_time[1] < 10) {
            mov_time[1] = '0' + mov_time[1];
        }
        mov_time[2] = sec % 60;
        if (mov_time[2] < 10) {
            mov_time[2] = '0' + mov_time[2];
        }

        return mov_time.join(':');
    }

};

})();
