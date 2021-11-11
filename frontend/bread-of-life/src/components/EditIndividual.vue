<template>
<!-- Form update the Individual intake form. -->
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Individual</h3>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label>For which distribution are you signing up?</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.eventType">
                        <option disabled value="">Please select one</option>
                        <option v-for="event in EventSelection" :key="event._id" > {{event.eventType }}</option>
                      </select>
                    </div>  
                </div> <br>

                <div class="form-group">
                <label>Event Date</label> <span class="text-danger">*</span>
                <div id="v-model-select">
                    <select class="form-control" v-model="individual.eventDate">
                        <option disabled value="">Please select one</option>
                        <option v-for="event in EventSelection" :key="event._id" > {{event.eventDate}} <input type="text" v-model="individual.eventType"/></option>
                    </select>
                </div>
                </div>

                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="individual.firstName" required/>
                </div><br>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="individual.lastName" required/>
                </div><br>

                <div class="form-group">
                    <label>Phone Number</label>
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
                    <label>ZipCode</label>
                    <input type="number" class="form-control" v-model="individual.zipCode" required/>
                </div><br>

                <div class="form-group">
                    <label>How did you hear about our distribution?</label>
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
                      <div class="form-group " >
                        <p>Other<input v-model="individual.mediaChannel" type="text" class="form-control" placeholder="Input here"></p>
                      </div>
                </div>

                <div class="form-group">
                    <label>Have you received the COVID vaccine? *</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccine">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                 <div class="form-group" v-if="individual.vaccine === 'No' ">
                    <label>Would you like the COVID vaccine during the distribution? *</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccineBackground">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div>

                <div class="form-group" v-if="individual.vaccine === 'No' ">
                    <label>Which COVID vaccine would you prefer to receive? *</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.vaccineType">
                        <option disabled value="">Please select one</option>
                         <option>Moderna</option>
                         <option>Pfizer</option>
                      </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Are you in need of additional supportive services (e.g., utility assistance, rental assistance,housing, nutritional support, etc.)? *</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.additionalServices">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Number of Children In Household *</label>
                    <input type="number" class="form-control" v-model="individual.numberChildren" required/>
                </div><br>

                <div class="form-group">
                    <label>Are you or anyone in your household 65+ in age? *</label>
                     <div id="v-model-select">
                      <select class="form-control" v-model="individual.overSixtyfive">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Are you a veteran? *</label>
                    <div id="v-model-select">
                      <select class="form-control" v-model="individual.veteran">
                        <option disabled value="">Please select one</option>
                         <option value = "Yes">Yes</option>
                         <option value = "No">No</option>
                      </select>
                    </div>
                </div><br>

                <div class="form-group">
                    <label>Which of the following best describes you? *</label>
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
                <button class="btn btn-info mt-3" >Update</button>
            </form>
        </div>
    </div>
</template>

<script>
// Use axios to send data to the database and update the Inividual backend API.
    import axios from "axios";
    export default {
        data() {
            return {
                errors: [],
                individual: { },
                event : {},
                EventSelection: [],
            }
        },
        created() {//populate the edit form with data for that id already in the database
        let apiURL = `http://localhost:3000/edit-individual/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.individual = res.data;
        });
        let apiURL1 = `http://localhost:3000/events`;
            axios.get(apiURL1).then((res) => {
            this.EventSelection = res.data;
        });
    },
        methods: {//use PUT to update database individual. If sucessfull update Invidual backend, else display the error submission form
            handleUpdateForm() {
            let apiURL = `http://localhost:3000/update-individual/${this.$route.params.id}`;
                axios.put(apiURL, this.individual).then((res) => {
                    console.log(res)
                  this.$router.push('/viewindividual')
                }).catch(error => {
                    this.errors.push("Error in form submission. " + error.response.data);
                });
            }
        }   
    }
</script>