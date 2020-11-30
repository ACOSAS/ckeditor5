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

		function createFolderClosedIcon() {
			var elem = document.createElement('span');
			elem.classList.add("folder-icon");
			elem.innerHTML = folderIcon;
			return elem;
		}

		function createFolderOpenIcon() {
			var elem = document.createElement('span');
			elem.classList.add("folder-icon", "hidden");
			elem.innerHTML = folderOpenIcon;
			return elem;
		}
		
		function createTextIcon() {
			var elem = document.createElement('span');
			elem.innerHTML = textIcon;
			return elem;
		}
		
		function createFolderButton(name) {
			var btn = document.createElement('span');
			btn.classList.add("actionBtn");
			btn.appendChild(createFolderClosedIcon());
			btn.appendChild(createFolderOpenIcon());
			btn.appendChild(createTextSpan(name));
			return btn;
		}
				
		function createTextButton(name) {
			var btn = document.createElement('span');
			btn.classList.add("actionBtn");
			btn.appendChild(createTextIcon());
			btn.appendChild(createTextSpan(name));
			return btn;
		}

		function createTextSpan(content) {
			var elem = document.createElement('span');
			elem.innerHTML = content;
			return elem;
		}

		function createFolderListItem(mappen) {
			var elem = document.createElement('li');
			elem.classList.add("folder", "closed");			

			elem.appendChild(createFolderButton(mappen.navn));
			
			if (mappen.mapper.length > 0 || mappen.standardTekster.length > 0) {
				var ul = document.createElement('ul');
				ul.classList.add("folder-content", "hidden");

				for (var j = 0; j < mappen.mapper.length; j++) {
					ul.appendChild(createFolderListItem(mappen.mapper[j]));
				}
				
				for (var k = 0; k < mappen.standardTekster.length; k++) {
					ul.appendChild(createTextListItem(mappen.standardTekster[k]));
				}

				elem.appendChild(ul);
			}

			return elem;
		}

		function createTextListItem(text) {			
			var elem = document.createElement('li');
			elem.setAttribute('data-content', text.innhold);
			elem.classList.add("standardtext");
			elem.appendChild(createTextButton(text.navn));
			return elem;
		}

		var list = document.createElement('ul');

		for (var i = 0; i < mapper.length; i++) {
			var mappe = mapper[i];
			list.appendChild(createFolderListItem(mappe));
		}
	
		console.log(list);

		var enDiv = document.createElement('div');
		enDiv.innerHTML = styleContent + list.outerHTML;

		this.setTemplate({
			tag: 'div',				
			children: [enDiv],
			attributes: {
				class: ['dropdown-container']
			}
		});
	}
}