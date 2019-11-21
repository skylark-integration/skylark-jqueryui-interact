/**
 * skylark-jqueryui-interact - A version of jqueryui interact that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jqueryui-interact/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-eventer","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins","./Mouse","./patch","./ddmanager"],function(t,e,s,i,o,r,n,l){var a=r.inherit({klassName:"Draggable",pluginName:"ui.draggable",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){(this.helper||this.element).is(".ui-draggable-dragging")?this.destroyOnClear=!0:(this._removeHandleClassName(),this._mouseDestroy())},_mouseCapture:function(t){var e=this.options;return!(this.helper||e.disabled||i(t.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(t),!!this.handle&&(this._blurActiveElement(t),this._blockFrames(!0===e.iframeFix?"iframe":e.iframeFix),!0))},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=i(this);return i("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var e=s.active(this.document[0]);i(t.target).closest(e).length||s.blur(e)},_mouseStart:function(t){var e=this.options;return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),l&&(l.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===i(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this._setContainment(),!1===this._trigger("start",t)?(this._clear(),!1):(this._cacheHelperProportions(),l&&!e.dropBehaviour&&l.prepareOffsets(this,t),this._mouseDrag(t,!0),l&&l.dragStart(this,t),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(t,s){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!s){var i=this._uiHash();if(!1===this._trigger("drag",t,i))return this._mouseUp(new e.create("mouseup",t)),!1;this.position=i.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",l&&l.drag(this,t),!1},_mouseStop:function(e){var s=this,o=!1;return l&&!this.options.dropBehaviour&&(o=l.drop(this,e)),this.dropped&&(o=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!o||"valid"===this.options.revert&&o||!0===this.options.revert||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,o)?i(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==s._trigger("stop",e)&&s._clear()}):!1!==this._trigger("stop",e)&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),l&&l.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),this.overrided(t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(e.create("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!i(t.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var s=this.options,o=t.isFunction(s.helper),r=o?i(s.helper.apply(this.element[0],[e])):"clone"===s.helper?this.element.clone().removeAttr("id"):this.element;return r.parents("body").length||r.appendTo("parent"===s.appendTo?this.element[0].parentNode:s.appendTo),o&&r[0]===this.element[0]&&this._setPositionRelative(),r[0]===this.element[0]||/(fixed|absolute)/.test(r.css("position"))||r.css("position","absolute"),r},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),e=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==e&&s.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,e,s,o=this.options,r=this.document[0];this.relativeContainer=null,o.containment?"window"!==o.containment?"document"!==o.containment?o.containment.constructor!==Array?("parent"===o.containment&&(o.containment=this.helper[0].parentNode),(s=(e=i(o.containment))[0])&&(t=/(scroll|auto)/.test(e.css("overflow")),this.containment=[(parseInt(e.css("borderLeftWidth"),10)||0)+(parseInt(e.css("paddingLeft"),10)||0),(parseInt(e.css("borderTopWidth"),10)||0)+(parseInt(e.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e.css("borderRightWidth"),10)||0)-(parseInt(e.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e.css("borderBottomWidth"),10)||0)-(parseInt(e.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=e)):this.containment=o.containment:this.containment=[0,0,i(r).width()-this.helperProportions.width-this.margins.left,(i(r).height()||r.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=[i(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,i(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,i(window).scrollLeft()+i(window).width()-this.helperProportions.width-this.margins.left,i(window).scrollTop()+(i(window).height()||r.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=null},_convertPositionTo:function(t,e){e||(e=this.position);var s="absolute"===t?1:-1,i=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.offset.scroll.top:i?0:this.offset.scroll.top)*s,left:e.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.offset.scroll.left:i?0:this.offset.scroll.left)*s}},_generatePosition:function(t,e){var s,i,o,r,n=this.options,l=this._isRootNode(this.scrollParent[0]),a=t.pageX,h=t.pageY;return l&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(i=this.relativeContainer.offset(),s=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):s=this.containment,t.pageX-this.offset.click.left<s[0]&&(a=s[0]+this.offset.click.left),t.pageY-this.offset.click.top<s[1]&&(h=s[1]+this.offset.click.top),t.pageX-this.offset.click.left>s[2]&&(a=s[2]+this.offset.click.left),t.pageY-this.offset.click.top>s[3]&&(h=s[3]+this.offset.click.top)),n.grid&&(o=n.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/n.grid[1])*n.grid[1]:this.originalPageY,h=s?o-this.offset.click.top>=s[1]||o-this.offset.click.top>s[3]?o:o-this.offset.click.top>=s[1]?o-n.grid[1]:o+n.grid[1]:o,r=n.grid[0]?this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0]:this.originalPageX,a=s?r-this.offset.click.left>=s[0]||r-this.offset.click.left>s[2]?r:r-this.offset.click.left>=s[0]?r-n.grid[0]:r+n.grid[0]:r),"y"===n.axis&&(a=this.originalPageX),"x"===n.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:l?0:this.offset.scroll.top),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:l?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(t,e,s){return s=s||this._uiHash(),n.call(this,t,[e,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),this.overrided(t,e,s)},patches:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});return o.register(a,"draggable"),n.add(a,"connectToSortable",{start:function(e,s,o){var r=t.extend({},s,{item:o.element});o.sortables=[],i(o.options.connectToSortable).each(function(){var t=i(this).sortable("instance");t&&!t.options.disabled&&(o.sortables.push(t),t.refreshPositions(),t._trigger("activate",e,r))})},stop:function(e,s,i){var o=t.extend({},s,{item:i.element});i.cancelHelperRemoval=!1,t.each(i.sortables,function(){this.isOver?(this.isOver=0,i.cancelHelperRemoval=!0,this.cancelHelperRemoval=!1,this._storedCSS={position:this.placeholder.css("position"),top:this.placeholder.css("top"),left:this.placeholder.css("left")},this._mouseStop(e),this.options.helper=this.options._helper):(this.cancelHelperRemoval=!0,this._trigger("deactivate",e,o))})},drag:function(e,i,o){t.each(o.sortables,function(){var r=!1,n=this;n.positionAbs=o.positionAbs,n.helperProportions=o.helperProportions,n.offset.click=o.offset.click,n._intersectsWith(n.containerCache)&&(r=!0,t.each(o.sortables,function(){return this.positionAbs=o.positionAbs,this.helperProportions=o.helperProportions,this.offset.click=o.offset.click,this!==n&&this._intersectsWith(this.containerCache)&&s.contains(n.element[0],this.element[0])&&(r=!1),r})),r?(n.isOver||(n.isOver=1,o._parent=i.helper.parent(),n.currentItem=i.helper.appendTo(n.element).data("ui-sortable-item",!0),n.options._helper=n.options.helper,n.options.helper=function(){return i.helper[0]},e.target=n.currentItem[0],n._mouseCapture(e,!0),n._mouseStart(e,!0,!0),n.offset.click.top=o.offset.click.top,n.offset.click.left=o.offset.click.left,n.offset.parent.left-=o.offset.parent.left-n.offset.parent.left,n.offset.parent.top-=o.offset.parent.top-n.offset.parent.top,o._trigger("toSortable",e),o.dropped=n.element,t.each(o.sortables,function(){this.refreshPositions()}),o.currentItem=o.element,n.fromOutside=o),n.currentItem&&(n._mouseDrag(e),i.position=n.position)):n.isOver&&(n.isOver=0,n.cancelHelperRemoval=!0,n.options._revert=n.options.revert,n.options.revert=!1,n._trigger("out",e,n._uiHash(n)),n._mouseStop(e,!0),n.options.revert=n.options._revert,n.options.helper=n.options._helper,n.placeholder&&n.placeholder.remove(),i.helper.appendTo(o._parent),o._refreshOffsets(e),i.position=o._generatePosition(e,!0),o._trigger("fromSortable",e),o.dropped=!1,t.each(o.sortables,function(){this.refreshPositions()}))})}}),n.add(a,"cursor",{start:function(t,e,s){var o=i("body"),r=s.options;o.css("cursor")&&(r._cursor=o.css("cursor")),o.css("cursor",r.cursor)},stop:function(t,e,s){var o=s.options;o._cursor&&i("body").css("cursor",o._cursor)}}),n.add(a,"opacity",{start:function(t,e,s){var o=i(e.helper),r=s.options;o.css("opacity")&&(r._opacity=o.css("opacity")),o.css("opacity",r.opacity)},stop:function(t,e,s){var o=s.options;o._opacity&&i(e.helper).css("opacity",o._opacity)}}),n.add(a,"scroll",{start:function(t,e,s){s.scrollParentNotHidden||(s.scrollParentNotHidden=s.helper.scrollParent(!1)),s.scrollParentNotHidden[0]!==s.document[0]&&"HTML"!==s.scrollParentNotHidden[0].tagName&&(s.overflowOffset=s.scrollParentNotHidden.offset())},drag:function(t,e,s){var o=s.options,r=!1,n=s.scrollParentNotHidden[0],a=s.document[0];n!==a&&"HTML"!==n.tagName?(o.axis&&"x"===o.axis||(s.overflowOffset.top+n.offsetHeight-t.pageY<o.scrollSensitivity?n.scrollTop=r=n.scrollTop+o.scrollSpeed:t.pageY-s.overflowOffset.top<o.scrollSensitivity&&(n.scrollTop=r=n.scrollTop-o.scrollSpeed)),o.axis&&"y"===o.axis||(s.overflowOffset.left+n.offsetWidth-t.pageX<o.scrollSensitivity?n.scrollLeft=r=n.scrollLeft+o.scrollSpeed:t.pageX-s.overflowOffset.left<o.scrollSensitivity&&(n.scrollLeft=r=n.scrollLeft-o.scrollSpeed))):(o.axis&&"x"===o.axis||(t.pageY-i(a).scrollTop()<o.scrollSensitivity?r=i(a).scrollTop(i(a).scrollTop()-o.scrollSpeed):i(window).height()-(t.pageY-i(a).scrollTop())<o.scrollSensitivity&&(r=i(a).scrollTop(i(a).scrollTop()+o.scrollSpeed))),o.axis&&"y"===o.axis||(t.pageX-i(a).scrollLeft()<o.scrollSensitivity?r=i(a).scrollLeft(i(a).scrollLeft()-o.scrollSpeed):i(window).width()-(t.pageX-i(a).scrollLeft())<o.scrollSensitivity&&(r=i(a).scrollLeft(i(a).scrollLeft()+o.scrollSpeed)))),!1!==r&&l&&!o.dropBehaviour&&l.prepareOffsets(s,t)}}),n.add(a,"snap",{start:function(t,e,s){var o=s.options;s.snapElements=[],i(o.snap.constructor!==String?o.snap.items||":data(ui-draggable)":o.snap).each(function(){var t=i(this),e=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:e.top,left:e.left})})},drag:function(e,i,o){var r,n,l,a,h,p,c,f,d,g,u=o.options,m=u.snapTolerance,v=i.offset.left,_=v+o.helperProportions.width,P=i.offset.top,b=P+o.helperProportions.height;for(d=o.snapElements.length-1;d>=0;d--)p=(h=o.snapElements[d].left-o.margins.left)+o.snapElements[d].width,f=(c=o.snapElements[d].top-o.margins.top)+o.snapElements[d].height,_<h-m||v>p+m||b<c-m||P>f+m||!s.contains(o.snapElements[d].item.ownerDocument,o.snapElements[d].item)?(o.snapElements[d].snapping&&o.options.snap.release&&o.options.snap.release.call(o.element,e,t.extend(o._uiHash(),{snapItem:o.snapElements[d].item})),o.snapElements[d].snapping=!1):("inner"!==u.snapMode&&(r=Math.abs(c-b)<=m,n=Math.abs(f-P)<=m,l=Math.abs(h-_)<=m,a=Math.abs(p-v)<=m,r&&(i.position.top=o._convertPositionTo("relative",{top:c-o.helperProportions.height,left:0}).top),n&&(i.position.top=o._convertPositionTo("relative",{top:f,left:0}).top),l&&(i.position.left=o._convertPositionTo("relative",{top:0,left:h-o.helperProportions.width}).left),a&&(i.position.left=o._convertPositionTo("relative",{top:0,left:p}).left)),g=r||n||l||a,"outer"!==u.snapMode&&(r=Math.abs(c-P)<=m,n=Math.abs(f-b)<=m,l=Math.abs(h-v)<=m,a=Math.abs(p-_)<=m,r&&(i.position.top=o._convertPositionTo("relative",{top:c,left:0}).top),n&&(i.position.top=o._convertPositionTo("relative",{top:f-o.helperProportions.height,left:0}).top),l&&(i.position.left=o._convertPositionTo("relative",{top:0,left:h}).left),a&&(i.position.left=o._convertPositionTo("relative",{top:0,left:p-o.helperProportions.width}).left)),!o.snapElements[d].snapping&&(r||n||l||a||g)&&o.options.snap.snap&&o.options.snap.snap.call(o.element,e,t.extend(o._uiHash(),{snapItem:o.snapElements[d].item})),o.snapElements[d].snapping=r||n||l||a||g)}}),n.add(a,"stack",{start:function(e,s,o){var r,n=o.options,l=t.makeArray(i(n.stack)).sort(function(t,e){return(parseInt(i(t).css("zIndex"),10)||0)-(parseInt(i(e).css("zIndex"),10)||0)});l.length&&(r=parseInt(i(l[0]).css("zIndex"),10)||0,i(l).each(function(t){i(this).css("zIndex",r+t)}),this.css("zIndex",r+l.length))}}),n.add(a,"zIndex",{start:function(t,e,s){var o=i(e.helper),r=s.options;o.css("zIndex")&&(r._zIndex=o.css("zIndex")),o.css("zIndex",r.zIndex)},stop:function(t,e,s){var o=s.options;o._zIndex&&i(e.helper).css("zIndex",o._zIndex)}}),a});
//# sourceMappingURL=sourcemaps/Draggable.js.map