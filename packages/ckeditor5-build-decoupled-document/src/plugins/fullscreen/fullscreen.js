import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class Fullscreen extends Plugin {
	init() {
		this.editor.keystrokes.set("CTRL+SHIFT+F", () => {
			this.editor.fullscreenHandler();
		});
	}
}
