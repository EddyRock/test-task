<script setup lang="ts">
import { ref, computed, onMounted, type ComputedRef } from 'vue'

import CityName from '@/components/CityName.vue';
import TheSpinner from './components/TheSpinner.vue';

import API from '@/core/API/index';
import { type ICityInfo } from '@/core/API/WikipediaService';
import { type IWeatherInfo, type ICurrent } from '@/core/API/WeatherService';

const weatherData = ref<IWeatherInfo | null>(null)
const cityInfo = ref<ICityInfo | null>(null)
const loading = ref<boolean>(false);
const cityName = ref<string>('Kyiv')

const isTemperatureInfoExist: ComputedRef<boolean> = computed(() => {
  return Boolean(currentTemp.value && feelsLikeTemp.value && iconSrc.value);
});

const cityDescription: ComputedRef<string> = computed(() => {
  const {
    query = {
      pages: null,
    }
  } = cityInfo.value ?? {};
  const { pages = null } = query ?? {};
  if (pages) {
    return Object.values(pages)[0]?.extract;
  }
  return '';
})

const getCurrentWeather: ComputedRef<ICurrent> = computed(() => {
  const {
    current = {}
  } = weatherData.value ?? {};

  return current as ICurrent;
});

const iconSrc: ComputedRef<string> = computed(() => {
  const {
    condition = {
      icon: ''
    }
  } = getCurrentWeather.value ?? {};
  const { icon = '' } = condition ?? {};

  return icon;
})

const iconDescription: ComputedRef<string> = computed(() => {
  const {
    condition = {
      text: ''
    }
  } = getCurrentWeather.value ?? {};
  const { text = '' } = condition ?? {};

  return text;
})

const currentTemp: ComputedRef<number> = computed(() => {
  const {
    temp_c = 0
  } = getCurrentWeather.value ?? {};

  return temp_c;
})

const feelsLikeTemp: ComputedRef<number> = computed(() => {
  const {
    feelslike_c = 0
  } = getCurrentWeather.value ?? {};

  return feelslike_c;
})

const getWeather: () => Promise<void> = async () => {
  try {
    weatherData.value = await API.weatherService.getWeather({ city: cityName.value })
  } catch (error) {
    console.error(error);
  }
}

const getCityInfo: () => Promise<void> = async () => {
  try {
    cityInfo.value = await API.wikipediaService.getInformation({ city: cityName.value });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    await getWeather();
    await getCityInfo();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <header>
    <div class="city-name">
      <city-name :city-name="cityName" />
      <the-spinner v-if="loading" />

      <div v-else-if="isTemperatureInfoExist" class="city-name__temperature" data-test="temperature">
        <img :src="iconSrc" :alt="iconDescription" />
        Temperature: {{ currentTemp }}&nbsp;°C (Feels like: {{ feelsLikeTemp }}&nbsp;°C)
      </div>
    </div>
  </header>

  <main v-if="!loading && cityDescription">
    <div class="wrapper" data-test="description">
      <div v-html="cityDescription" />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.city-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.city-name__temperature {
  display: flex;
  align-items: center;
}
</style>
