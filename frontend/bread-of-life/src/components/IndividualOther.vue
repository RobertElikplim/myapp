<template>
  <div>
  <!--Nav bar Add inividual, View Other Information -->
    <nav class="nav navbar-expand navbar-dark justify-content-end bg-dark col-md-12" >
      <div class="container">
        <ul class="nav navbar-nav justify-content-end" >
          <li class="nav-item">
            <router-link  to="/createindividual" class="btn btn-info">Add Individual</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-info" to="/viewindividual">View Other Information</router-link>
          </li>
          <li class="nav-item">
          <form>
            <input placeholder="Search by typing zipcode" type="text" class="form-control" v-model="individual.zipCode" required>
          </form>
          </li>
           <li class="nav-item">
            <router-link :to="{name: 'byzip', params: { zipCode: individual.zipCode }}"  class="btn btn-info">Search</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="row justify-content-center">
    <!-- Table to display  Customer addtional information-->
        <div class="col-md-14">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Full Name</th>
                        <th>Media Channel</th>
                        <th>Vaccinated</th>
                        <th>Want Vaccine</th>
                        <th>Vaccine Type</th>
                        <th>Additional Services</th>
                        <th>Children In Houshold</th>
                        <th>Seniors</th>
                        <th>Veteran Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Render the data to the table-->
                    <tr v-for="individual in Individuals" :key="individual._id">
                        <td>{{ individual.firstName}} {{individual.lastName}}</td>
                        <td>{{ individual.mediaChannel.join(', ') }}</td>
                        <td>{{ individual.vaccine }}</td>
                        <td>{{ individual.vaccineBackground }}</td>
                        <td>{{ individual.vaccineType }}</td>
                        <td>{{ individual.additionalServices }}</td>
                        <td>{{ individual.numberChildren }}</td>
                        <td>{{ individual.overSixtyfive }}</td>
                        <td>{{ individual.veteran }}</td>
                        <td>
                        <!-- Router link to display edit, delete button-->
                            <router-link :to="{name: 'edit-individual', params: { id: individual._id }}" class="btn btn-warning">Edit</router-link>
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
// Use axios  to send http request
    import axios from "axios";
    export default {
        data() {
            return {
                Individuals: [],
                individual: {zipCode: ''}
            }
        },
        created() {
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
        },
        methods: {// delete individual by id. If id match then invidual id, send confirmation to ask user, else display the error cannot delete.
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
