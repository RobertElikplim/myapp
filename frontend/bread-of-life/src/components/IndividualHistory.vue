<template>
<!--Create table to display the client history of the event they attend  -->
    <div class="row justify-content-center">
        <div class="col-md-14">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Zip Code</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                <!--Query to display the summaryevent of the client by matching id-->
                    <tr v-for="summaryevents in Querys" :key="summaryevents.id">
                        <td>{{ summaryevents._id.firstName}}</td>
                        <td>{{ summaryevents._id.lastName}}</td>
                        <td>{{ summaryevents._id.zipCode}}</td>
                        <td>{{ summaryevents._id.phoneNumber }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
        </div>
    </div>
</template>

<script>
// Use AXIOS send HTTP get request and return the individual history from the backend API.
    import axios from "axios";
    export default {
        data() {
            return {
                Querys: [],
            }
        },
        created() {

            let apiURL1 = `http://localhost:3000/individualhistory/${this.$route.params.lastName}/${this.$route.params.firstName}`;
            axios.get(apiURL1, this.summaryevents).then(res => {
                this.Querys = res.data;
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
