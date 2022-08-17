<template>
  <div class="container">
    <h1>Employee Details</h1>
    <form>
      <div>
        <!-- <label for="name">firstName</label> -->
        <div>
          <input type="number" placeholder="Id" required v-model="id" />
        </div>
        <input type="text" placeholder="Name" required v-model="name" />
      </div>
      <div>
        <input type="number" placeholder="Age" minlength="150" maxlength="150" required v-model="age" />
      </div>
       <!-- <button v-if="editButton==true" type="button" @click="onSubmit">Submit</button> -->
        <button type="button" @click="updateRow(updateIndex)">UpdateRow</button>
       <button type="submit" @click="viewdata">View</button>

    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  data() {
    return {
      id: "",
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
        id: this.id,
        name: this.name,
        age: this.age
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
      this.age = "";

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
  width: 100%;
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