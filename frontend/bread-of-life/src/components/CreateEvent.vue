<template>
<!--intakae form for creating events, user will input the event type,event date,event center, event location , and date stored-->
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Event</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>   Event Type</label>
                    <input type="text"  class="form-control" v-model="event.eventType" required>
                </div><br>

                <div class="form-group">
                    <label>   Event Date</label>
                    <input type="Date" class="form-control" v-model="event.eventDate" required>
                </div><br>

                <div class="form-group">
                    <label>   Event Center</label>
                    <input type="text" class="form-control" v-model="event.eventCenter" required>
                </div><br>

                <div class="form-group">
                    <label>   Event Location</label>
                    <input type="text" class="form-control" v-model="event.location" required>
                </div>

                <div class="form-group">
                    <label>   Date Stored</label>
                    <input type="date" class="form-control" v-model="event.dateStored" required>
                </div>

                
                <button class="btn btn-success mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
    //Once user input complete we use axios to send HTTP post request to the Event backend API.
    import axios from "axios";

    export default {
        data() {
            return {
                event: {
                   eventType: '',
                   eventDate: '',
                   eventCenter: '',
                   location: '',
                   eventDets: '',
                   dateStored: ''
                }
            }
        },
        created() {// Populate the data  for the event 

            let apiURL3 = 'http://localhost:3000/popchart';
            axios.get(apiURL3)

            let apiURL4 = 'http://localhost:3000/popchart1';
            axios.get(apiURL4) 

            },
        methods: {// use handle submission to pass the data parameter to the backend database, if succuess update the database, else display the error to console log
            handleSubmitForm() {
                let apiURL = 'http://localhost:3000/event';
                axios.post(apiURL, this.event).then(() => {
                    //changing the view to the list
                  this.$router.push('/viewevent')
                  this.event = {
                    eventType: '',
                    eventDate: '',
                    eventCenter: '',
                    location: '',
                    dateStored: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
           
    }
</script>