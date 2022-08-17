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
                    <!-- <div class="col-sm-8"><h2> <b>Department management</b></h2></div> -->
                    <div class="form"><router-link to="/Form"><button>Add Data</button></router-link></div>
                    <div class="col-sm-4">
                        <div class="search-box">
                            <i class="material-icons">&#xE8B6;</i>
                            <input type="text" class="form-control" placeholder="Search&hellip;">
                        </div>
                    </div>
                </div>
            </div>
<div v-if="ishidden==true" v-on:click="ishidden==false">
<!-- <input type="text" id="myInput" onkeyup="search()" placeholder="Search for names.." title="Type in a name"> -->
  <table id="mytable" >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Delete</th>
      <th scope="col">Update</th>
    </tr>
    <tr v-for="(entry, i) in alldetails" :key="i">
      <td class="col">{{ entry.id }}</td>
      <td class="col">{{ entry.name }}</td>
      <td><button type="button" class="del" @click="deleteRow(entry.id)"></button></td>
      <td>
        <button type="button" class="update" @click="revertTable(entry)"></button></td>
    </tr>
  </table>
  <h1>Total records:{{ alldetails.length }}</h1>
  </div> 
<div v-else v-on:click="ishidden ==!ishidden">
        <div>
        <input type="text" placeholder="Name" required v-model="name" />
      </div>
       <!-- <button v-if="editButton==true" type="button" @click="onSubmit">Submit</button> -->
        <button type="button" @click="updateRow()">UpdateRow</button>
       <!-- <button type="submit" @click="viewdata">View</button> -->
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
    id: "",
    name: "",
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
        { data: { id: inputid}}).then((result)=> {
        this.del = result.data;
        this.select()
       }
    )
       }},

   revertTable(entry){

   if (confirm("Do you want to edit this row") == true) {
    // <router-link to="/form"></router-link>
        // console.log({i})
        // console.log(this.alldetails)
        // console.log(JSON.stringify(this.alldetails));
        // console.log(this.alldetails[0].fname);

        // this.editInput['fname'] = this.alldetails[i]
        this.id = entry.id
        this.name = entry.name
        this.ishidden = false
      }
    },
    async updateRow() {
    const data ={
      id: this.id,
      name: this.name,
      }
      await this.instance.patch("/updatedep", data, this.config);
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


  search() {
  var input, filter, table, tr, td, j, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (j = 0; j < tr.length; j++) {
    td = tr[j].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[j].style.display = "";
      } else {
        tr[j].style.display = "none";
      }
    }       
  }
}
}};
</script>
<style>
body {
    color: #566787;
    background: #f5f5f5;
    font-family: 'Roboto', sans-serif;
}
.form{
    width:50%;
    border-radius: 20px;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 10px;
    margin: 0 0 10px;
    min-width: 100%;
}
.table-title h2 {
    margin: 8px 0 0;
    font-size: 22px;
}
.search-box {
    position: relative;        
    float: right;
}
.search-box input {
    background-color: orange;
    height: 34px;
    border-radius: 20px;
    padding-left: 35px;
    color: black;
    box-shadow: none;
}
.search-box input:focus {
    border-color: #3FBAE4;
}
.search-box i {
    color: #a0a5b1;
    position: absolute;
    font-size: 19px;
    top: 8px;
    left: 10px;
}
 .elements.style{
    width:50%
 }

</style>