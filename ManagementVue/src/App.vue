<template>
 <router-link to="/Department"><button class="dep">Department Management</button></router-link>
 <router-link to="/Employee"><button class="emp">Employee Management</button></router-link>
 


 <router-view/>
</template>


<script>
</script>
<style scoped>

/* button {
  width:100%;
} */
.dep{
  width:50%;
  margin:0%
}
.emp{
  width:100%;
}
</style>