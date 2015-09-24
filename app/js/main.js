$(document).ready( function ready() {
	'use strict';

	var animator = new require( './js/logoAnimation.js' );

	// MODULES //
	var gui = require( 'nw.gui' ),
		path = require( 'path' );


	// DATABASE //
	var db = require( './js/DB.js' );


	// FUNCTIONS //

	var runBatchProcess = require( './js/batchProcess.js'),
		runProcess = require( './js/process.js' ),
		saveFile = require( './js/saveFile.js' ),
		showTable = require( './js/showTable.js' );


	// ELEMENTS //

	var $batchProcessDiv = $( '#batchProcessDiv' ),
		$dictDiv = $( '#dictDiv' ),
		$dictTitle = $( '#dictTitle' ),
		$fileProcess = $( '#fileProcess' ),
		$fileProcessDiv = $( '#fileProcessDiv' ),
		$optionsDiv = $( '#optionsDiv' ),
		$process_btn = $( '#process_btn' ),
		$splashScreen = $( '#splashScreen' );

	$process_btn.click( processFile );

	$fileProcess.click( function onFileProcessClick() {
		$splashScreen.fadeOut();
		$fileProcessDiv.show();
	});
	$( '#batchProcess' ).click( function onFileProcessClick() {
		$splashScreen.fadeOut();
		$fileProcessDiv.hide();
		$batchProcessDiv.show();
	});
	$( '#batchFileButton' ).click( function onBatchClick() {
		$( '#startBatch input[type=\'file\']' ).trigger( 'click' );
	});

	$( '#startBatch input[type=\'file\']' ).change( function() {
		$( '#batchVal' ).text( this.value.replace(/C:\\fakepath\\/i, '') );
	});

	// ADD MENUS //

	var windowMenu = new gui.Menu({
		'type': 'menubar'
	});
	var firstMenuItem = new gui.MenuItem({
		'label': 'Process',
		'submenu': new gui.Menu()
	});
	windowMenu.append( firstMenuItem );
	// Add submenu items
	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'File',
		'click': function fileClick() {
			$splashScreen.hide();
			$optionsDiv.hide();
			$dictDiv.hide();
			$batchProcessDiv.hide();
			$fileProcessDiv.show();
		},
		'key': 'f'
	}));
	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Batch',
		'click': function batchClick() {
			$dictDiv.hide();
			$optionsDiv.hide();
			$fileProcessDiv.hide();
			$splashScreen.hide();
			$batchProcessDiv.show();
		},
		'key': 'b'
	}));

	firstMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Options',
		'click': function showOptions() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$fileProcessDiv.hide();
			$dictDiv.hide();
			$optionsDiv.show();
		}
	}));

	var secondMenuItem = new gui.MenuItem({
		'label': 'Dictionary',
		'submenu': new gui.Menu()
	});
	windowMenu.append( secondMenuItem );

	var displayMenuItem = new gui.MenuItem({
		'label': 'Display',
		'submenu': new gui.Menu(),
		'key': 'd'
	});
	secondMenuItem.submenu.append( displayMenuItem );
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Names',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$dictTitle.text( 'Names' );
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'names', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Locations',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$dictTitle.text( 'Locations' );
			$dictDiv.show();
			var $dictTable = $( '#dictTable' );
			showTable( 'locations', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Dates',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Dates' );
			var $dictTable = $( '#dictTable' );
			showTable( 'dates', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Emails',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$optionsDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Emails' );
			var $dictTable = $( '#dictTable' );
			showTable( 'emails', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Fax Numbers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Fax Numbers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'fax', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'IP Addresses',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'IP Addresses' );
			var $dictTable = $( '#dictTable' );
			showTable( 'ip', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Phone Numbers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Phone Numbers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'phone', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'URLs',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'URLs' );
			var $dictTable = $( '#dictTable' );
			showTable( 'urls', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Social Security Numbers (SSN)',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Social Security Numbers (SSN)' );
			var $dictTable = $( '#dictTable' );
			showTable( 'ssn', $dictTable );
		}
	}));
	displayMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Vehicle Identifiers',
		'click': function showDict() {
			$splashScreen.hide();
			$batchProcessDiv.hide();
			$dictDiv.show();
			$dictTitle.text( 'Vehicle Identifiers' );
			var $dictTable = $( '#dictTable' );
			showTable( 'vehicles', $dictTable );
		}
	}));

	secondMenuItem.submenu.append( new gui.MenuItem({
		'label': 'Reset',
		'click': function resetDict() {
			var win = gui.Window.open( './reset.html', {
				'position': 'center',
				'width': 350,
				'height': 175,
				'resizable': false,
				'focus': true,
				'toolbar': false
			});
			win.on( 'closed', function() {
				this.hide();
				if (win !== null) {
					win.close(true);
				}
				this.close(true);
			});
		},
		'key': 'r'
	}));

	var fourthMenuItem = new gui.MenuItem({
		'label': 'Help',
		'submenu': new gui.Menu()
	});
	windowMenu.append( fourthMenuItem );

	fourthMenuItem.submenu.append( new gui.MenuItem({
		'label': 'About',
		'click': function aboutClick() {
			console.log("ABOUT ME");
		},
		'key': 'a'
	}));

	// Set the menu
	gui.Window.get().menu = windowMenu;

	// Prevent default behavior from changing page on dropped file
	window.ondragover = function(e) {
		e.preventDefault();
		return false;
	};
	window.ondrop = function(e) {
		e.preventDefault();
		return false;
	};
	var file = [];

	var holder = document.getElementById( 'holder' );

	holder.ondragover = function () {
		this.className = 'hover'; return false;
	};
	holder.ondragleave = function () {
		this.className = '';
		return false;
	};
	holder.ondrop = function (e) {
		e.preventDefault();

		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			file = e.dataTransfer.files[i].path;
		}

		$( '#filePathHolder' ).text( path.basename( file ) );
		$( '#process_div' ).show();
		return false;
	};

	function processFile(){
		var config = {
			'names': $('#check_names').is(':checked'),
			'locations': $('#check_locations').is(':checked'),
			'dates': $('#check_dates').is(':checked'),
			'phone': $('#check_phone').is(':checked'),
			'fax': $('#check_fax').is(':checked'),
			'emails': $('#check_emails').is(':checked'),
			'ssn': $('#check_ssn').is(':checked'),
			'vehicles': $('#check_vehicles').is(':checked')
		};
		runProcess( file, config, function( err, res ) {
			$( '#original_panel' ).text( res.original );
			$( '#deidentified_panel' ).text( res.processed );
			$( '#save_holder' ).html( '<input id="save_btn" type="file" class="form-control" nwsaveas=' + file + '/>');
			$( '#save_form' ).show();
			document
				.querySelector( '#save_btn' )
				.addEventListener( 'change', function(){
					var filePath = this.value;
					saveFile( filePath, res.processed, function() {
						$( '#save_form' ).hide();
						gui.Shell.openItem( filePath );
						alert( 'File successfully saved!' );
					});
				});
		});
	}

	$( '#batchInput').change( function onBatchChange() {
		var dir = $( '#batchInput' ).val();
		var config = {
			'names': $('#check_names').is(':checked'),
			'locations': $('#check_locations').is(':checked'),
			'dates': $('#check_dates').is(':checked'),
			'phone': $('#check_phone').is(':checked'),
			'fax': $('#check_fax').is(':checked'),
			'emails': $('#check_emails').is(':checked'),
			'ssn': $('#check_ssn').is(':checked'),
			'vehicles': $('#check_vehicles').is(':checked')
		};
		runBatchProcess( dir, config, function() {
			alert( 'Files successfully processed!' );
		});
	});

});