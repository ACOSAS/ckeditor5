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
                    const icons = event.currentTarget.getElementsByClassName('stdtext-folder-icon');

                    for (let i=0; i < icons.length; i++) {
                        const icon = icons[i];

                        if (icon.parentNode.parentNode == event.currentTarget) {
                            icon.classList.toggle('stdtext-hidden');
                        }                            
                    }

					const uls = event.currentTarget.getElementsByTagName('ul');

					if (uls.length > 0) {
						uls[0].classList.toggle('stdtext-hidden');
					}
					
					event.cancelBubble = true;
				}
				
				function clickText(event) {
					const content = this.getAttribute("data-content");
					const viewFragment = editor.data.processor.toView( content );
					const modelFragment = editor.data.toModel( viewFragment );
					editor.model.insertContent( modelFragment );

					dropdownView.isOpen = false;

					editor.editing.view.focus();

					event.cancelBubble = true;
				}

				stdTextView = new StandardteksterView(locale, Standardtekster.standardtekstMapper);
				dropdownView.panelView.children.add( stdTextView );

				const folderNodes = document.getElementsByClassName('stdtext-folder');
				for (let i=0; i < folderNodes.length; i++) {
					const node = folderNodes[i];
					node.addEventListener('click', toggleFolder, false);
				}

				const standardtextNodes = document.getElementsByClassName('standardtext');
				for (let i=0; i < standardtextNodes.length; i++) {
					const node = standardtextNodes[i];
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

		const styleContent = `
		li.stdtext > ul {
			padding-left: 20px !important;
		}
		li.stdtext {
			overflow: hidden !important;
		}
		.stdtext-actionBtn {
			padding: 5px 10px 5px 10px !important;
			display: block !important;
		}
		.stdtext-actionBtn:hover {
			background: #E0E0FF !important;
			cursor: pointer !important;
		}
		.stdtext-hidden {
			display: none;
		}`;

		function createFolderClosedIcon() {
			const elem = document.createElement('span');
			elem.classList.add('stdtext-folder-icon');
			elem.innerHTML = folderIcon;
			return elem;
		}

		function createFolderOpenIcon() {
			const elem = document.createElement('span');
			elem.className = 'stdtext-folder-icon stdtext-hidden';
			elem.innerHTML = folderOpenIcon;
			return elem;
		}
		
		function createTextIcon() {
			const elem = document.createElement('span');
			elem.innerHTML = textIcon;
			return elem;
		}
		
		function createFolderButton(name) {
			const btn = document.createElement('span');
			btn.className = 'stdtext-actionBtn';
			btn.appendChild(createFolderClosedIcon());
			btn.appendChild(createFolderOpenIcon());
			btn.appendChild(document.createTextNode(name));
			return btn;
		}
				
		function createTextButton(name) {
			const btn = document.createElement('span');
			btn.className = 'stdtext-actionBtn';
			btn.appendChild(createTextIcon());
			btn.appendChild(document.createTextNode(name));
			return btn;
		}

		function createFolderListItem(mappen) {
			const elem = document.createElement('li');
			elem.className = 'stdtext stdtext-folder stdtext-closed';

			elem.appendChild(createFolderButton(mappen.navn));
			
			if (mappen.mapper.length > 0 || mappen.standardTekster.length > 0) {
				const ul = document.createElement('ul');
				ul.className = 'stdtext-hidden';

				for (let j = 0; j < mappen.mapper.length; j++) {
					ul.appendChild(createFolderListItem(mappen.mapper[j]));
				}
				
				for (let k = 0; k < mappen.standardTekster.length; k++) {
					ul.appendChild(createTextListItem(mappen.standardTekster[k]));
				}

				elem.appendChild(ul);
			}

			return elem;
		}

		function createTextListItem(text) {			
			const elem = document.createElement('li');
			elem.setAttribute('data-content', text.innhold);
			elem.className = "stdtext standardtext";
			elem.appendChild(createTextButton(text.navn));
			return elem;
		}

		const list = document.createElement('ul');

		for (let i = 0; i < mapper.length; i++) {
			const mappe = mapper[i];
			list.appendChild(createFolderListItem(mappe));
		}

		const style = document.createElement('style');
		style.textContent = styleContent;

		this.setTemplate({
			tag: 'div',				
			children: [style, list]
		});
	}
}