/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins","./Mouse","./ddmanager"],function(t,e,i,s,o,r,n,h){var a=n.inherit({klassName:"Sortable",pluginName:"ui.sortable",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&t<e+i},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.pluginName+"-item");return this},_mouseCapture:function(t,i){var s=null,r=!1,n=this;return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(t),o(t.target).parents().each(function(){if(e.data(this,n.pluginName+"-item")===n)return s=o(this),!1}),e.data(t.target,n.pluginName+"-item")===n&&(s=o(t.target)),!!s&&(!(this.options.handle&&!i&&(o(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(r=!0)}),!r))&&(this.currentItem=s,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(e,i,s){var r,n,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.appendTo=o("parent"!==a.appendTo?a.appendTo:this.currentItem.parent()),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),this.scrollParent=this.placeholder.scrollParent(),t.extend(this.offset,{parent:this._getParentOffset()}),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",a.cursor),this.storedStylesheet=o("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(n)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(r=this.containers.length-1;r>=0;r--)this.containers[r]._trigger("activate",e,this._uiHash(this));return h&&(h.current=this),h&&!a.dropBehaviour&&h.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this.helper.parent().is(this.appendTo)||(this.helper.detach().appendTo(this.appendTo),this.offset.parent=this._getParentOffset()),this.position=this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,this.lastPositionAbs=this.positionAbs=this._convertPositionTo("absolute"),this._mouseDrag(e),!0},_scroll:function(t){var e=this.options,i=!1;return this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<e.scrollSensitivity?this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop+e.scrollSpeed:t.pageY-this.overflowOffset.top<e.scrollSensitivity&&(this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop-e.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<e.scrollSensitivity?this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft+e.scrollSpeed:t.pageX-this.overflowOffset.left<e.scrollSensitivity&&(this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft-e.scrollSpeed)):(t.pageY-this.document.scrollTop()<e.scrollSensitivity?i=this.document.scrollTop(this.document.scrollTop()-e.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<e.scrollSensitivity&&(i=this.document.scrollTop(this.document.scrollTop()+e.scrollSpeed)),t.pageX-this.document.scrollLeft()<e.scrollSensitivity?i=this.document.scrollLeft(this.document.scrollLeft()-e.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<e.scrollSensitivity&&(i=this.document.scrollLeft(this.document.scrollLeft()+e.scrollSpeed))),i},_mouseDrag:function(t){var e,i,o,r,n=this.options;if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),this._contactContainers(t),null!==this.innermostContainer)for(n.scroll&&!1!==this._scroll(t)&&(this._refreshItemPositions(!0),h&&!n.dropBehaviour&&h.prepareOffsets(this,t)),this.dragDirection={vertical:this._getDragVerticalDirection(),horizontal:this._getDragHorizontalDirection()},e=this.items.length-1;e>=0;e--)if(o=(i=this.items[e]).item[0],(r=this._intersectsWithPointer(i))&&i.instance===this.currentContainer&&!(o===this.currentItem[0]||this.placeholder[1===r?"next":"prev"]()[0]===o||s.contains(this.placeholder[0],o)||"semi-dynamic"===this.options.type&&s.contains(this.element[0],o))){if(this.direction=1===r?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(i))break;this._rearrange(t,i),this._trigger("change",t,this._uiHash());break}return h&&h.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,e){if(t){if(h&&!this.options.dropBehaviour&&h.drop(this,t),this.options.revert){var i=this,s=this.placeholder.offset(),r=this.options.axis,n={};r&&"x"!==r||(n.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),r&&"y"!==r||(n.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,o(this.helper).animate(n,parseInt(this.options.revert,10)||500,function(){i._clear(t)})}else this._clear(t,e);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new i.create("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?o(this.domPosition.prev).after(this.currentItem):o(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},o(e).each(function(){var e=(o(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);e&&i.push((t.key||e[1]+"[]")+"="+(t.key&&t.expression?e[1]:e[2]))}),!i.length&&t.key&&i.push(t.key+"="),i.join("&")},toArray:function(t){var e=this._getItemsAsjQuery(t&&t.connected),i=[];return t=t||{},e.each(function(){i.push(o(t.item||this).attr(t.attribute||"id")||"")}),i},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,o=s+this.helperProportions.height,r=t.left,n=r+t.width,h=t.top,a=h+t.height,l=this.offset.click.top,c=this.offset.click.left,p="x"===this.options.axis||s+l>h&&s+l<a,f="y"===this.options.axis||e+c>r&&e+c<n,u=p&&f;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?u:r<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<n&&h<s+this.helperProportions.height/2&&o-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),o="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width);return!(!s||!o)&&(e=this.dragDirection.vertical,i=this.dragDirection.horizontal,this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1))},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this.dragDirection.vertical,o=this.dragDirection.horizontal;return this.floating&&o?"right"===o&&i||"left"===o&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(i){var s,r,n,h,a=[],l=[],c=this._connectWith();if(c&&i)for(s=c.length-1;s>=0;s--)for(r=(n=o(c[s],this.document[0])).length-1;r>=0;r--)(h=e.data(n[r],this.pluginName))&&h!==this&&!h.options.disabled&&l.push([t.isFunction(h.options.items)?h.options.items.call(h.element):o(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h]);function p(){a.push(this)}for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):o(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(p);return o(a)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.pluginName+"-item)");this.items=this.items.filter(function(e){for(var i=0;i<t.length;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(i){this.items=[],this.containers=[this];var s,r,n,h,a,l,c,p,f=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],i,{item:this.currentItem}):o(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(s=d.length-1;s>=0;s--)for(r=(n=o(d[s],this.document[0])).length-1;r>=0;r--)(h=e.data(n[r],this.pluginName))&&h!==this&&!h.options.disabled&&(u.push([t.isFunction(h.options.items)?h.options.items.call(h.element[0],i,{item:this.currentItem}):o(h.options.items,h.element),h]),this.containers.push(h));for(s=u.length-1;s>=0;s--)for(a=u[s][1],r=0,p=(l=u[s][0]).length;r<p;r++)(c=o(l[r])).data(this.pluginName+"-item",a),f.push({item:c,instance:a,width:0,height:0,left:0,top:0})},_refreshItemPositions:function(t){var e,i,s,r;for(e=this.items.length-1;e>=0;e--)i=this.items[e],this.currentContainer&&i.instance!==this.currentContainer&&i.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?o(this.options.toleranceElement,i.item):i.item,t||(i.width=s.outerWidth(),i.height=s.outerHeight()),r=s.offset(),i.left=r.left,i.top=r.top)},refreshPositions:function(t){var e,i;if(this.floating=!!this.items.length&&("x"===this.options.axis||this._isFloating(this.items[0].item)),null!==this.innermostContainer&&this._refreshItemPositions(t),this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(e=this.containers.length-1;e>=0;e--)i=this.containers[e].element.offset(),this.containers[e].containerCache.left=i.left,this.containers[e].containerCache.top=i.top,this.containers[e].containerCache.width=this.containers[e].element.outerWidth(),this.containers[e].containerCache.height=this.containers[e].element.outerHeight();return this},_createPlaceholder:function(t){var e,i,s=(t=t||this).options;s.placeholder&&s.placeholder.constructor!==String||(e=s.placeholder,i=t.currentItem[0].nodeName.toLowerCase(),s.placeholder={element:function(){var s=o("<"+i+">",t.document[0]);return t._addClass(s,"ui-sortable-placeholder",e||t.currentItem[0].className)._removeClass(s,"ui-sortable-helper"),"tbody"===i?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),o("<tr>",t.document[0]).appendTo(s)):"tr"===i?t._createTrPlaceholder(t.currentItem,s):"img"===i&&s.attr("src",t.currentItem.attr("src")),e||s.css("visibility","hidden"),s},update:function(o,r){e&&!s.forcePlaceholderSize||(r.height()&&(!s.forcePlaceholderSize||"tbody"!==i&&"tr"!==i)||r.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),r.width()||r.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=o(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,e){var i=this;t.children().each(function(){o("<td>&#160;</td>",i.document[0]).attr("colspan",o(this).attr("colspan")||1).appendTo(e)})},_contactContainers:function(t){var e,i,o,r,n,h,a,l,c,p,f=null,u=null;for(e=this.containers.length-1;e>=0;e--)if(!s.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(f&&s.contains(this.containers[e].element[0],f.element[0]))continue;f=this.containers[e],u=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",t,this._uiHash(this)),this.containers[e].containerCache.over=0);if(this.innermostContainer=f,f)if(1===this.containers.length)this.containers[u].containerCache.over||(this.containers[u]._trigger("over",t,this._uiHash(this)),this.containers[u].containerCache.over=1);else{for(o=1e4,r=null,n=(c=f.floating||this._isFloating(this.currentItem))?"left":"top",h=c?"width":"height",p=c?"pageX":"pageY",i=this.items.length-1;i>=0;i--)s.contains(this.containers[u].element[0],this.items[i].item[0])&&this.items[i].item[0]!==this.currentItem[0]&&(a=this.items[i].item.offset()[n],l=!1,t[p]-a>this.items[i][h]/2&&(l=!0),Math.abs(t[p]-a)<o&&(o=Math.abs(t[p]-a),r=this.items[i],this.direction=l?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[u])return void(this.currentContainer.containerCache.over||(this.containers[u]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1));r?this._rearrange(t,r,null,!0):this._rearrange(t,null,this.containers[u].element,!0),this._trigger("change",t,this._uiHash()),this.containers[u]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[u],this.options.placeholder.update(this.currentContainer,this.placeholder),this.scrollParent=this.placeholder.scrollParent(),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this.containers[u]._trigger("over",t,this._uiHash(this)),this.containers[u].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?o(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||this.appendTo[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),s[0].style.width&&!i.forceHelperSize||s.width(this.currentItem.width()),s[0].style.height&&!i.forceHelperSize||s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&s.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,i,s=this.options;"parent"===s.containment&&(s.containment=this.helper[0].parentNode),"document"!==s.containment&&"window"!==s.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===s.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===s.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(s.containment)||(t=o(s.containment)[0],e=o(s.containment).offset(),i="hidden"!==o(t).css("overflow"),this.containment=[e.left+(parseInt(o(t).css("borderLeftWidth"),10)||0)+(parseInt(o(t).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(o(t).css("borderTopWidth"),10)||0)+(parseInt(o(t).css("paddingTop"),10)||0)-this.margins.top,e.left+(i?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(o(t).css("borderLeftWidth"),10)||0)-(parseInt(o(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(i?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(o(t).css("borderTopWidth"),10)||0)-(parseInt(o(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&s.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,r=/(html|body)/i.test(o[0].tagName);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():r?0:o.scrollTop())*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():r?0:o.scrollLeft())*i}},_generatePosition:function(t){var e,i,o=this.options,r=t.pageX,n=t.pageY,h="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&s.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(h[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(r=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(n=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(r=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(n=this.containment[3]+this.offset.click.top)),o.grid&&(e=this.originalPageY+Math.round((n-this.originalPageY)/o.grid[1])*o.grid[1],n=this.containment?e-this.offset.click.top>=this.containment[1]&&e-this.offset.click.top<=this.containment[3]?e:e-this.offset.click.top>=this.containment[1]?e-o.grid[1]:e+o.grid[1]:e,i=this.originalPageX+Math.round((r-this.originalPageX)/o.grid[0])*o.grid[0],r=this.containment?i-this.offset.click.left>=this.containment[0]&&i-this.offset.click.left<=this.containment[2]?i:i-this.offset.click.left>=this.containment[0]?i-o.grid[0]:i+o.grid[0]:i)),{top:n-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:h.scrollTop()),left:r-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:h.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var o=this.counter;this._delay(function(){o===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)"auto"!==this._storedCSS[i]&&"static"!==this._storedCSS[i]||(this._storedCSS[i]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();function o(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)e||s.push(o("deactivate",this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(o("out",this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(i=0;i<s.length;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(t,e,i){!1===this.overrided(t,e,i)&&this.cancel()},_uiHash:function(t){var e=t||this;return{helper:e.helper,placeholder:e.placeholder||o([]),position:e.position,originalPosition:e.originalPosition,offset:e.positionAbs,item:e.currentItem,sender:t?t.element:null}}});return r.register(a,"sortable"),a});
//# sourceMappingURL=sourcemaps/Sortable.js.map
