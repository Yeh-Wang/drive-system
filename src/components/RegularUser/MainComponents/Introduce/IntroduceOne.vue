<template>
<h3>{{ introduceInfo }}</h3>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const props = defineProps(["subject"])

const introduceInfo = ref("")



onMounted(() => {
  if(props.subject == "1"){
    introduceInfo.value = "subject one"
  }else if(props.subject == "4"){
    introduceInfo.value = "subject four"
  }
})
</script>

<style scoped>

</style>
