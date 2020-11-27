/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
//import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/three-vertical-dots.svg';
import View from '@ckeditor/ckeditor5-ui/src/view';

export default class ClassicEditor extends ClassicEditorBase {
}

ClassicEditor.settStandardTekster = function(mapper) {
	ClassicEditor.defaultConfig.toolbar.items.push('standardtekster');
	ClassicEditor.standardtekstMapper = mapper;
};

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Subscript,
	Superscript,
	EasyImage,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	Base64UploadAdapter,
	ImageResize,
	Alignment,
	Standardtekster
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
			'|',
			'imageUpload',
			//'blockQuote',
			'insertTable',
			// 'mediaEmbed',
			'undo',
			'redo',
			//'standardtekster'
		]
	},
	image: {
		styles: [
			'alignLeft', 'alignCenter', 'alignRight'
		],
		toolbar: [
			'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'nb'
};


class Standardtekster extends Plugin {
	static get pluginName() {
        return 'Standardtekster';
    }
    
    init() {
		console.log("Standardtekster plugin init");
        const editor = this.editor;
        const t = editor.t;

        // Register UI component
        editor.ui.componentFactory.add('standardTekster', locale => {

			//const command = editor.commands.get( 'insertTable' );
			const dropdownView = createDropdown( locale );

			//dropdownView.bind( 'isEnabled' ).to( command );

			// Decorate dropdown's button.
			dropdownView.buttonView.set( {
				icon: imageIcon,
				label: t( 'Sett inn standardtekst' ),
				tooltip: true
			} );

			let stdTextView;

			dropdownView.on( 'change:isOpen', () => {
				if ( stdTextView ) {
					return;
				}

				function toggleFolder(event) {
					console.log('toggleFolder', event.target);
					event.target.classList.toggle('open');

					var uls = event.target.getElementsByTagName('ul');

					if (uls.length > 0) {
						uls[0].classList.toggle('hidden');
					}
					
					event.cancelBubble = true;
				}
				
				function clickText(event) {
					console.log('Text clicked: ' + this.innerText);

					var content = this.getAttribute("data-content");
					console.log('content: ' + content);

					const viewFragment = editor.data.processor.toView( content );
					const modelFragment = editor.data.toModel( viewFragment );

					editor.model.insertContent( modelFragment );

					dropdownView.isOpen = false;

					editor.editing.view.focus();

					event.cancelBubble = true;
				}

				// Prepare custom view for dropdown's panel.
				stdTextView = new StandardteksterView(locale, ClassicEditor.standardtekstMapper);
				dropdownView.panelView.children.add( stdTextView );

				stdTextView.delegate( 'execute' ).to( dropdownView );

				const folderNodes = document.getElementsByClassName('folder');
				for (var i=0; i < folderNodes.length; i++) {
					var node = folderNodes[i];
					node.addEventListener('click', toggleFolder, false);
				}

				const standardtextNodes = document.getElementsByClassName('standardtext');
				for (var i=0; i < standardtextNodes.length; i++) {
					var node = standardtextNodes[i];
					node.addEventListener('click', clickText, false);
				}

				dropdownView.on( 'execute', () => {
					console.log('drowpdownview execute');
					//editor.execute( 'insertTable', { rows: stdTextView.rows, columns: stdTextView.columns } );
					editor.editing.view.focus();
				} );
			} );

			return dropdownView;
        });
    }
}

class StandardteksterView extends View {

	constructor(locale, mapper) {
		super(locale);

		console.log('StdTextView', mapper);

		var styleContent = '<style>\
		li > ul {\
			padding-left: 20px !important;\
		}\
		li {\
			overflow: hidden !important;\
		}\
		.standardtext {\
			font-style: normal;\
			font-weight: normal;\
		}\
		li.standardtekst:hover {\
			background: #E0E0FF !important;\
		}\
		.hidden {\
			display: none;\
		}\
		.open {\
			font-style: italic !important;\
			font-weight: bold !important;\
		}\
		.dropdown-padding {\
			padding: 0px 10px 0px 10px !important;\
		}\
		</style>';
		
		function lagMappeHtml(mappen) {
			var tmp = '<li class="folder closed">' + mappen.navn;
			
			if (mappen.mapper.length > 0 || mappen.standardTekster.length > 0)
				tmp += '<ul class="folder-content hidden">';
			for (var j = 0; j < mappen.mapper.length; j++) {
				tmp += lagMappeHtml(mappen.mapper[j]);
			}
			
			for (var k = 0; k < mappen.standardTekster.length; k++) {
				tmp += lagTekstHtml(mappen.standardTekster[k]);
			}

			if (mappen.mapper.length > 0 || mappen.standardTekster.length > 0)
				tmp += '</ul>';

			tmp += '</li>';

			return tmp;
		}

		function lagTekstHtml(tekst) {
			return '<li data-content="' + tekst.innhold + '" class="standardtext">' + tekst.navn + '</li>';
		}

		var htmlContent = '<ul>';
	
		for (var i = 0; i < mapper.length; i++) {
			var mappe = mapper[i];
			htmlContent += lagMappeHtml(mappe);
		}
	
		htmlContent += '</ul>';
	
		var enDiv = document.createElement('div');
		enDiv.innerHTML = styleContent + htmlContent;

		this.setTemplate({
			tag: 'div',				
			children: [enDiv],
			attributes: {
				class: ['dropdown-padding']
			}
		});
	}
}