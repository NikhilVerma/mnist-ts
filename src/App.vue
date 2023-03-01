<script setup lang="ts">
import { onMounted, ref } from "vue";
import Uint8ClampedArrayCanvas from "./components/Uint8ClampedArrayCanvas.vue";
import { testDataPromise } from "./utils";

const testImagesProp = ref<Uint8ClampedArray[]>([]);
const testLabelsProp = ref<Uint8ClampedArray>();

onMounted(async () => {
    const { testImages, testLabels } = await testDataPromise;
    testImagesProp.value = testImages.slice(0, 10);
    testLabelsProp.value = testLabels;
});
</script>

<template>
    <Uint8ClampedArrayCanvas
        v-for="(image, idx) in testImagesProp"
        :key="idx"
        :image="image"
        :label="testLabelsProp?.[idx]"
    />
</template>
