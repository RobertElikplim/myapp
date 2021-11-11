<template>
    <div class="row justify-content-center">
    <!-- Create an customer intake form that user can select what service they sign up. 
    Next, collect client information(first,last,phone,phone number, address,city,state). 
    Finally, additional service that customer might interesting in while receiving the services. 
      -->
        <div class="col-md-5">
            <h3 class="text-center">Add Individual</h3><br>
            <form @submit.prevent="handleSubmitForm" >
                <div class="form-group">
                <label>For which distribution are you signing up?</label> <span class="text-danger">*</span>
                <div id="v-model-select">
                    <select class="form-control" v-model="individual.eventType">
                        <option disabled value="">Please select one</option>
                        <option  v-for="event in EventSelection" :key="event._id" > {{event.eventType }}</option>
                    </select>
                </div><br>

               <div class="form-group">
                <label>Event Date</label> <span class="text-danger">*</span>
                <div id="v-model-select">
                    <select class="form-control" v-model="individual.eventDate">
                        <option disabled value="">Please select one</option>
                        <option v-for="event in EventSelection" :key="event._id" > {{event.eventDate}} </option>
                    </select>
                </div>
                </div>

                </div> <br>
                <div class="form-group">
                    <label>First Name</label> <span class="text-danger">*</span>
                    <input type="text" class="form-control" v-model="individual.firstName" required/>
                </div><br>

                <div class="form-group">
                    <label>Last Name</label><span class="text-danger">*</span>
                    <input type="text" class="form-control" v-model="individual.lastName" required/>
                </div><br>

                <div class="form-group">
                    <label>Phone Number</label><span class="text-danger">*</span>
                    <input type="tel" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" aria-describedby="phoneHelpBlock" class="form-control" v-model="individual.phoneNumber" required/>
                </div>
                   <small id="phoneHelpBlock" class="form-text text-muted">
                            10 digit phone number should be entered with dashes
                    </small><br>

                <div class="form-group">
                    <label>Residence Address</label>
                    <input type="text" class="form-control" v-model="individual.street" required/>
                </div><br>
                
                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-control" v-model="individual.city" required/>
                </div><br>

                <div class="form-group">
                    <label>State</label>
                    <input type="text" class="form-control" v-model="individual.state" required/>
                </div><br>

                <div class="form-group">
                    <label>ZipCode</label><span class="text-danger">*</span>
                    <input type="number" class="form-control" v-model="individual.zipCode" required/>
                </div><br>

                <div class="form-group">
                    <label>How did you hear about our distribution?</label><span class="text-danger">*</span>
                    <select multiple class="form-control" v-model="individual.mediaChannel">
                          <option disabled value="">Please select all that apply.</option>
                          <option>Facebook</option>
                          <option>Instagram</option>
                          <option>Twitter</option>
                          <option>Word of Mouth</option>
                          <option>KMAZ 102.5fm</option>
                      </select>
                      <b-form-text id="password-help-block">
                        Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.
                      </b-form-text><br>
                      <div class="form-group">
                        If Other<input v-model="individual.mediaChannel" type="text" class="form-control" placeholder="Input here">
                      </div>
                </div><br>

                <div class="form-group">
                    <label>Have you received the COVID vaccine? </label><span class="text-danger">*</span>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccine">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                 <div class="form-group" v-if="individual.vaccine === 'No' ">
                    <label>Would you like the COVID vaccine during the distribution? </label><span class="text-danger">*</span>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccineBackground">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div>

                <div class="form-group" v-if="individual.vaccineBackground === 'Yes' ">
                    <label>Which COVID vaccine would you prefer to receive? </label><span class="text-danger">*</span>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccineType">
                        <option disabled value="">Please select one</option>
                         <option>Moderna</option>
                         <option>Pfizer</option>
                      </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Are you in need of additional supportive services (e.g., utility assistance, rental assistance,housing, nutritional support, etc.)<span class="text-danger">*</span></label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.additionalServices">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Number of Children In Household </label><span class="text-danger">*</span>
                    <input type="number" class="form-control" v-model="individual.numberChildren" required/>
                </div><br>

                <div class="form-group">
                    <label>Are you or anyone in your household 65+ in age? </label><span class="text-danger">*</span>
                     <div id="v-model-select">
                      <select class="form-control" v-model="individual.overSixtyfive">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Are you a veteran? </label><span class="text-danger">*</span>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.veteran">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Which of the following best describes you?</label><span class="text-danger">  *</span>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.ethnicity">
                        <option disabled value="">Please select one</option>
                        <option>Asian or Pacific Islander</option>
                        <option>Black or African American</option>
                        <option>Hispanic or Latino</option>
                        <option>Native American or Alaskan Native</option>
                        <option>White or Caucasian</option>
                        <option>Multiracial or Biracial</option>
                        <option>A race/ethnicity not listed here</option>
                      </select>
                    </div> 
                </div>
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }} </li>
                    </ul>
                </p>
                <button class="btn btn-success mt-3" >Add Invididual</button>
            </form>
        </div>
    </div>
</template>

<script>
// Use Axios to send HTTP post request and stored in Individual backend API.
    import axios from "axios";
    
    export default {
        data() {
            return {
                event : {},
                errors: [],
                EventSelection: [],
                individual: {
                   firstName: '',
                   lastName: '',
                   phoneNumber: '',
                   street: '',
                   city: '',
                   state: '',
                   zipCode: '',
                   eventCenter: '',
                   mediaChannel: '',
                   vaccine: '',
                   vaccineType: '',
                   vaccineBackground: '',
                   additionalServices: '',
                   numberChildren: '',
                   overSixtyfive: '',
                   veteran: '',
                   ethnicity: '',
                   eventType: ''
                }
            }
        },
        created() {// populate the data for the event and collect data to display to the chart.
            let apiURL1 = `http://localhost:3000/events3`;
            axios.get(apiURL1).then((res) => {
            this.EventSelection = res.data;
                });

            let apiURL3 = 'http://localhost:3000/popchart';
            axios.get(apiURL3)

            let apiURL4 = 'http://localhost:3000/popchart1';
            axios.get(apiURL4)    

            },
        methods: {//using error handling to validate customer phone number and update the database.
            handleSubmitForm() {
                this.errors = [];
                if (!this.individual.phoneNumber) {
                    this.errors.push("Phone number required.");
                }

                let apiURL = 'http://localhost:3000/individual';
                axios.post(apiURL, this.individual).then(() => {
                    //changging the view to the list
                  this.$router.push('/viewindividual')
                  this.individual = {
                    firstName: '',
                   lastName: '',
                   phoneNumber: '',
                   street: '',
                   city: '',
                   state: '',
                   zipCode: '',
                   mediaChannel: '',
                   vaccine: '',
                   vaccineType: '',
                   vaccineBackground: '',
                   additionalServices: '',
                   numberChildren: '',
                   overSixtyfive: '',
                   veteran: '',
                   ethnicity: '',
                   eventType: ''
                  }
                }).catch(error => {
                    this.errors.push("Error in form submission. " + error.response.data);
                });
            }
        }
           
    }
</script>