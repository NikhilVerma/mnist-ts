<script setup lang="ts">
import { PropType, ref, toRef, toRefs, defineProps, onMounted } from "vue";

const canvas = ref(null);

const props = defineProps({
    image: {
        type: Uint8ClampedArray,
        required: true,
    },
    label: {
        type: Number,
    },
});

onMounted(() => {
    requestIdleCallback(() => {
        if (canvas.value) {
            renderCanvasWithSingleChannel(canvas.value, props.image);
        }
    });
});

function renderCanvasWithSingleChannel(canvas: HTMLCanvasElement, array: Uint8ClampedArray) {
    const size = Math.sqrt(array.length);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < array.length; i++) {
        const offset = i * 4;
        imageData.data[offset] = array[i];
        imageData.data[offset + 1] = array[i];
        imageData.data[offset + 2] = array[i];
        imageData.data[offset + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}
</script>

<template>
    <canvas ref="canvas" :title="String(label)" />
</template>

<style scoped>
canvas {
    float: left;
    /* border: 1px solid red; */
}
</style>
