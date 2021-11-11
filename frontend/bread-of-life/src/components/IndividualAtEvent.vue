<template>
<!-- Create a table to display the Individual attend the event
 Diplay the attenedee First Name, Last Name, Zip Code, Phone, Event Type, Event Data -->
    <div class="row">
        <div class="col-md-10">
            <h3>Individuals at {{Event.eventType}} on {{Event.eventDate}} </h3>
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Zip Code</th>
                        <th>Phone</th>
                        <th>Event Type</th>
                        <th>Event Date</th>
                    </tr>
                </thead>
                <tbody>
                <!--Query to display the individual data with matching ID -->
                    <tr v-for="summaryevents in Querys" :key="summaryevents.id">
                        <td>{{ summaryevents.firstName }}</td>
                        <td>{{ summaryevents.lastName }}</td>
                        <td>{{ summaryevents.zipCode }}</td>
                        <td>{{ summaryevents.phoneNumber }}</td>
                        <td>{{ summaryevents.eventType }}</td>
                        <td>{{ summaryevents.eventDate}}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary" @click="$router.go(-1)">Go Back</button>
        </div>
    </div>
</template>

<script>
// Use Axios to send data and return data in the QUERY 
    import axios from "axios";
    export default {
        data() {
            return {
                Event: {},
                Querys: [],
                
            }
        },
        created() {// Retrieve data in the summarybyevents and return the array with matching query. If successful respond the corresponding data, else, display the erorr
            let apiURL1 = `http://localhost:3000/summarybyevents/${this.$route.params.eventType}/${this.$route.params.eventDate}`;
            axios.get(apiURL1, this.summaryevents).then(res => {
                this.Querys = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL2 = `http://localhost:3000/ate/${this.$route.params.eventDate}`;
            axios.get(apiURL2).then(res => {
                this.Event = res.data;
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
