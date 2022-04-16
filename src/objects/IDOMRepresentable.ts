export default interface IDOMRepresentable {
    unmount();
	update();
	domElement : HTMLElement;
}
