export function parseIdx3File(arrayBuf: ArrayBuffer) {
    const view = new DataView(arrayBuf);
    // const magic = view.getUint32(0, false);
    const numImages = view.getUint32(4, false);
    const numRows = view.getUint32(8, false);
    const numCols = view.getUint32(12, false);
    const numPixels = numRows * numCols;

    const images = new Array<Uint8ClampedArray>(numImages);

    for (let counter = 0; counter < numImages; counter++) {
        const startOffset = 16 + counter * numPixels;
        images[counter] = new Uint8ClampedArray(
            arrayBuf.slice(startOffset, startOffset + numPixels)
        );
    }

    return images;
}

export function parseIdx1File(arrayBuf: ArrayBuffer) {
    const view = new DataView(arrayBuf);
    // const magic = view.getUint32(0, false);
    const numLabels = view.getUint32(4, false);

    const labels = new Uint8ClampedArray(numLabels);

    for (let counter = 0; counter < numLabels; counter++) {
        labels[counter] = view.getUint8(8 + counter);
    }

    return labels;
}
