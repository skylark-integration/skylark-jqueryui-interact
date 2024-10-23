/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-domx-browser","skylark-domx-data","skylark-domx-query","skylark-domx-plugins-base","skylark-domx-plugins-interact/mouser","skylark-jquery/jquery-plugin"],function(t,e,n,o,s,u){u=u.inherit({klassName:"MousePlugin",pluginName:"ui.mouse",options:{},_mouseInit:function(){var e=this;this._mouser=new s(this._elm,{cancel:this.options.cancel,distance:this.options.distance,delay:this.options.delay,started:function(t){return e._mouseStart(t)},moving:function(t){return e._mouseDrag(t)},stopped:function(t){return e._mouseStop(t)},capture:function(t){return e._mouseCapture(t)}})},_mouseDestroy:function(){this._mouser.destroy(),this._mouser=null},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}});return o.register(u),u});
//# sourceMappingURL=sourcemaps/Mouse.js.map
