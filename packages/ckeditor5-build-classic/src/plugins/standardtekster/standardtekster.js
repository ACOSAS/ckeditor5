/**
 * @license Copyright (c) 2020, ACOS.
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import textIcon from '../standardtekster/icons/text.svg';
import folderIcon from '../standardtekster/icons/folder.svg';
import folderOpenIcon from '../standardtekster/icons/folder-open.svg';

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

			const dropdownView = createDropdown( locale );

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
                    var icons = event.currentTarget.getElementsByClassName('folder-icon');

                    for (var i=0; i < icons.length; i++) {
                        var icon = icons[i];

                        if (icon.parentNode.parentNode == event.currentTarget) {
                            icon.classList.toggle('hidden');
                        }                            
                    }

					var uls = event.currentTarget.getElementsByTagName('ul');

					if (uls.length > 0) {
						uls[0].classList.toggle('hidden');
					}
					
					event.cancelBubble = true;
				}
				
				function clickText(event) {
					console.log('Text clicked: ' + this.innerText);

					var content = this.getAttribute("data-content");
					const viewFragment = editor.data.processor.toView( content );
					const modelFragment = editor.data.toModel( viewFragment );
					editor.model.insertContent( modelFragment );

					dropdownView.isOpen = false;

					editor.editing.view.focus();

					event.cancelBubble = true;
				}

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

		var styleContent = `<style>
		li > ul {
			padding-left: 20px !important;
		}
		li {
			overflow: hidden !important;
		}
		.actionBtn {
			padding: 5px 10px 5px 10px !important;
			display: block !important;
		}
		.actionBtn:hover {
			background: #E0E0FF !important;
			cursor: pointer !important;
		}
		.standardtext {
			
		}
		.hidden {
			display: none;
		}
		.dropdown-container {
			padding: 5px !important;
		}
		</style>`;

		function escapeHtml(str) {
			const node = document.createElement('span');
			node.textContent = str;
			return node.innerHTML;
		}
		
		function lagMappeHtml(mappen) {
			var tmp = '<li class="folder closed">' + 
				'<span class="actionBtn">' +
                '<span class="folder-icon">' + folderIcon + '</span>' + 
                '<span class="folder-icon hidden">' + folderOpenIcon + '</span>' + 
				'<span>' + escapeHtml(mappen.navn) + '</span>' +
				'</span>';
			
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
			var tmp = '<li data-content="' + escapeHtml(tekst.innhold) + '" class="standardtext">' +
				'<span class="actionBtn">' + textIcon + 
				'<span>' + escapeHtml(tekst.navn) + '</span>' +
				'</span>' +
				'</li>'

			return tmp;
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