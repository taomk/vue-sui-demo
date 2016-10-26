<template>
  <div>
    <img class="loading" src="../img/loading.gif" alt="">
  </div>
</template>
<script>
  export default {
    ready: function () {
      setTimeout(() => {
        this.$route.router.go({name: 'artlist'});
      }, 2000);
    }
  }
</script>
