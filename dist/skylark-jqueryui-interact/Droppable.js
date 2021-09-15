/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-eventer","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins-base","skylark-jquery/jquery-plugin","./patch","./ddmanager"],function(e,t,i,s,r,n,a,o){var l=n.inherit({klassName:"Droppable",pluginName:"ui.Droppable",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){if(!arguments.length)return t||(t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight});t=arguments[0]},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){o.droppables[e]=o.droppables[e]||[],o.droppables[e].push(this)},_splice:function(e){for(var t=0;t<e.length;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var e=o.droppables[this.options.scope];this._splice(e)},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=o.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(e){var t=o.current;this._addActiveClass(),t&&this._trigger("activate",e,this.ui(t))},_deactivate:function(e){var t=o.current;this._removeActiveClass(),t&&this._trigger("deactivate",e,this.ui(t))},_over:function(e){var t=o.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(t)))},_out:function(e){var t=o.current;t&&(t.currentItem||t.element)[0]!==this.element[0]&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(t)))},_drop:function(t,i){var r=i||o.current,n=!1;return!(!r||(r.currentItem||r.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=s(this).droppable("instance");if(i.options.greedy&&!i.options.disabled&&i.options.scope===r.options.scope&&i.accept.call(i.element[0],r.currentItem||r.element)&&o.intersect(r,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t))return n=!0,!1}),!n&&(!!this.accept.call(this.element[0],r.currentItem||r.element)&&(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",t,this.ui(r)),this.element)))},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});return r.register(l,"droppable"),l});
//# sourceMappingURL=sourcemaps/Droppable.js.map
