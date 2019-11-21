/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins","./Mouse","./patch","./ddmanager"],function(t,i,e,s,h,n,o,a,l){var r=o.inherit({klassName:"Resizable",pluginName:"ui.resizable",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(t,i){if("hidden"===h(t).css("overflow"))return!1;var e,s=i&&"left"===i?"scrollLeft":"scrollTop";return t[s]>0||(t[s]=1,e=t[s]>0,t[s]=0,e)},_create:function(){var i,e=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!e.aspectRatio,aspectRatio:e.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:e.helper||e.ghost||e.animate?e.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(h("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,i={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(i),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(i),this._proportionallyResize()),this._setupHandles(),e.autoHide&&h(this.element).on("mouseenter",function(){e.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){e.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy(),this._addedHandles.remove();var t,i=function(t){h(t).removeData("resizable").removeData("ui-resizable").off(".resizable")};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,i){switch(this._super(t,i),t){case"handles":this._removeHandles(),this._setupHandles();break;case"aspectRatio":this._aspectRatio=!!i}},_setupHandles:function(){var i,e,s,n,o,a=this.options,l=this;if(this.handles=a.handles||(h(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=h(),this._addedHandles=h(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},e=0;e<s.length;e++)n="ui-resizable-"+(i=t.trim(s[e])),o=h("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[i]=".ui-resizable-"+i,this.element.children(this.handles[i]).length||(this.element.append(o),this._addedHandles=this._addedHandles.add(o));this._renderAxis=function(t){var i,e,s,n;for(i in t=t||this.element,this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=h(this.handles[i]),this._on(this.handles[i],{mousedown:l._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(e=h(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?e.outerHeight():e.outerWidth(),s=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(s,n),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){l.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),l.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._addedHandles.remove()},_mouseCapture:function(t){var i,e,n=!1;for(i in this.handles)((e=h(this.handles[i])[0])===t.target||s.contains(e,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,e,s,n=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),e=this._num(this.helper.css("top")),n.containment&&(i+=h(n.containment).scrollLeft()||0,e+=h(n.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:e},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:e},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof n.aspectRatio?n.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=h(".ui-resizable-"+this.axis).css("cursor"),h("body").css("cursor","auto"===s?this.axis+"-resize":s),this._addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(i){var e,s,h=this.originalMousePosition,n=this.axis,o=i.pageX-h.left||0,a=i.pageY-h.top||0,l=this._change[n];return this._updatePrevProperties(),!!l&&(e=l.apply(this,[i,o,a]),this._updateVirtualBoundaries(i.shiftKey),(this._aspectRatio||i.shiftKey)&&(e=this._updateRatio(e,i)),e=this._respectSize(e,i),this._updateCache(e),this._propagate("resize",i),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",i,this.ui()),this._applyChanges()),!1)},_mouseStop:function(i){this.resizing=!1;var e,s,n,o,a,l,r,p=this.options;return this._helper&&(n=(s=(e=this._proportionallyResizeElements).length&&/textarea/i.test(e[0].nodeName))&&this._hasScroll(e[0],"left")?0:this.sizeDiff.height,o=s?0:this.sizeDiff.width,a={width:this.helper.width()-o,height:this.helper.height()-n},l=parseFloat(this.element.css("left"))+(this.position.left-this.originalPosition.left)||null,r=parseFloat(this.element.css("top"))+(this.position.top-this.originalPosition.top)||null,p.animate||this.element.css(t.extend(a,{top:r,left:l})),this.helper.height(this.size.height),this.helper.width(this.size.width),this._helper&&!p.animate&&this._proportionallyResize()),h("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",i),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var i,e,s,h,n,o=this.options;n={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||t)&&(i=n.minHeight*this.aspectRatio,s=n.minWidth/this.aspectRatio,e=n.maxHeight*this.aspectRatio,h=n.maxWidth/this.aspectRatio,i>n.minWidth&&(n.minWidth=i),s>n.minHeight&&(n.minHeight=s),e<n.maxWidth&&(n.maxWidth=e),h<n.maxHeight&&(n.maxHeight=h)),this._vBoundaries=n},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var i=this.position,e=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=i.left+(e.width-t.width),t.top=null),"nw"===s&&(t.top=i.top+(e.height-t.height),t.left=i.left+(e.width-t.width)),t},_respectSize:function(t){var i=this._vBoundaries,e=this.axis,s=this._isNumber(t.width)&&i.maxWidth&&i.maxWidth<t.width,h=this._isNumber(t.height)&&i.maxHeight&&i.maxHeight<t.height,n=this._isNumber(t.width)&&i.minWidth&&i.minWidth>t.width,o=this._isNumber(t.height)&&i.minHeight&&i.minHeight>t.height,a=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,r=/sw|nw|w/.test(e),p=/nw|ne|n/.test(e);return n&&(t.width=i.minWidth),o&&(t.height=i.minHeight),s&&(t.width=i.maxWidth),h&&(t.height=i.maxHeight),n&&r&&(t.left=a-i.minWidth),s&&r&&(t.left=a-i.maxWidth),o&&p&&(t.top=l-i.minHeight),h&&p&&(t.top=l-i.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var i=0,e=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],h=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];i<4;i++)e[i]=parseFloat(s[i])||0,e[i]+=parseFloat(h[i])||0;return{height:e[0]+e[2],width:e[1]+e[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,i=0,e=this.helper||this.element;i<this._proportionallyResizeElements.length;i++)t=this._proportionallyResizeElements[i],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:e.height()-this.outerDimensions.height||0,width:e.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||h("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,i){return{width:this.originalSize.width+i}},w:function(t,i){var e=this.originalSize;return{left:this.originalPosition.left+i,width:e.width-i}},n:function(t,i,e){var s=this.originalSize;return{top:this.originalPosition.top+e,height:s.height-e}},s:function(t,i,e){return{height:this.originalSize.height+e}},se:function(i,e,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[i,e,s]))},sw:function(i,e,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[i,e,s]))},ne:function(i,e,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[i,e,s]))},nw:function(i,e,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[i,e,s]))}},_propagate:function(t,i){a.call(this,t,[i,this.ui(),this],!0),"resize"!==t&&this._trigger(t,i,this.ui())},patches:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});return a.add(r,"animate",{stop:function(i){var e=h(this).resizable("instance"),s=e.options,n=e._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&e._hasScroll(n[0],"left")?0:e.sizeDiff.height,l=o?0:e.sizeDiff.width,r={width:e.size.width-l,height:e.size.height-a},p=parseFloat(e.element.css("left"))+(e.position.left-e.originalPosition.left)||null,d=parseFloat(e.element.css("top"))+(e.position.top-e.originalPosition.top)||null;e.element.animate(t.extend(r,d&&p?{top:d,left:p}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var t={width:parseFloat(e.element.css("width")),height:parseFloat(e.element.css("height")),top:parseFloat(e.element.css("top")),left:parseFloat(e.element.css("left"))};n&&n.length&&h(n[0]).css({width:t.width,height:t.height}),e._updateCache(t),e._propagate("resize",i)}})}}),a.add(r,"containment",{start:function(){var t,i,e,s,n,o,a,l=h(this).resizable("instance"),r=l.options,p=l.element,d=r.containment,g=d instanceof h?d.get(0):/parent/.test(d)?p.parent().get(0):d;g&&(l.containerElement=h(g),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:h(document),left:0,top:0,width:h(document).width(),height:h(document).height()||document.body.parentNode.scrollHeight}):(t=h(g),i=[],h(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=l._num(t.css("padding"+s))}),l.containerOffset=t.offset(),l.containerPosition=t.position(),l.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},e=l.containerOffset,s=l.containerSize.height,n=l.containerSize.width,o=l._hasScroll(g,"left")?g.scrollWidth:n,a=l._hasScroll(g)?g.scrollHeight:s,l.parentData={element:g,left:e.left,top:e.top,width:o,height:a}))},resize:function(t){var i,e,s,n,o=h(this).resizable("instance"),a=o.options,l=o.containerOffset,r=o.position,p=o._aspectRatio||t.shiftKey,d={top:0,left:0},g=o.containerElement,m=!0;g[0]!==document&&/static/.test(g.css("position"))&&(d=l),r.left<(o._helper?l.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-l.left:o.position.left-d.left),p&&(o.size.height=o.size.width/o.aspectRatio,m=!1),o.position.left=a.helper?l.left:0),r.top<(o._helper?l.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-l.top:o.position.top),p&&(o.size.width=o.size.height*o.aspectRatio,m=!1),o.position.top=o._helper?l.top:0),s=o.containerElement.get(0)===o.element.parent().get(0),n=/relative|absolute/.test(o.containerElement.css("position")),s&&n?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-l.left)),e=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-l.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,p&&(o.size.height=o.size.width/o.aspectRatio,m=!1)),e+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-e,p&&(o.size.width=o.size.height*o.aspectRatio,m=!1)),m||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=h(this).resizable("instance"),i=t.options,e=t.containerOffset,s=t.containerPosition,n=t.containerElement,o=h(t.helper),a=o.offset(),l=o.outerWidth()-t.sizeDiff.width,r=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(n.css("position"))&&h(this).css({left:a.left-s.left-e.left,width:l,height:r}),t._helper&&!i.animate&&/static/.test(n.css("position"))&&h(this).css({left:a.left-s.left-e.left,width:l,height:r})}}),a.add(r,"alsoResize",{start:function(){var t=h(this).resizable("instance").options;h(t.alsoResize).each(function(){var t=h(this);t.data("ui-resizable-alsoresize",{width:parseFloat(t.width()),height:parseFloat(t.height()),left:parseFloat(t.css("left")),top:parseFloat(t.css("top"))})})},resize:function(i,e){var s=h(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,l={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};h(n.alsoResize).each(function(){var i=h(this),s=h(this).data("ui-resizable-alsoresize"),n={},o=i.parents(e.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,i){var e=(s[i]||0)+(l[i]||0);e&&e>=0&&(n[i]=e||null)}),i.css(n)})},stop:function(){h(this).removeData("ui-resizable-alsoresize")}}),a.add(r,"ghost",{start:function(){var t=h(this).resizable("instance"),i=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),t._addClass(t.ghost,"ui-resizable-ghost"),t.ghost.appendTo(t.helper)},resize:function(){var t=h(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=h(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),a.add(r,"grid",{resize:function(){var t,i=h(this).resizable("instance"),e=i.options,s=i.size,n=i.originalSize,o=i.originalPosition,a=i.axis,l="number"==typeof e.grid?[e.grid,e.grid]:e.grid,r=l[0]||1,p=l[1]||1,d=Math.round((s.width-n.width)/r)*r,g=Math.round((s.height-n.height)/p)*p,m=n.width+d,c=n.height+g,f=e.maxWidth&&e.maxWidth<m,u=e.maxHeight&&e.maxHeight<c,z=e.minWidth&&e.minWidth>m,_=e.minHeight&&e.minHeight>c;e.grid=l,z&&(m+=r),_&&(c+=p),f&&(m-=r),u&&(c-=p),/^(se|s|e)$/.test(a)?(i.size.width=m,i.size.height=c):/^(ne)$/.test(a)?(i.size.width=m,i.size.height=c,i.position.top=o.top-g):/^(sw)$/.test(a)?(i.size.width=m,i.size.height=c,i.position.left=o.left-d):((c-p<=0||m-r<=0)&&(t=i._getPaddingPlusBorderDimensions(this)),c-p>0?(i.size.height=c,i.position.top=o.top-g):(c=p-t.height,i.size.height=c,i.position.top=o.top+n.height-c),m-r>0?(i.size.width=m,i.position.left=o.left-d):(m=r-t.width,i.size.width=m,i.position.left=o.left+n.width-m))}}),n.register(r,"resizable"),r});
//# sourceMappingURL=sourcemaps/Resizable.js.map