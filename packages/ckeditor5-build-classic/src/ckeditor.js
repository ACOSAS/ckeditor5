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
//import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
//import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
//import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
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
import Standardtekster from '../src/plugins/standardtekster/standardtekster';

import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

export default class ClassicEditor extends ClassicEditorBase {

	constructor() {
		super();
		this.standardTekster = [];
		this.set('harStandardTekster', false);
	}

	settStandardTekster(mapper) {
		this.standardTekster = mapper;
		this.set('harStandardTekster', mapper && mapper.length > 0);
	}

	setData(data) {
		console.log("setData before blob conversion", data);
		const html = this.convertBase64ImagesToBlob(data);
		console.log("setData after blob conversion", html);
		super.setData(html);
	}

	async getData() {
		const html = super.getData();

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		if (!doc || !doc.body) {
			return '';
		}
	
		const elts = Array.from(doc.querySelectorAll('img[src^="blob:"]'));
	
		await Promise.all(elts.map(async (elt) => {
			this.removeFigureNode(elt);
			const dataUri = await this.getBase64FromBlob(elt.src)			
			elt.src = dataUri;
		}));

		return doc.body.innerHTML;
	}

	removeFigureNode(img) {
		let figureNode = img.parentNode;
		if (figureNode && figureNode.tagName.toLowerCase() == 'figure') {
			let figureParent = figureNode.parentNode;

			if (figureParent) {
				var width = figureNode.style.getPropertyValue('width');
				if (width) {
					img.width = width.replace('px', '');
				}

				figureNode.removeChild(img);
				figureParent.insertBefore(img, figureNode);
				figureParent.removeChild(figureNode);
			}
		}
	}

	downloadData(url) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.open('GET', url, true);
			req.responseType = 'blob';
	
			req.addEventListener('load', () => resolve(req.response), {
				once: true,
				passive: true,
				capture: true,
			});
	
			req.addEventListener('error', () => reject({
				status: req.status,
				statusMsg: req.statusText,
				body: req.responseText,
			}), {
				once: true,
				passive: true,
				capture: true,
			});
	
			req.send()
		});
	}
	
	async getBase64FromBlob(blobUri) {
		const data = await this.downloadData(blobUri);
		return await new Promise(function (resolve, reject) {
			const reader = new FileReader();
	
			reader.addEventListener('load', function () {
				resolve(reader.result);
			});
			reader.addEventListener('error', reject);
			reader.readAsDataURL(data);
		});
	}

	convertBase64ImagesToBlob(html) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
	
		const dataImgs = Array.from(doc.querySelectorAll('img[src^="data:"]'));
	
		dataImgs.map(img => {	
			const blob = this.convertDataUriToBlob(img.src);
			const src = URL.createObjectURL(blob);
			img.src = src;
		});
	
		return doc && doc.body ? doc.body.innerHTML : '';
	}
	
	convertDataUriToBlob(dataUri) {
		const arr = this.convertDataURIToBinary(dataUri);
		const mime = dataUri.substring('data:'.length, dataUri.indexOf(';'));
		return new Blob([arr], { type: mime });
	}

	convertDataURIToBinary(dataUri) {
		const BASE64_MARKER = ';base64,';
		const base64Index = dataUri.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		const base64 = dataUri.substring(base64Index);
		const raw = window.atob(base64);
		const rawLength = raw.length;
		const array = new Uint8Array(rawLength);
	
		for (let i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
		}
		return array;
	}
}

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
	//ImageCaption,
//	ImageStyle,
//	ImageToolbar,
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
			'insertTable',
			'undo',
			'redo',
			'standardtekster'
		]
	},
	image: {
		resizeUnit: 'px',
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

mix(ClassicEditor, ObservableMixin);