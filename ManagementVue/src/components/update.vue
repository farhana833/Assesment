<template>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="login-form">
    <form>
        <h2 class="text-center">Department</h2>  
      <div class="form-group">
        <!-- <label for="name">firstName</label> -->
          <input class="form-control" type="number" placeholder="Id" required v-model="depart_id" />
        </div>
        <div class="form-group">
        <input class="form-control" type="text" placeholder="Name" required v-model="name" />
      </div>
       <!-- <button v-if="editButton==true" type="button" @click="onSubmit">Submit</button> -->
        <button class="btn btn-primary btn-block"  type="button" @click="updateRow(updateIndex)">UpdateRow</button>
       <!-- <button class="btn btn-primary btn-block" type="submit" @click="viewdata">View</button> -->

    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  data() {
    return {
      depart_id: "",
      name: "",
      age: "",
      instance: null,
      updateIndex:"",
      updateRow:"",
      editButton: true,

      config: {
        headers: {
          App_KEY: "3hQ9USEF_4EHusOtym2TwZT64EKgrV90"
        }
      },
    }
  },

  mounted: function () {
    this.instance = axios.create({
      baseURL: "http://127.0.0.1:3333", headers: {
        'Content-type': "application/json",
        'App_KEY': "3hQ9USEF_4EHusOtym2TwZT64EKgrV90",
      }
    })
  },
  methods: {
    async onSubmit() {
      const Details = {
        id: this.depart_id,
        name: this.name,
      }
      if(!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(this.name)){
        alert("Enter name")
      }
      else{
      
      await this.instance.post('/insertdep', Details, this.config)
      // console.log(Details);
      alert("Inserted")

      this.clearForm()
    }},
    async viewdata() {
      const view = await this.instance.get('/selectdep', this.config )
      console.log(view.data);
      alert("viewed")
    },
    deleteRow(i) {
      if (confirm('Are you sure you want to Delete?' == true)) {
        this.alldetails.splice(i, 1);
      }},

    clearForm() {
      this.id = "";
      this.name = "";
    },
  }
}
</script>

<style>

.login-form {
    width: 340px;
    margin: 50px auto;
  	font-size: 15px;
}
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form h2 {
    margin: 0 0 15px;
}
.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
}
.btn {        
    font-size: 15px;
    font-weight: bold;
}

</style>