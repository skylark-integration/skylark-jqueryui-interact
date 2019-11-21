/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins","./Mouse"],function(e,t,s,l,i,n,a){var c=a.inherit({klassName:"Selectable",pluginName:"ui.selectable",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e.elementPos=i(e.element[0]).offset(),e.selectees=i(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var s=i(this),l=s.offset(),n={left:l.left-e.elementPos.left,top:l.top-e.elementPos.top};t.data(this,"selectable-item",{element:this,$element:s,left:n.left,top:n.top,right:n.left+s.outerWidth(),bottom:n.top+s.outerHeight(),startselected:!1,selected:s.hasClass("ui-selected"),selecting:s.hasClass("ui-selecting"),unselecting:s.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=i("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var s=this,l=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=i(this.element[0]).offset(),this.options.disabled||(this.selectees=i(l.filter,this.element[0]),this._trigger("start",e),i(l.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),l.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var l=t.data(this,"selectable-item");l.startselected=!0,e.metaKey||e.ctrlKey||(s._removeClass(l.$element,"ui-selected"),l.selected=!1,s._addClass(l.$element,"ui-unselecting"),l.unselecting=!0,s._trigger("unselecting",e,{unselecting:l.element}))}),i(e.target).parents().addBack().each(function(){var l,i=t.data(this,"selectable-item");if(i)return l=!e.metaKey&&!e.ctrlKey||!i.$element.hasClass("ui-selected"),s._removeClass(i.$element,l?"ui-unselecting":"ui-selected")._addClass(i.$element,l?"ui-selecting":"ui-unselecting"),i.unselecting=!l,i.selecting=l,i.selected=l,l?s._trigger("selecting",e,{selecting:i.element}):s._trigger("unselecting",e,{unselecting:i.element}),!1}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var s,l=this,i=this.options,n=this.opos[0],a=this.opos[1],c=e.pageX,r=e.pageY;return n>c&&(s=c,c=n,n=s),a>r&&(s=r,r=a,a=s),this.helper.css({left:n,top:a,width:c-n,height:r-a}),this.selectees.each(function(){var s=t.data(this,"selectable-item"),o=!1,u={};s&&s.element!==l.element[0]&&(u.left=s.left+l.elementPos.left,u.right=s.right+l.elementPos.left,u.top=s.top+l.elementPos.top,u.bottom=s.bottom+l.elementPos.top,"touch"===i.tolerance?o=!(u.left>c||u.right<n||u.top>r||u.bottom<a):"fit"===i.tolerance&&(o=u.left>n&&u.right<c&&u.top>a&&u.bottom<r),o?(s.selected&&(l._removeClass(s.$element,"ui-selected"),s.selected=!1),s.unselecting&&(l._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1),s.selecting||(l._addClass(s.$element,"ui-selecting"),s.selecting=!0,l._trigger("selecting",e,{selecting:s.element}))):(s.selecting&&((e.metaKey||e.ctrlKey)&&s.startselected?(l._removeClass(s.$element,"ui-selecting"),s.selecting=!1,l._addClass(s.$element,"ui-selected"),s.selected=!0):(l._removeClass(s.$element,"ui-selecting"),s.selecting=!1,s.startselected&&(l._addClass(s.$element,"ui-unselecting"),s.unselecting=!0),l._trigger("unselecting",e,{unselecting:s.element}))),s.selected&&(e.metaKey||e.ctrlKey||s.startselected||(l._removeClass(s.$element,"ui-selected"),s.selected=!1,l._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,l._trigger("unselecting",e,{unselecting:s.element})))))}),!1}},_mouseStop:function(e){var s=this;return this.dragged=!1,i(".ui-unselecting",this.element[0]).each(function(){var l=t.data(this,"selectable-item");s._removeClass(l.$element,"ui-unselecting"),l.unselecting=!1,l.startselected=!1,s._trigger("unselected",e,{unselected:l.element})}),i(".ui-selecting",this.element[0]).each(function(){var l=t.data(this,"selectable-item");s._removeClass(l.$element,"ui-selecting")._addClass(l.$element,"ui-selected"),l.selecting=!1,l.selected=!0,l.startselected=!0,s._trigger("selected",e,{selected:l.element})}),this._trigger("stop",e),this.helper.remove(),!1}});return n.register(c,"selectable"),c});
//# sourceMappingURL=sourcemaps/Selectable.js.map
