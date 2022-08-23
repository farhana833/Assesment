<template>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> -->
                    <!-- <div class="col-sm-8"><h2> <b>Department management</b></h2></div> -->
                    <div class="container-lg">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Department <b>Details</b></h2></div>
                    <select
                class="dropdownStyle"
                name="item"
                id="item"
                v-model="value"
                @change="filterval()"
              >
                 <option value="" disabled hidden>Select Value</option>
                <option :value="null">ASC</option>
                <option :value="0">DESC</option>
              </select>
                    <div class="col-sm-4">
                     
                  <div class="form"><router-link to="/Form"><button class="btn btn-info add-new">Add Data</button></router-link></div>
</div>
                </div>
            </div>

<div v-if="ishidden==true" v-on:click="ishidden==false">
<!-- <input type="text" id="myInput" onkeyup="search()" placeholder="Search for names.." title="Type in a name"> -->
  <table class="table table-bordered" >
    <tr>
      <th scope="col" >Id</th>
      <th scope="col" >Name</th>
      <th scope="col" >Delete</th>
      <th scope="col" >Update</th>
    </tr>
    <tr v-for="(entry, i) in alldetails" :key="i">
      <td class="col">{{ entry.depart_id }}</td>
      <td class="col">{{ entry.name }}</td>
      <td><button type="button" class="del" @click="deleteRow(entry.depart_id)">Delete</button></td>
      <td>
        <button type="button" class="update" @click="revertTable(entry)">Edit</button></td>
    </tr>
  </table>
  <h1>Total records:{{ alldetails.length }}</h1>
  </div> 
<div v-else v-on:click="ishidden ==!ishidden">
  <div class="login-form">
          <form>
        <h2 class="text-center">Department</h2>  
      <div class="form-group">
        <input class="form-control" type="text" placeholder="Name" required v-model="name" />
      </div>
       <!-- <button v-if="editButton==true" type="button" @click="onSubmit">Submit</button> -->
        <button class="btn btn-primary btn-block" type="button" @click="updateRow()">UpdateRow</button>
       <!-- <button type="submit" @click="viewdata">View</button> -->
       </form>
       </div>
</div>
</div>
</div>
</div>
</template>
<script>
import axios from "axios"
export default {
  name: "Department",
  data: () => ({
    depart_id: "",
    name: "",
    value:"",
    alldetails: [],
    ishidden:true,
    config: {
      headers: {
        "App_Key":"3hQ9USEF_4EHusOtym2TwZT64EKgrV90"
      },
    },
  }),
  mounted: async function () {
    this.instance = axios.create({
      baseURL: "http://127.0.0.1:3333",
      headers: {
        "Content-type": "application/json",
        "App_Key": "3hQ9USEF_4EHusOtym2TwZT64EKgrV90",
      },
    });

    const view = await this.instance.get("/selectdep", this.config);
    this.alldetails = view.data;
    console.log(this.alldetails)
    //   console.log(view.data);
    // this.alldetails.push({
    //     id: this.id,
    //     name: this.name,
        // })
  },

  methods: {
    async select(){
      const view = await this.instance.get("/selectdep", this.config);
    this.alldetails = view.data;
    console.log(this.alldetails)
    },
    async deleteRow(inputid) {
       if (confirm('Are you sure you want to Delete?')) {
        // this.alldetails.splice(inputid, 1);
       await this.instance.delete("/deletedep", 
        { data: { depart_id: inputid}}).then((result)=> {
        this.del = result.data;
        this.select()
       }
    )
       }},
        async filterval() {
      const tableDetails = await this.instance.get("/selectdep", this.config);
      if (this.value == null) {
        this.alldetails = tableDetails.data;
      } else if (this.value == 0) {
        this.alldetails = tableDetails.data.reverse();
      }
},

   revertTable(entry){

   if (confirm("Do you want to edit this row") == true) {
    // <router-link to="/form"></router-link>
        // console.log({i})
        // console.log(this.alldetails)
        // console.log(JSON.stringify(this.alldetails));
        // console.log(this.alldetails[0].fname);

        // this.editInput['fname'] = this.alldetails[i]
        this.depart_id = entry.depart_id
        this.name = entry.name
        this.ishidden = false
      }
    },
    async updateRow() {
    const data ={
      depart_id: this.depart_id,
      name: this.name,
      }
      console.log(data)
      const update = await this.instance.patch("/updatedep", data, this.config);
      console.log(update)
      this.ishidden = false
      alert("Updated")
      this.clearForm()
    },
    clearForm() {
      this.name = "";

    },
// select(){
//  const view = await this.instance.get("/selectclas", this.config);
//     this.alldetails = view.data;
// },


 }}
</script>
<style>
body {
    color: #1e4fa3;
    background: #951464;
    font-family: 'Open Sans', sans-serif;
}
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
.table-wrapper {
    width: auto;
    margin: 30px auto;
    background: #fff;
    padding: 20px;	
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 10px;
    margin: 0 0 10px;
}
.table-title h2 {
    margin: 6px 0 0;
    font-size: 22px;
}
.table-title .add-new {
    float: right;
    height: 30px;
    font-weight: bold;
    font-size: 12px;
    text-shadow: none;
    min-width: 100px;
    border-radius: 50px;
    line-height: 13px;
}
.table-title .add-new i {
    margin-right: 4px;
}
table.table {
    table-layout: auto;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}
table.table th:last-child {
    width: auto;
}
table.table td a {
    cursor: pointer;
    display: inline-block;
    margin: 0 5px;
    min-width: 24px;
}    
table.table td a.add {
    color: #27C46B;
}
/* table.table td a.edit {
    color: #FFC107;
}
table.table td a.delete {
    color: #E34724;
} */
table.table td i {
    font-size: 19px;
}
table.table td a.add i {
    font-size: 24px;
    margin-right: -1px;
    position: relative;
    top: 3px;
}    
table.table .form-control {
    height: 32px;
    line-height: 32px;
    box-shadow: none;
    border-radius: 2px;
}
table.table .form-control.error {
    border-color: #f50000;
}
table.table td .add {
    display: none;
}
button {
  font-weight: bold;
  line-height: 13px;
    min-width: 150px;  
  border-radius: 50px;
  text-align: center;
  
  font-size: large;
  padding: 10px;
  background-color: rgb(198, 70, 70);
}

.del {
  font-weight: bold;
    font-size: 12px;
    text-shadow: none;
    min-width: auto;
      color: white;
    border-radius: 50px;
    line-height: 13px;
  background-color: rgb(198, 70, 70);
}
.del:hover {
  background-color: lightskyblue;
  color: black;
}

.update {
  font-weight: bold;
    font-size: 12px;
    color: white;
    text-shadow: none;
    min-width: auto;
    border-radius: 50px;
    line-height: 13px;
  background-color: green;
}
.update:hover {
  background-color: lightskyblue;
   color: black;
}



 </style>
