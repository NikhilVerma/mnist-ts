<script setup lang="ts">
import { onMounted, ref } from "vue";
import Uint8ClampedArrayCanvas from "./components/Uint8ClampedArrayCanvas.vue";
import { parseIdx1File, parseIdx3File } from "./utils";

const testImages = ref<Uint8ClampedArray[]>([]);
const testLabels = ref<Uint8ClampedArray>();

onMounted(async () => {
    const testImagesResponse = await fetch("/t10k-images-idx3-ubyte");
    const testLabelsResponse = await fetch("/t10k-labels-idx1-ubyte");
    // images.value = parseIdx3File(arrayBuf).slice(0, 10);
    // testImages.value = parseIdx3File(await testImagesResponse.arrayBuffer());
    testImages.value = parseIdx3File(await testImagesResponse.arrayBuffer()).slice(0, 10);
    testLabels.value = parseIdx1File(await testLabelsResponse.arrayBuffer());
});
</script>

<template>
    <Uint8ClampedArrayCanvas
        v-for="(image, idx) in testImages"
        :key="idx"
        :image="image"
        :label="testLabels?.[idx]"
    />
</template>
