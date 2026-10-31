/*
 create root namespace on global context
 Wood - spaces for system classes
 wood - spaces for client values
 */

if (!wood) {
    var wood = {};
}
if (!Wood) {
    var Wood = {
        "Model"      : {},
        "Modules"    : {
            "Client" : {},
            "Controller" : {
                "Base" : {},
                "Login" : {}
            }
        },
        "Controller" : {},
        "Collection" : {},
        "View"       : {
            "Common"  : {},
            "Nfc" : {},
            "Title"   : {},
            "Ranking" : {},
            "Aoc"     : {
                "Check" : {},
                "List"    : {}
            }
        },
        "UrlPrefix"  : {},
        "Debug"      : {},
        "Test"       : {}
    };
    var wood_client = {};

    Wood.isWiiU = !!(typeof wiiuSystemSetting !== 'undefined');

    /**
     * URL Prefix rule:
     *
     * 以下を実現するために URL Prefix を切り替えます。
     *
     * - HTMLが CDN経由でアクセスされたら、API もCDN経由にする
     * - HTMLが オリジン直でアクセスされたら、API もオリジン直
     *
     * つまり、
     *
     * - HTML のドメインが geisha-wup.cdn.nintendo.net なら
     * - API のドメインは samurai-wup.cdn.nintendo.net
     * になります。
     *
     * geisha の hostname の geisha を samurai にすれば
     * samurai の hostname になるようにドメインは設定されています。
     *
     * HTML がどのドメインから配信されているかに関わらず
     * オリジンのAPIを叩きたい、という場合には Wood.UrlPrefix.SAMURAI
     * ではなく、Wood.UrlPrefix.SAMURAI_ORIGIN を使用します。
     * PCからはlocalStorageの値を設定します。
     *
     * Wood.UrlPrefix.NINJA はWii Uでは固定です。
     * PCからはlocalStorageの値を設定します。
     */
    var NINJA_BASE
        = 'https://ninja.wup.shop.nintendo.net/ninja/';

    var SAMURAI_ORIGINBASE
        = 'https://samurai.wup.shop.nintendo.net/samurai/';

    Wood.getHostName = function() {
        return location.hostname;
    };

    Wood.setupUrlPrefix = function() {
        Wood.UrlPrefix.NINJA = NINJA_BASE;
        Wood.UrlPrefix.SAMURAI_ORIGIN = SAMURAI_ORIGINBASE;

        var hostname = Wood.getHostName();
        if (hostname.indexOf('geisha') >= 0) {
            Wood.UrlPrefix.SAMURAI =
                'https://' +
                hostname.replace("geisha", "samurai")
                + '/samurai/';
        }
        else {
            Wood.UrlPrefix.SAMURAI = SAMURAI_ORIGINBASE;
        }

        if (!Wood.isWiiU) {
            // AWS でPCからの接続を実現する SEE #29035
            var samurai_base_pc = localStorage.getItem('samurai_base');
            if (samurai_base_pc) {
                Wood.UrlPrefix.SAMURAI_ORIGIN = samurai_base_pc;
                Wood.UrlPrefix.SAMURAI = samurai_base_pc;
            }
            var ninja_base_pc = localStorage.getItem('ninja_base');
            if (ninja_base_pc) {
                Wood.UrlPrefix.NINJA = ninja_base_pc;
            }
        }
    };
    Wood.setupUrlPrefix();

    // 時間計測用関数 #7672
    Wood.isSWLoaded = function() {
        return ("StopWatch" in window);
    }
    Wood.hasSW = function() {
        if (!Wood.isSWLoaded()) { return }
        return !!(wood.stop_watch);
    };
    Wood.initializeSW = function(name) {
        if (!Wood.isSWLoaded()) { return }

        wood.stop_watch = new StopWatch(name);
        wood.stop_watch.start();
    };
    Wood.lap = function(name) {
        if (!Wood.isSWLoaded()) { return }
        if (!Wood.hasSW()) {
            Wood.initializeSW("unknown");
        }
        wood.stop_watch.lap(name);
    };
    Wood.finalizeSW = function() {
        if (!Wood.isSWLoaded()) { return }
        if (!Wood.hasSW()) {
            throw "wood.stop_watch not initialized.";
        }
        wood.stop_watch.finish();
        wood.stop_watch.reportText().split("\n").forEach(function(v, i) {
            Wood.log(v);
        });
        wood.stop_watch = null;
    };

    Wood.log = function(message) {
        function split_print(str) {
            // wiiuDebug.print での出力文字数制限回避
            var temp_str = str;
            var NUM = 200;
            while (temp_str) {
                wiiuDebug.print(temp_str.substr(0, NUM));
                temp_str = temp_str.substr(NUM);
            }
        }
        if (Wood.isWiiU && typeof wiiuDebug !== 'undefined') {
            split_print(message);
            return;
        }
        console.log(message);
    };

}

if (window.jQuery) {
    // extensions.js より後方互換のためにコピー
    // いずれは Wood.log に移行する事
    jQuery.extend({
		print : function(message) {
			if (typeof wiiuDebug !== 'undefined') {
				wiiuDebug.print(message);
			} else if (typeof console !== 'undefined') {
				console.log(message);
			}
		}
    });
}
