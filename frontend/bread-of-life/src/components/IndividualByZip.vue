<template>
    <div class="row">
    <!--Create a table to display Client atttnend by zipcode-->
        <div class="col-md-12">
            <table class="table table-dark">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Event Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                <!--Use query to return the inviduals atttended with matching id -->
                    <tr v-for="summaryevents in Querys" :key="summaryevents.id">
                        <td>{{ summaryevents.firstName }}</td>
                        <td>{{ summaryevents.lastName }}</td>
                        <td>{{ summaryevents.phoneNumber }}</td>
                        <td>{{ summaryevents.city }}</td>
                        <td>{{ summaryevents.state }}</td>
                        <td>{{ summaryevents.zipCode }}</td>
                        <td>{{ summaryevents.eventType }}</td>
                        <td>{{ summaryevents.COUNT }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
        </div>
    </div>
</template>

<script>
// Use axios to get data and return inividuals atttend by zipcode from the query schema.
    import axios from "axios";
    export default {
        data() {
            return {
                Querys: [],
                Etype: []
            }
        },
        created() {
            let apiURL = `http://localhost:3000/summarybyzip/${this.$route.params.zipCode}`;
            axios.get(apiURL, this.query).then(res => {
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
