<template>
    <div id="menu" class="d-flex justify-content-center align-items-center">
        <div class="row d-flex justify-content-center align-items-center">
            <h1 id="menu-hero-title">Menu</h1>
            <div class="col-md-12 d-flex justify-content-center align-items-center">
                <button v-on:click='joinSurvey' class="btn btn-outline-dark btn-lg">Join to Survey</button>
            </div>    
        </div>    
    </div>    
</template>


<script>
export default {
    methods: {
        joinSurvey(){
            //Changing Active Component
            this.$emit('activeComponent', 'Survey')
        }
    }
}
</script>

<style scoped>
#menu{
    background-color: white;
    height: 600px;
}

#menu-hero-title{
    font-size: 70px;
}
</style>