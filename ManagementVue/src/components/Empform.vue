<template>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> -->
  <!-- <h1>Department Details</h1> -->
  <div class="login-form">
   
    <form>
      <h2 class="text-center">Employee</h2>
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="Name"
          required
          v-model="name"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="date"
          placeholder="DateOfBirth"
          required
          v-model="dob"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="date"
          placeholder="DateOfJoining"
          required
          v-model="doj"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="email"
          placeholder="email"
          required
          v-model="email"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="tel"
          placeholder="phone"
          required
          v-model="phone"
        />
      </div>
      <div class="form-group">
        <select
          class="form-control"
          placeholder="department_name"
          v-model="selectedDepart"
          @change="filterval()"
        >
          <option
            v-for="depts in deparray"
            v-bind:key="depts.name"
            v-bind:value="depts.depart_id"
          >
            {{ depts.name }}
          </option>
        </select>
      </div>
      <!-- v-bind:key="depts.name" v-bind:value="depts.depart_id" -->

      <button class="btn btn-primary btn-block" type="button" @click="onSubmit">
        Submit
      </button>
      <!-- <button v-else type="button" @click="updateRow(updateIndex)">UpdateRow</button> -->
      <!-- <button type="submit" @click="viewdata">View</button> -->
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Empform",
  data() {
    return {
      emp_id: "",
      name: "",
      dob: "",
      depnames: "",
      doj: "",
      email: "",
      phone: "",
      selectedDepart: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      deparray: [],
      instance: null,
      updateIndex: "",
      updateRow: "",
      editButton: true,

      config: {
        headers: {
          App_KEY: "3hQ9USEF_4EHusOtym2TwZT64EKgrV90",
        },
      },
    };
  },

  mounted: async function () {
    this.instance = axios.create({
      baseURL: "http://127.0.0.1:3333",
      headers: {
        "Content-type": "application/json",
        App_KEY: "3hQ9USEF_4EHusOtym2TwZT64EKgrV90",
      },
    });
    const depnames = await this.instance.get("/selectdep", this.config);
    this.deparray = depnames.data;
    console.log(deparray);

  //   const depnames = this.instance.get("/selectdep");
  //   this.deparray = depnames.data;
  // 
  },
  methods: {
    async onSubmit() {
      const Details = {
        name: this.name,
        dob: this.dob,
        doj: this.doj,
        email: this.email,
        phone: this.phone,
        depart_id: this.selectedDepart,
      };
      if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(this.name)) {
        alert("Enter name");
      } else if (!/^[0-9]{10}$/.test(this.phone)) {
        alert("Enter correct number");
      } else if (!this.reg.test(this.email)) {
        alert("Enter correct mail id");
      } else {
        await this.instance.post("/insertemp", Details, this.config);
        console.log(Details);
        alert("Successfully Inserted");

        this.clearForm();
      }
    },
    async viewdata() {
      const view = await this.instance.get("/selectemp", this.config);
      console.log(view.data);
      alert("viewed");
    },
    deleteRow(i) {
      if (confirm("Are you sure you want to Delete?" == true)) {
        this.alldetails.splice(i, 1);
      }
    },
    async filterval() {
      const tableDetails = await this.instance.get("/selectemp", this.config);
      if (this.depart_id == null) {
        this.allDetails = tableDetails.data;
      } else if (this.depart_id == 0) {
        this.allDetails = tableDetails.data.reverse();
      } else {
        this.allDetails = tableDetails.data.filter((el) => {
          return el.department_id == this.depart_id;
        });
      }
    },

    clearForm() {
      this.name = "";
      (this.dob = ""),
        (this.doj = ""),
        (this.email = ""),
        (this.phone = ""),
        (this.depart_id = "");
    },
  },
};
</script>

<style scoped>
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
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>