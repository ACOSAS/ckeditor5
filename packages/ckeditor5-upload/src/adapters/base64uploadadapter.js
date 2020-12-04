/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module upload/adapters/base64uploadadapter
 */

/* globals window */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '../filerepository';

/**
 * A plugin that converts images inserted into the editor into [Base64 strings](https://en.wikipedia.org/wiki/Base64)
 * in the {@glink builds/guides/integration/saving-data editor output}.
 *
 * This kind of image upload does not require server processing – images are stored with the rest of the text and
 * displayed by the web browser without additional requests.
 *
 * Check out the {@glink features/image-upload/image-upload comprehensive "Image upload overview"} to learn about
 * other ways to upload images into CKEditor 5.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Base64UploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Base64UploadAdapter';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => new Adapter( loader );
	}
}

/**
 * The upload adapter that converts images inserted into the editor into Base64 strings.
 *
 * @private
 * @implements module:upload/filerepository~UploadAdapter
 */
class Adapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 */
	constructor( loader ) {
		/**
		 * `FileLoader` instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#upload
	 * @returns {Promise}
	 */
	upload() {
		return new Promise( ( resolve, reject ) => {
			const reader = this.reader = new window.FileReader();

			reader.addEventListener( 'load', () => {

				var img = new Image();
				img.src = reader.result;
				
				this.resizeBase64ImageAsync(img).then(function () {
                    resolve( { default: img.src, width: img.width + 'px' } );
                });
			} );

			reader.addEventListener( 'error', err => {
				reject( err );
			} );

			reader.addEventListener( 'abort', () => {
				reject();
			} );

			this.loader.file.then( file => {
				reader.readAsDataURL( file );
			} );
		} );
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~UploadAdapter#abort
	 * @returns {Promise}
	 */
	abort() {
		this.reader.abort();
	}

	async resizeBase64ImageAsync(img) {
		const maxImgWidth = 1200;
		const maxShowImgWidth = 600;
		const quality = 0.7;
		const imgMime = 'image/jpeg';
	
		const canvasImg = await new Promise(function (resolve, reject) {
			const canvasImg = new Image();
			canvasImg.addEventListener('load', function () {
				resolve(canvasImg);
			});
			canvasImg.addEventListener('error', reject);
			canvasImg.src = img.src;
			return canvasImg;
		});
	
		const ratio = canvasImg.width / canvasImg.height;
		const showWidth = Math.min(maxShowImgWidth, canvasImg.width);
		const showHeight = Math.round(showWidth / ratio);
	
		const canvas = document.createElement('canvas');
		canvas.width = Math.min(maxImgWidth, canvasImg.width);
		canvas.height = Math.round(canvas.width / ratio);
	
		const ctx = canvas.getContext('2d');
		ctx.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);
	
		let blob = await new Promise(function (resolve) {
			canvas.toBlob(resolve, imgMime, quality);
		});
	
		const url = URL.createObjectURL(blob);
		img.src = url;
		img.style.width = '';
		img.style.height = '';
		img.width = showWidth;
		img.height = showHeight;
	}
}
