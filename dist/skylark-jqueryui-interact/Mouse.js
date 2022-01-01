/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-domx-browser","skylark-domx-data","skylark-domx-query","skylark-domx-plugins-base","skylark-domx-plugins-interact/mouser","skylark-jquery/jquery-plugin"],function(t,e,n,o,s,u){var r=u.inherit({klassName:"MousePlugin",pluginName:"ui.mouse",options:{},_mouseInit:function(){var t=this;this._mouser=new s(this._elm,{cancel:this.options.cancel,distance:this.options.distance,delay:this.options.delay,started:function(e){return t._mouseStart(e)},moving:function(e){return t._mouseDrag(e)},stopped:function(e){return t._mouseStop(e)},capture:function(e){return t._mouseCapture(e)}})},_mouseDestroy:function(){this._mouser.destroy(),this._mouser=null},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}});return o.register(r),r});
//# sourceMappingURL=sourcemaps/Mouse.js.map
