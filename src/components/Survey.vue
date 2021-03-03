<template>
    <div id="survey">
        <div class="row d-flex justify-content-center align-items-center">
            <h1 class="display-3">Surveys</h1>
        </div>
        <QuestionList></QuestionList>
    </div>
</template>


<script>
import QuestionList from './QuestionList';
export default {
    components: {
        QuestionList: QuestionList,
    },
}
</script>

<style scoped>

</style>