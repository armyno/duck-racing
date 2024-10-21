<script setup>
import { clearLocal, readLocal, writeLocal } from "./utils";
import { computed, ref } from "vue";
import Lane from "./components/LaneComp/LaneComp.vue";
import laneData from "./assets/data/lanes.json";
import List from "./components/ListComp/ListComp.vue";
import HeaderComp from "./components/HeaderComp.vue";
import Modal from "./components/Shared/Modal.vue";
import FooterComp from "./components/FooterComp.vue";
import PingText from "./components/Shared/PingTextComp.vue";
import ResultsComp from "./components/ResultsComp/ResultsComp.vue";
import SettingsComp from "./components/SettingsComp/SettingsComp.vue";

const COUNTDOWN = 3;
const COUNTDOWN_WORDS = [ 'SANGRE', 'ARE', 'WE' ];

const darkMode = ref(
    readLocal("darkMode") == null ? false : readLocal("darkMode")
);
const lanes = ref(
    readLocal("laneSettings") == null ? laneData : readLocal("laneSettings")
);
const isStarted = ref(false);
const showModal = ref(false);
const count = ref(COUNTDOWN);
const countDownShow = ref(false);
const tempLanes = ref([ ...getEnabledLanes(lanes.value) ]);

const sortedLanes = computed(() => {
    return tempLanes.value.sort((a, b) => b.position - a.position);
});

const isFinished = computed(() => {
    return (sortedLanes.value[ sortedLanes.value.length - 1 ].position >= 100);
    // returns true/false based on the position of the last element in the sortedLanes array
});

resetLanes();

/* shows the countdown component, subtracts every second from the specified value,
when the value is 0, it closes the countdown component and starts the race. */
function countDownToStart() {
    countDownShow.value = true;
    const interval = setInterval(() => {
        count.value--;
        if (count.value === 0) {
            clearInterval(interval);
            isStarted.value = true;
            countDownShow.value = false;
            count.value = COUNTDOWN;
        }
    }, 1000);
}

function clearLocalModal() {
    showModal.value = false;
    clearLocal();
    lanes.value = laneData;
    resetLanes();
}

function darkModeHandler() {
    darkMode.value = !darkMode.value;
    writeLocal("darkMode", darkMode.value);
}

function getCountdownNumber(_count) {
    return _count + '';
}

function getCountdownWord(_count) {
    if ((_count < 1) || (_count > COUNTDOWN)) return '';
    return COUNTDOWN_WORDS[ _count - 1 ];
}

function getEnabledLanes(lanes) {
    return lanes.filter((lane) => lane.enabled);
}

function resetLanes() {
    isStarted.value = false;
    countDownShow.value = false;
    tempLanes.value = [ ...getEnabledLanes(lanes.value) ];
    for (const lane of lanes.value) {
        lane.position = 0;
    }
}

function saveSettings() {
    showModal.value = false;
    writeLocal("laneSettings", lanes.value);
    resetLanes();
}

function startRace() {
    resetLanes();
    countDownToStart();
}
</script>

<template>
    <div :class="{ dark: darkMode }">
        <div class="min-h-screen dark:bg-neutral-900">
            <HeaderComp
                title="&nbsp;Duck Racing App"
                :main-btn-disable="(isStarted && !isFinished) || countDownShow"
                main-btn-text="Start Race"
                :dark-mode="darkMode"
                @mainBtnClick="startRace"
                @darkModeClick="darkModeHandler"
            ></HeaderComp>
            <main class="main-container">
                <section class="race-track">
                    <ResultsComp
                        :results-active="isFinished"
                        :results="sortedLanes"
                        @close-btn-click="resetLanes"
                    ></ResultsComp>
                    <PingText
                        color="white"
                        :text="getCountdownWord(count)"
                        :ping-text-active="countDownShow"
                    ></PingText>
                    <Lane
                        v-for="(lane, index) in lanes"
                        :key="lane.racerName"
                        :background="lane.enabled ? lane.laneColor : 'linear-gradient(90deg, rgba(88,88,88,1) 0%, rgba(0,0,0,1) 100%)'"
                        lineBg="url('/racing_stripes.jpg')"
                        :started="lane.enabled ? isStarted : false"
                        :stats="lane.stats"
                        @img-position-changed="(val) => (lanes[ index ].position = lane.enabled ? val : 0)"
                    ></Lane>
                </section>
                <section class="leaderboard">
                    <List :list="sortedLanes"></List>
                </section>
            </main>
            <FooterComp @settingsBtnClick="showModal = true"></FooterComp>
        </div>
        <Modal
            :modal-active="showModal"
            @modalClose="showModal = false"
            :dark-mode="darkMode"
            title="Racing Lane Settings"
            accept-button-text="Save"
            @acceptClick="saveSettings"
            @clearLocalClick="clearLocalModal"
        >
            <SettingsComp v-model:lanes="lanes"></SettingsComp>
        </Modal>
    </div>
</template>

<style scoped>
.leaderboard {
    @apply col-span-4 xl:col-span-1;
}

.main-container {
    @apply grid grid-cols-4 rounded-lg max-w-7xl mx-auto gap-2 px-1 mt-2 sm:mt-4 sm:gap-4 sm:px-4;
}

.race-track {
    @apply col-span-4 xl:col-span-3 overflow-hidden rounded-lg relative border-2 dark:border-neutral-700;
}
</style>
