// Data and algorithm from - http://yann.lecun.com/exdb/mnist/

export async function getTestData() {
    const [testImagesResponse, testLabelsResponse, trainImagesResponse, trainLabelsResponse] =
        await Promise.all([
            fetch("/t10k-images-idx3-ubyte"),
            fetch("/t10k-labels-idx1-ubyte"),
            fetch("/train-images-idx3-ubyte"),
            fetch("/train-labels-idx1-ubyte"),
        ]);

    return {
        testImages: parseIdx3File(await testImagesResponse.arrayBuffer()),
        testLabels: parseIdx1File(await testLabelsResponse.arrayBuffer()),
        trainImages: parseIdx3File(await trainImagesResponse.arrayBuffer()),
        trainLabels: parseIdx1File(await trainLabelsResponse.arrayBuffer()),
    };
}

export const testDataPromise = getTestData();

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
