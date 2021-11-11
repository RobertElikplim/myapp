<template>
  <div>
  <!-- Nav bar that has following functionality: add individual, view client additional information, search customer by zipcode-->
    <nav class="nav navbar-expand navbar-dark justify-content-end bg-dark col-md-12" >
      <div class="container">
        <ul class="nav navbar-nav justify-content-end" >
          <li class="nav-item">
            <router-link  to="/createindividual" class="btn btn-info">Add Individual</router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/otherindv" class="btn btn-info">View Other Information</router-link>
          </li>
          <li class="nav-item">
           <form>
            <input placeholder="Search by typing zipcode" type="text" class="form-control" v-model="individual.zipCode" required>
          </form>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'byzip', params: { zipCode: individual.zipCode }}"  class="btn btn-info">Search</router-link>
          </li>
           <li>
          <div class="col-md">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr v-for="count in Counts" :key="count._id">
                        <td>Total Individuals Served</td>
                        <td>{{ count.Total_Count }}</td>
                    </tr>
                </thead>
            </table>
          </div>
          </li>
        </ul>
      </div>
    </nav>
    
    <div class="row justify-content-center">
    <!--Create table columns that has fields: First name,last name, phone, street,city, state,zipcode, ethnicity, event type actions-->
        <div class="col-md-12">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Ethnicity</th>
                        <th>Event Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Passing the data of inviduals to return the customer with id and display data into the table.-->
                    <tr v-for="individual in Individuals" :key="individual._id">
                        <td>{{ individual.firstName}}</td>
                        <td>{{ individual.lastName}}</td>
                        <td>{{ individual.phoneNumber}}</td>
                        <td>{{ individual.street }}</td>
                        <td>{{ individual.city }}</td>
                        <td>{{ individual.state }}</td>
                        <td>{{ individual.zipCode }}</td>
                        <td>{{ individual.ethnicity }}</td>
                        <td>{{ individual.eventType }}</td>
                        <td>
                        <!--Router link that has edit, history, delete functionality-->
                            <router-link :to="{name: 'edit-individual', params: { id: individual._id }}" class="btn btn-warning">Edit</router-link>
                            <router-link :to="{name: 'individualhistory', params: { lastName: individual.lastName, firstName: individual.firstName }}" class="btn btn-primary">History</router-link>
                            <button @click.prevent="deleteIndividual(individual._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


     <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// use axios  to send http request and return data from individuals/ by zipcode
    import axios from "axios";
    export default {
        data() {
            return {
                Individuals: [],
                Counts: [],
                individual: {zipCode: ''}
            }
        },
        created() {// populate the data of the individuals, summary-by-event, viewbyevent
            let apiURL = 'http://localhost:3000/individuals';
            axios.get(apiURL).then(res => {
                this.Individuals = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL2 = 'http://localhost:3000/summary-by-event';
            axios.get(apiURL2)

            let apiURL1 = 'http://localhost:3000/viewbyevent';
            axios.get(apiURL1).then(res => {
                this.Querys = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL3 = 'http://localhost:3000/totindcount';
            axios.get(apiURL3).then(res => {
                this.Counts = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {// delete the individual with the id the client want to delete. If successful delete that id, else, return error message.
            deleteIndividual(id){
                console.log(id)
                let apiURL = `http://localhost:3000/delete-individual/${id}`;
                let indexOfArrayItem = this.Individuals.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Individuals.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn {
        margin-right: 10px;
    }
</style>
