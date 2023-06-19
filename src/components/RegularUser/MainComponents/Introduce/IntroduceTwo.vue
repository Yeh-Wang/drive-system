<template>
<h3>{{ introduceInfo }}</h3>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(["subject"])
const introduceInfo = ref("")

onMounted(() => {
  if(props.subject == "2"){
    introduceInfo.value = "subject Two"
  }else if(props.subject == "3"){
    introduceInfo.value = "subject Three"
  }
})
</script>

<style scoped>

</style>
