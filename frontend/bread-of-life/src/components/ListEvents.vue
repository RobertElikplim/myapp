<template>
    <nav class="nav navbar-expand navbar-dark justify-content-end bg-dark col-md-12" >
      <div class="container">
        <ul class="nav navbar-nav justify-content-end" >
          <li class="nav-item">
          <!-- Navigate bar that has router link to ADD new event-->
            <router-link  to="/createevent" class="btn btn-info">Add Event</router-link>
          </li>
          <li>
          <div class="col-md">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr v-for="count in Counts" :key="count._id">
                        <td>Total Events Recorded</td>
                        <td>{{ count.Total_Count }}</td>
                    </tr>
                </thead>
            </table>
          </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row">
    <!-- Table to display the events information that contains:
     Event Type, date,center,location,date stored, and actions-->
        
        <div class="col-md-12">
            <table class="table table-dark table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Event Type</th>
                        <th>Event Date</th>
                        <th>Event Center</th>
                        <th>Event Location</th>
                        <th>Date Stored</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Passing the data  of events information to display into approriate columns-->
                    <tr v-for="event in Events" :key="event._id">
                        <td>{{ event.eventType }}</td>
                        <td>{{ event.eventDate }}</td>
                        <td>{{ event.eventCenter }}</td>
                        <td>{{ event.location }}</td>
                        <td>{{ event.dateStored }}</td>
                        <td>
                        <!--Router that allow client to edit, views the invididuals attend that event, and delete customer-->
                            <router-link :to="{name: 'edit-event', params: { id: event._id }}" class="btn btn-warning">Edit</router-link>
                            <router-link :to="{name: 'atthisevent', params: { eventType: event.eventType, eventDate: event.eventDate }}" class="btn btn-info">View Individuals at Event</router-link>
                            <button @click.prevent="deleteEvent(event._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
           
        </div>
    </div>
</template>

<script>
// USe AXIOS to return the query, events in array  and return the data from the backend API. 
    import axios from "axios";
    export default {
        data() {
            return {
                Querys: [],
                Events: [],
                Counts: []
            }
        },
        // this is using created hook 
        created() {
            let apiURL = 'http://localhost:3000/viewbyevent';
            axios.get(apiURL).then(res => {
                this.Querys = res.data;
            }).catch(error => {
                console.log(error)
            });
            
            let apiURL1 = 'http://localhost:3000/events';
            axios.get(apiURL1).then(res => {
                this.Events = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL3 = 'http://localhost:3000/totevcount';
            axios.get(apiURL3).then(res => {
                this.Counts = res.data;
            }).catch(error => {
                console.log(error)
            });

            let apiURL2 = 'http://localhost:3000/summary-by-event';
            axios.get(apiURL2)
        },
        methods: {// delete the customer id with matching id andsend an HTTP DELETE request to a given URL of id. 
            deleteEvent(id){
                console.log(id)
                let apiURL = `http://localhost:3000/delete-event/${id}`;
                let indexOfArrayItem = this.Events.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Events.splice(indexOfArrayItem, 1);
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
