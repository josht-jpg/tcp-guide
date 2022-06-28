import type { Position } from '../types';

const stateUnderCursor = (cursorPosition: Position) =>
	document
		.elementsFromPoint(cursorPosition.left, cursorPosition.top)
		.find((element) => element.id.startsWith('state-node'));

export default stateUnderCursor;
