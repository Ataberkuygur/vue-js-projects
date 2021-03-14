<template>
    <div id="appDailyInfo" class="d-flex justify-content-center align-items-center">
        <div class="row w-100 d-flex justify-content-center align-items-center">
            <div class="col-md-6 d-flex justify-content-start align-items-center">
                <div class="progress-bar">
                    <div v-bind:style="{'width': dailyPerformance + '%'}" class="progress d-flex justify-content-start align-items-center pl-2">{{dailyPerformance}}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        dailyPerformance(){
            this.$store.dispatch('updateDailyPerformanceAsync')
            return this.$store.getters.getDailyPerformance; 
        }
    },
}
</script>

<style scoped>
#appDailyInfo {
  font-family: 'Open Sans', sans-serif;
  background-color: white;
  height: 100px;
}

.progress-bar{
    width: 100%;
    height: 40px;
    background-color: rgb(204, 204, 204);
    border-radius: 20px;
}

.progress{
    height: 100%;
    background-color: rgb(28, 149, 158);
    transition: all 1s;
    font-size: 15px;
}
</style>