<script setup xmlns="http://www.w3.org/1999/html">
import { reactive, ref } from "vue";

import { darkenColor } from "../../utils";
import duckData from "../../assets/data/ducks.json";
import laneData from "../../assets/data/lanes.json";

const ducks = ref(duckData);

const props = defineProps({
    laneSettings: {
        type: Object,
        default: { }
    },
    laneIndex: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits([ "settingsChanged" ]);
const changedLaneSettings = reactive({
    ...props.laneSettings
});

function colorize(e, duck) {
    changedLaneSettings.laneColor = `linear-gradient(90deg, ${ duck.duckColor } 0%, ${ darkenColor(duck.duckColor, 0.5) } 100%)`;
    changedLaneSettings.racerName = duck.racerName;
    emit("settingsChanged", changedLaneSettings);
}

function nameChangeHandler(e) {
    changedLaneSettings.racerName = e.target.value;
    emit("settingsChanged", changedLaneSettings);
}

function reset(laneIndex) {
    changedLaneSettings.laneColor = laneData[ laneIndex ].laneColor;
    changedLaneSettings.racerName = laneData[ laneIndex ].racerName;
    emit("settingsChanged", changedLaneSettings);
}

function toggleAcceleration(e) {
    changedLaneSettings.stats.accel = e.target.checked ? 1.5 : 1;
    emit("settingsChanged", changedLaneSettings);
}

function toggleDizzy(e) {
    changedLaneSettings.stats.change = e.target.checked ? 500 : 1000;
    emit("settingsChanged", changedLaneSettings);
}

function toggleEnabled(e) {
    changedLaneSettings.enabled = e.target.checked;
    emit("settingsChanged", changedLaneSettings);
}

function toggleEmbiggen(e) {
    changedLaneSettings.stats.size = e.target.checked ? 1.2 : 1;
    emit("settingsChanged", changedLaneSettings);
}

function toggleFast(e) {
    changedLaneSettings.stats.speed = e.target.checked ? 1.5 : 1;
    emit("settingsChanged", changedLaneSettings);
}
</script>

<template>
    <div class="settings-container">
        <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                @change="toggleEnabled"
                class="sr-only peer"
                :checked="props.laneSettings.enabled"
            />
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span class="index-symbol">{{ props.laneIndex + 1 }}</span>
        <input
            type="text"
            :value="props.laneSettings.racerName"
            @change="nameChangeHandler"
            placeholder="Racer Name"
            class="racer-name-input"
        />
        <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                @change="toggleEmbiggen"
                class="sr-only peer"
                :checked="props.laneSettings.stats.size > 1"
            />
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">🍄</span>
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                @change="toggleFast"
                class="sr-only peer"
                :checked="props.laneSettings.stats.speed > 1"
            />
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">🐰</span>
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                @change="toggleAcceleration"
                class="sr-only peer"
                :checked="props.laneSettings.stats.accel > 1"
            />
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">⛽</span>
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
        </label>
        <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                @change="toggleDizzy"
                class="sr-only peer"
                :checked="props.laneSettings.stats.change < 1000"
            />
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">🌀</span>
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
        </label>
        <button
            v-for="(duck, index) in ducks"
            :class="`color-button-${ index + 1 }`"
            @click="colorize(props.laneIndex, duck)"
        ><i class="bi bi-palette"></i></button>
        <button class="reset-button" @click="reset(props.laneIndex)"><i class="bi bi-arrow-counterclockwise"></i></button>
    </div>
</template>

<style scoped>
.index-symbol {
    @apply flex h-8 w-8 items-center justify-center rounded-full text-white bg-gradient-to-br from-pink-500 to-orange-400 pb-0.5 text-lg;
}

.racer-name-input {
    @apply border rounded px-1 bg-transparent border-neutral-400 dark:border-neutral-700 w-40;
}

.color-button-1 {
    @apply bg-[#ffb085] hover:bg-[#efa075] text-white font-bold px-2 rounded-full;
}

.color-button-2 {
    @apply bg-[#fe96c9] hover:bg-[#ee86b9] text-white font-bold px-2 rounded-full;
}

.color-button-3 {
    @apply bg-[#f0d2d2] hover:bg-[#e0c2c2] text-white font-bold px-2 rounded-full;
}

.color-button-4 {
    @apply bg-[#acd3d0] hover:bg-[#9cc3c0] text-white font-bold px-2 rounded-full;
}

.color-button-5 {
    @apply bg-[#efabd0] hover:bg-[#df9bc0] text-white font-bold px-2 rounded-full;
}

.color-button-6 {
    @apply bg-[#43cb81] hover:bg-[#33bb71] text-white font-bold px-2 rounded-full;
}

.color-button-7 {
    @apply bg-[#409dd8] hover:bg-[#308dc8] text-white font-bold px-2 rounded-full;
}

.color-button-8 {
    @apply bg-[#c2acd2] hover:bg-[#b29cc2] text-white font-bold px-2 rounded-full;
}

.color-button-9 {
    @apply bg-[#f0cd27] hover:bg-[#e0bd17] text-white font-bold px-2 rounded-full;
}

.color-button-10 {
    @apply bg-[#dbdddc] hover:bg-[#cbcdcc] text-white font-bold px-2 rounded-full;
}

.color-button-11 {
    @apply bg-[#8ac8dd] hover:bg-[#7ab8cd] text-white font-bold px-2 rounded-full;
}

.color-picker {
    -webkit-appearance: none;
    @apply p-0 border border-neutral-700 rounded-full w-8 h-8;
}

.color-picker::-webkit-color-swatch {
    @apply p-0 border-none rounded-full;
}

.color-picker::-webkit-color-swatch-wrapper {
    @apply p-0 border-none rounded-full;
}

.duck-color {
    @apply flex items-center gap-2 text-xs sm:text-base;
}

.reset-button {
    @apply bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 rounded-full;
}

.settings-container {
    @apply flex gap-2 dark:text-white border rounded-md p-2 border-neutral-400;
}
</style>
