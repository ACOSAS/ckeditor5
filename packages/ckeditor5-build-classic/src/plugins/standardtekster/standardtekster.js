/**
 * @license Copyright (c) 2020, ACOS.
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import textIcon from '../standardtekster/icons/text.svg';
import folderIcon from '../standardtekster/icons/folder.svg';

import View from '@ckeditor/ckeditor5-ui/src/view';


export default class Standardtekster extends Plugin {
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
				icon: textIcon,
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

                console.log("plugin editor", editor);

				stdTextView = new StandardteksterView(locale, Standardtekster.standardtekstMapper);
				dropdownView.panelView.children.add( stdTextView );

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
			padding: 2px 5px 2px 5px !important;\
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
		.dropdown-container {\
			padding: 5px !important;\
		}\
		</style>';
		
		function lagMappeHtml(mappen) {
			var tmp = '<li class="folder closed">' + folderIcon + mappen.navn;
			
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
			return '<li data-content="' + tekst.innhold + '" class="standardtext">' + textIcon + tekst.navn + '</li>';
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
				class: ['dropdown-container']
			}
		});
	}
}