/* globals window, document */
( function() {

// Find the script element
var scripts = document.getElementsByTagName( "script" );
var script = scripts[ scripts.length - 1 ];

// Read the modules
var modules = script.getAttribute( "data-modules" );
var composite = script.getAttribute( "data-composite" ) || false;
var pathParts = window.location.pathname.split( "/" );
var widgets = [
	"Draggable",
	"Droppable",
	"Mouse",
	"Resizable",
	"Selectable",
	"Sortable"
];

function getPath( module ) {
	for ( var i = 0; i < widgets.length; i++ ) {
		if ( widgets[ i ] === module ) {
			return "skylark-jqueryui-interact/" + module;
		}
	}
	return module;
}
function fixPaths( modules ) {
	for ( var i = 0; i < modules.length; i++ ) {
		modules[ i ] = getPath( modules[ i ] );
	}
	return modules;
}

// Hide the page while things are loading to prevent a FOUC
document.documentElement.className = "demo-loading";

require.config( {
	baseUrl: window.location.pathname.indexOf( "demos/" ) !== -1 ? ".." : "../..",
	packages : [
         {
           name : "skylark-langx-arrays",
           location : "../node_modules/skylark-langx-arrays/dist/uncompressed/skylark-langx-arrays",
            main: 'main'
         },
         {
           name : "skylark-langx-aspect",
           location : "../node_modules/skylark-langx-aspect/dist/uncompressed/skylark-langx-aspect",
            main: 'main'
         },
         {
           name : "skylark-langx-async",
           location : "../node_modules/skylark-langx-async/dist/uncompressed/skylark-langx-async",
            main: 'main'
         },
         {
           name : "skylark-langx-binary",
           location : "../node_modules/skylark-langx-binary/dist/uncompressed/skylark-langx-binary",
            main: 'main'
         },
         {
           name : "skylark-langx-constructs",
           location : "../node_modules/skylark-langx-constructs/dist/uncompressed/skylark-langx-constructs",
            main: 'main'
         },
         {
           name : "skylark-langx-datetimes",
           location : "../node_modules/skylark-langx-datetimes/dist/uncompressed/skylark-langx-datetimes",
            main: 'main'
         },
         {
           name : "skylark-langx-emitter",
           location : "../node_modules/skylark-langx-emitter/dist/uncompressed/skylark-langx-emitter",
            main: 'main'
         },
         {
           name : "skylark-langx-events",
           location : "../node_modules/skylark-langx-events/dist/uncompressed/skylark-langx-events",
            main: 'main'
         },
         {
           name : "skylark-langx-funcs",
           location : "../node_modules/skylark-langx-funcs/dist/uncompressed/skylark-langx-funcs",
            main: 'main'
         },
         {
           name : "skylark-langx-globals",
           location : "../node_modules/skylark-langx-globals/dist/uncompressed/skylark-langx-globals",
            main: 'main'
         },
         {
           name : "skylark-langx-hoster",
           location : "../node_modules/skylark-langx-hoster/dist/uncompressed/skylark-langx-hoster",
            main: 'main'
         },
         {
           name : "skylark-langx-klass",
           location : "../node_modules/skylark-langx-klass/dist/uncompressed/skylark-langx-klass",
            main: 'main'
         },
         {
           name : "skylark-langx-maths",
           location : "../node_modules/skylark-langx-maths/dist/uncompressed/skylark-langx-maths",
            main: 'main'
         },
         {
           name : "skylark-langx-ns",
           location : "../node_modules/skylark-langx-ns/dist/uncompressed/skylark-langx-ns",
            main: 'main'
         },
         {
           name : "skylark-langx-numerics",
           location : "../node_modules/skylark-langx-numerics/dist/uncompressed/skylark-langx-numerics",
            main: 'main'
         },
         {
           name : "skylark-langx-objects",
           location : "../node_modules/skylark-langx-objects/dist/uncompressed/skylark-langx-objects",
            main: 'main'
         },

         {
           name : "skylark-langx-scripter",
           location : "../node_modules/skylark-langx-scripter/dist/uncompressed/skylark-langx-scripter",
            main: 'main'
         },

         {
           name : "skylark-langx-strings",
           location : "../node_modules/skylark-langx-strings/dist/uncompressed/skylark-langx-strings",
            main: 'main'
         },
         {
           name : "skylark-langx-topic",
           location : "../node_modules/skylark-langx-topic/dist/uncompressed/skylark-langx-topic",
            main: 'main'
         },
         {
           name : "skylark-langx-types",
           location : "../node_modules/skylark-langx-types/dist/uncompressed/skylark-langx-types",
            main: 'main'
         },
         {
           name : "skylark-langx-urls",
           location : "../node_modules/skylark-langx-urls/dist/uncompressed/skylark-langx-urls",
            main: 'main'
         },
         {
           name : "skylark-net-http",
           location : "../node_modules/skylark-net-http/dist/uncompressed/skylark-net-http",
            main: 'main'
         },
         {
           name : "skylark-langx",
           location : "../node_modules/skylark-langx/dist/uncompressed/skylark-langx",
            main: 'main'
         },


         {
           name : "skylark-io-diskfs",
           location : "../node_modules/skylark-io-diskfs/dist/uncompressed/skylark-io-diskfs",
            main: 'main'
         },

         {
           name : "skylark-domx-animates",
           location : "../node_modules/skylark-domx-animates/dist/uncompressed/skylark-domx-animates",
            main: 'main'
         },
         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-css",
           location : "../node_modules/skylark-domx-css/dist/uncompressed/skylark-domx-css",
            main: 'main'
         },

         {
           name : "skylark-domx-data",
           location : "../node_modules/skylark-domx-data/dist/uncompressed/skylark-domx-data",
            main: 'main'
         },
         {
           name : "skylark-domx-eventer",
           location : "../node_modules/skylark-domx-eventer/dist/uncompressed/skylark-domx-eventer",
            main: 'main'
         },
         {
           name : "skylark-domx-finder",
           location : "../node_modules/skylark-domx-finder/dist/uncompressed/skylark-domx-finder",
            main: 'main'
         },
         {
           name : "skylark-domx-files" ,
           location : "../node_modules/skylark-domx-files/dist/uncompressed/skylark-domx-files",
//           location : "../../../domx/skylark-domx-files/src",
            main: 'main'
          },
          {
            name: 'skylark-domx-forms',
            location : "../node_modules/skylark-domx-forms/dist/uncompressed/skylark-domx-forms",
            main: 'main'
          },
         {
           name : "skylark-domx-fx",
           location : "../node_modules/skylark-domx-fx/dist/uncompressed/skylark-domx-fx",
            main: 'main'
         },
         {
           name : "skylark-domx-geom",
           location : "../node_modules/skylark-domx-geom/dist/uncompressed/skylark-domx-geom",
            main: 'main'
         },
         {
           name : "skylark-domx-iframes",
           location : "../node_modules/skylark-domx-iframes/dist/uncompressed/skylark-domx-iframes",
            main: 'main'
         },
         {
           name : "skylark-domx-images",
           location : "../node_modules/skylark-domx-images/dist/uncompressed/skylark-domx-images",
            main: 'main'
         },
         {
           name : "skylark-domx-lists",
           location : "../node_modules/skylark-domx-lists/dist/uncompressed/skylark-domx-lists",
            main: 'main'
         },
         {
           name : "skylark-domx-noder",
           location : "../node_modules/skylark-domx-noder/dist/uncompressed/skylark-domx-noder",
            main: 'main'
         },
         {
           name : "skylark-domx-query",
           location : "../node_modules/skylark-domx-query/dist/uncompressed/skylark-domx-query",
            main: 'main'
         },

         {
           name : "skylark-domx-styler",
           location : "../node_modules/skylark-domx-styler/dist/uncompressed/skylark-domx-styler",
            main: 'main'
         },
         {
           name : "skylark-domx-tables",
           location : "../node_modules/skylark-domx-tables/dist/uncompressed/skylark-domx-tables",
            main: 'main'
         },
         {
           name : "skylark-domx-transforms",
           location : "../node_modules/skylark-domx-transforms/dist/uncompressed/skylark-domx-transforms",
            main: 'main'
         },
         {
           name : "skylark-domx-transits",
           location : "../node_modules/skylark-domx-transits/dist/uncompressed/skylark-domx-transits",
            main: 'main'
         },
         {
           name : "skylark-domx-velm",
           location : "../node_modules/skylark-domx-velm/dist/uncompressed/skylark-domx-velm",
            main: 'main'
         },
                  
         {
           name : "skylark-domx",
           location : "../node_modules/skylark-domx/dist/uncompressed/skylark-domx",
            main: 'main'
         },

         {
           name : "skylark-data-collection" ,
           location : "../node_modules/skylark-data-collection/dist/uncompressed/skylark-data-collection",
            main: 'main'
         },

         {
           name : "skylark-domx-plugins-base",
           location : "../node_modules/skylark-domx-plugins-base/dist/uncompressed/skylark-domx-plugins-base",
            main: 'main'
         },
          {
            name: 'skylark-domx-plugins-scrolls',
            location : "../node_modules/skylark-domx-plugins-scrolls/dist/uncompressed/skylark-domx-plugins-scrolls",
            main: 'main'
          },
/*
          {
            name: 'skylark-domx-plugins-interact',
            location : "../node_modules/skylark-domx-plugins-interact/dist/uncompressed/skylark-domx-plugins-interact",
            main: 'main'
          },
*/
          {
            name: 'skylark-domx-plugins-toggles',
            location : "../node_modules/skylark-domx-plugins-toggles/dist/uncompressed/skylark-domx-plugins-toggles",
            main: 'main'
          },
          {
            name: 'skylark-domx-plugins-popups',
            location : "../node_modules/skylark-domx-plugins-popups/dist/uncompressed/skylark-domx-plugins-popups",
            main: 'main'
          },
          {
            name: 'skylark-bootstrap3',
            location : "../node_modules/skylark-bootstrap3/dist/uncompressed/skylark-bootstrap3",
            main: 'main'
          },
         {
            name: 'skylark-jquery',
            location : "../node_modules/skylark-jquery/dist/uncompressed/skylark-jquery",
            main: 'main'
          },

         {
           name : "skylark-widgets-base",
           location : "../node_modules/skylark-widgets-base/dist/uncompressed/skylark-widgets-base",
//           location : "../../skylark-widgets-base/src",
           main: 'main'
         },          

          {
            name: 'skylark-fabric',
            location : "../node_modules/skylark-fabric/dist/uncompressed/skylark-fabric",
//            location : "../../skylark-widgets-swt/src",
            main: 'main'
          },

          
          {
            name: 'skylark-domx-plugins-interact',
           location : "../node_modules/skylark-domx-plugins-interact/dist/uncompressed/skylark-domx-plugins-interact",
            main: 'main'
          },

            { name: "skylark-jqueryui-interact", location: "../src" }

	],
	paths: {
		"external": "../external/"
	},
	shim: {
		"external/globalize/globalize.culture.de-DE": [ "external/globalize/globalize" ],
		"external/globalize/globalize.culture.ja-JP": [ "external/globalize/globalize" ]
	},
    "map": {
        "*": {
            "jquery": "skylark-jquery"
        }
    }	
} );


modules = modules ? modules.replace( /^\s+|\s+$/g, "" ).split( /\s+/ ) : [];
if ( !composite ) {
	modules.push( pathParts[ pathParts.length - 2 ] );
}
modules = fixPaths( modules );

require( modules, function() {
	var newScript = document.createElement( "script" );

	document.documentElement.className = "";

	newScript.text = "( function() { " + script.innerHTML + " } )();";
	document.body.appendChild( newScript ).parentNode.removeChild( newScript );
} );

} )();
