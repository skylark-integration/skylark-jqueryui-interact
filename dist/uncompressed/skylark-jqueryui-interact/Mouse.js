define( [
	"skylark-domx-browser",
	"skylark-domx-data",
	"skylark-domx-query",
	"skylark-domx-plugins-base",
	"skylark-domx-plugins-interact/mouser",
	"skylark-jquery/jquery-plugin"
],function(browser, datax, $, plugins,Mouser, JqPlugin) {


	var MousePlugin = JqPlugin.inherit({
		klassName : "MousePlugin",

		pluginName : "ui.mouse",

		options: {
		},
		_mouseInit: function() {
			var self = this;
			this._mouser = new Mouser(this._elm,{
				cancel : this.options.cancel,
				distance : this.options.distance,
				delay : this.options.delay,

				started : function(e) {
					return self._mouseStart(e);
				},
				moving : function(e) {
					return self._mouseDrag(e);
				},
				stopped : function(e) {
					return self._mouseStop(e);
				},
				capture : function(e) {
					return self._mouseCapture(e);
				}
			})

		},

		// TODO: make sure destroying one instance of mouse doesn't mess with
		// other instances of mouse
		_mouseDestroy: function() {
			this._mouser.destroy();
			this._mouser = null;
		},


		// These are placeholder methods, to be overriden by extending plugin
		_mouseStart: function( /* event */ ) {},
		_mouseDrag: function( /* event */ ) {},
		_mouseStop: function( /* event */ ) {},
		_mouseCapture: function( /* event */ ) { return true; }
	});

	plugins.register(MousePlugin);

	return MousePlugin;
});
