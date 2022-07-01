export interface Position {
	top: number;
	left: number;
}

export interface Input {
	startStateId: string;
	endStateId: string;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}

export enum HeaderSection {
	SRC_PORT = 'Source Port',
	DEST_PORT = 'Destination Port',
	SEQ_NUM = 'Sequence Number',
	ACN_NUM = 'Acknowledgement Number',
	HEADER_LEN = 'TCP Header Length',
	WINDOW_SIZE = 'Window Size',
	CHECKSUM = 'Checksum',
	URGENT_POINTER = 'Urgent Pointer',
	OPTIONS = 'Options',
	DATA = 'Data'
}
