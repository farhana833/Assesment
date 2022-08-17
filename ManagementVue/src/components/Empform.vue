<template>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- <title>Bootstrap Simple Data Table</title> -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> -->
<!-- <h1>Details</h1> -->
<div class="container-xl">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="search-box">
                        </div>
                    </div>
                </div>
            </div>
  <div class="container">
    <!-- <h1>Department Details</h1> -->
    <form>
      <div>
        <input type="text" placeholder="Name" required v-model="name" />
      </div>
      <div>
        <input type="date" placeholder="DOB" required v-model="dob" />
      </div>
      <div>
        <input type="date" placeholder="DOJ" required v-model="doj" />
      </div>
      <div>
        <input type="email" placeholder="email" required v-model="email" />
      </div>
      <div>
        <input type="number" placeholder="phone" required v-model="phone" />
      </div>
      <div>
        <input type="number" placeholder="department_id" required v-model="department_id" />
      </div>
    
       <button type="button" @click="onSubmit">Submit</button>
        <!-- <button v-else type="button" @click="updateRow(updateIndex)">UpdateRow</button> -->
       <!-- <button type="submit" @click="viewdata">View</button> -->

    </form>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Empform",
  data() {
    return {
      id: "",
      name: "",
      dob:"",
       doj:"",
    email:"",
    phone:"",
    department_id:"",
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
        name: this.name,
        dob:this.dob,
       doj:this.doj,
    email:this.email,
    phone:this.email,
     department_id:this.department_id,

      }
      if(!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(this.name)){
        alert("Enter name")
      }
      else{
      
      await this.instance.post('/insertemp', Details, this.config)
      console.log(Details);
      alert("Inserted")

      this.clearForm()
    }},
    async viewdata() {
      const view = await this.instance.get('/selectemp', this.config )
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
.del:hover {
  background-color: orange;
}

.update:hover {
  background-color: orange;
}

input {
  text-align: center;
  width: auto;
  padding: 12px 20px;
  margin: 8px 0;
  /* background: black; */
  box-sizing: border-box;
  font-size: 15px;
  border-radius: 25px;

}

/* form {
  background-color: grey;
}
fieldset {
  background-color: white;
  color: black;
} */
button {
  font-weight: bold;
  margin-top: 10px;
  border-radius: 25px;
  margin-left: 25%;
  text-align: center;
  width: 50%;
  font-size: large;
  padding: 12px 20px;
  /* margin: 8px; */
  box-sizing: border-box;
  background-color: pink;
}

.del {
  background-color: red;
}

.update {
  background-color: green;
}

h1 {
  text-align: center;
  color: orange;
  font-size: 30px;
}

table {
  margin-top: 20px;
}

th {
  font-size: larger;
  font-weight: 100;
  color: black;
}

th,
td {
  font-size: 15px;
  padding: 25px;
  text-align: left;
  border-color: azure;
  background-color: orange;
  color: black;
  border-inline: line;
}

th {
  font-size: 20px;
  font-weight: bold;
}

td {
  background-color: grey;
  font-size: large;
}

#female {
  accent-color: lightgreen;
}

#male {
  accent-color: violet;
}

#others {
  accent-color: red;
}

.container {
  border-color: blueviolet;
}

/* fieldset {
  color: pink;
} */

input:hover {
  background-color: pink;
  color: black;
}

button:hover {
  background-color: green;
  color: white;
}
</style>