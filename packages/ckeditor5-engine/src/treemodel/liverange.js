/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

CKEDITOR.define( [
	'treemodel/range',
	'treemodel/liveposition',
	'emittermixin',
	'utils'
], ( Range, LivePosition, EmitterMixin, utils ) => {
	/**
	 * LiveRange is a Range in the Tree Model that updates itself as the tree changes. It may be used as a bookmark.
	 * **Note:** Be very careful when dealing with LiveRange. Each LiveRange instance bind events that might
	 * have to be unbound. Use {@link #detach} whenever you don't need LiveRange anymore.
	 *
	 * @class treeModel.LiveRange
	 */
	class LiveRange extends Range {
		/**
		 * Creates a smart range.
		 *
		 * @see {treeModel.Range}
		 * @constructor
		 */
		constructor( start, end ) {
			super( start, end );

			this.start = new LivePosition( this.start.root, this.start.path.slice(), false );
			this.end = new LivePosition( this.end.root, this.end.path.slice(), true );

			bindWithDocument.call( this );
		}

		/**
		 * Unbinds all events previously bound by LiveRange. Use it whenever you don't need LiveRange instance
		 * anymore (i.e. when leaving scope in which it was declared or before re-assigning variable that was
		 * referring to it).
		 */
		detach() {
			this.start.detach();
			this.end.detach();
			this.stopListening();
		}

		/**
		 * @see {@link treeModel.Range#createFromElement}
		 * @static
		 * @method createFromElement
		 * @param {treeModel.Element} element
		 * @returns {treeModel.LiveRange}
		 */

		/**
		 * @see {@link treeModel.Range#createFromPositionAndShift}
		 * @static
		 * @method createFromPositionAndShift
		 * @param {treeModel.Position} position
		 * @param {Number} shift
		 * @returns {treeModel.LiveRange}
		 */

		/**
		 * @see {@link treeModel.Range#createFromParentsAndOffsets}
		 * @static
		 * @method createFromParentsAndOffsets
		 * @param {treeModel.Element} startElement
		 * @param {Number} startOffset
		 * @param {treeModel.Element} endElement
		 * @param {Number} endOffset
		 * @returns {treeModel.LiveRange}
		 */

		/**
		 * @see {@link treeModel.Range#createFromRange}
		 * @static
		 * @method createFromRange
		 * @param {treeModel.Range} range
		 * @returns {treeModel.LiveRange}
		 */
	}

	/**
	 * Binds this LiveRange to the {@link treeModel.Document} that owns this range.
	 *
	 * @private
	 * @method bindWithDocument
	 */
	function bindWithDocument() {
		/*jshint validthis: true */

		this.listenTo(
			this.root.document,
			'change',
			( event, type, changes ) => {
				fixBoundaries.call( this, type, changes.range, changes.sourcePosition );
			},
			this
		);
	}

	/**
	 * LiveRange is partially updated by "automatic" updates of LivePositions that are boundaries of LiveRange.
	 * However there are cases when the boundaries have to be fixed because they end up in wrong places.
	 *
	 * @private
	 * @method fixBoundaries
	 * @param {String} type Type of changes applied to the Tree Model.
	 * @param {treeModel.Range} range Range containing the result of applied change.
	 * @param {treeModel.Position} [position] Additional position parameter provided by some change events.
	 */
	function fixBoundaries( type, range, position ) {
		/*jshint validthis: true */

		if ( type == 'move' || type == 'remove' || type == 'reinsert' ) {
			let containsStart = range.containsPosition( this.start ) || range.start.isEqual( this.start );
			let containsEnd = range.containsPosition( this.end ) || range.end.isEqual( this.end );
			position = position.getTransformedByInsertion( range.start, range.end.offset - range.start.offset, true );

			// If the range contains both start and end, don't do anything - LivePositions that are boundaries of
			// this LiveRange are in correct places, they got correctly transformed.
			if ( containsStart && !containsEnd && !range.end.isTouching( position ) ) {
				this.start.path = position.path.slice();
				this.start.root = position.root;
			}

			if ( containsEnd && !containsStart && !range.start.isTouching( position ) ) {
				this.end.path = position.path.slice();
				this.end.root = position.root;
			}
		}
	}

	utils.extend( LiveRange.prototype, EmitterMixin );

	return LiveRange;
} );
