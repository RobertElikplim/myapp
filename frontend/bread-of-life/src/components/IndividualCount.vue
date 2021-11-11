<template>
    <div class="row justify-content-center">
    <h3>Individual Records With Total Appearance at Events</h3>
        <div class="col-md-14">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Ethnicity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="individual in Individuals" :key="individual._id">
                        <td>{{ individual._id.firstName}}</td>
                        <td>{{ individual._id.lastName}}</td>
                        <td>{{ individual._id.phoneNumber}}</td>
                        <td>{{ individual._id.ethnicity }}</td>
                        <td>{{ individual.Total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

     <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                Individuals: [],
            }
        },
        created() {
            let apiURL = 'http://localhost:3000/individualhistor';
            axios.get(apiURL).then(res => {
                this.Individuals = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>

<style>
    .btn {
        margin-right: 10px;
    }
</style>
